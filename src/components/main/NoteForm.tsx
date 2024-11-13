import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useFormik } from "formik";
import { ThemedButton } from "@/components/common/ThemedButton";
import { gStyle } from "@/styles/globalStyles";
import { COLORS } from "@/styles/сolors";
import * as Yup from "yup";

interface NoteData {
  id: string;
  date: string;
  title: string;
  body: string;
  imageUri?: string;
}

interface NoteFormProps {
  initialValues: NoteData;
  onSubmit: (values: NoteData) => void;
  onDelete?: () => void;
  pickImage: () => void;
  imageUri?: string;
  isEditing: boolean;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  body: Yup.string(),
});

const NoteForm: React.FC<NoteFormProps> = ({
  initialValues,
  onSubmit,
  onDelete,
  pickImage,
  imageUri,
  isEditing,
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <View style={{ gap: 14, padding: 16 }}>
      <Text style={styles.label}>Date</Text>
      <TextInput
        value={formik.values.date}
        editable={false}
        style={gStyle.input}
      />

      <Text style={styles.label}>Title</Text>
      <TextInput
        onChangeText={formik.handleChange("title")}
        onBlur={formik.handleBlur("title")}
        value={formik.values.title}
        placeholder="Enter note title"
        style={gStyle.input}
      />
      {formik.touched.title && formik.errors.title && (
        <Text>{formik.errors.title}</Text>
      )}

      <Text style={styles.label}>Body</Text>
      <TextInput
        onChangeText={formik.handleChange("body")}
        onBlur={formik.handleBlur("body")}
        value={formik.values.body}
        placeholder="Enter note content"
        style={[gStyle.input, { height: 100 }]}
        multiline
      />
      {formik.touched.body && formik.errors.body && (
        <Text>{formik.errors.body}</Text>
      )}

      <Text style={styles.label}>Image</Text>
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text>Select an Image</Text>
        )}
      </TouchableOpacity>

      <ThemedButton
        title={isEditing ? "Update Note" : "Save Note"}
        onPress={formik.handleSubmit as any}
      />
      {isEditing && onDelete && (
        <ThemedButton title="Delete Note" onPress={onDelete} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
  },
  imagePicker: {
    height: 200,
    width: "100%",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.inputLite,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 4,
  },
});

export default NoteForm;
