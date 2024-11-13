import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Alert, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { format } from "date-fns";
import NoteForm from "@/components/main/NoteForm";
import ThemedView from "@/components/common/ThemedView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "@/styles/сolors";

interface NoteData {
  id: string;
  date: string;
  title: string;
  body: string;
  imageUri?: string;
  location?: { latitude: number; longitude: number };
}

const NoteEditorScreen: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const [isEditing, setIsEditing] = useState(!!route.params);
  const [imageUri, setImageUri] = useState<string | undefined>(
    route.params?.note?.imageUri
  );
  const [location, setLocation] = useState<
    { latitude: number; longitude: number } | undefined
  >(route.params?.note?.location);

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } =
          await Location.requestForegroundPermissionsAsync();
        if (newStatus !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Location permission is required to tag notes with location. Please enable it in settings.",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Open Settings", onPress: () => Linking.openSettings() },
            ]
          );
          return;
        }
      }
      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
    };

    requestLocationPermission();
  }, []);

  const initialValues: NoteData = {
    id: route.params?.note?.id || new Date().getTime().toString(),
    date: route.params?.note?.date || format(new Date(), "yyyy-MM-dd"),
    title: route.params?.note?.title || "",
    body: route.params?.note?.body || "",
    location: location,
  };

  const handleSave = async (values: NoteData) => {
    const newNote = { ...values, imageUri, location };
    try {
      const existingNotes = JSON.parse(
        (await AsyncStorage.getItem("notes")) || "[]"
      );
      const updatedNotes = isEditing
        ? existingNotes.map((note: NoteData) =>
            note.id === newNote.id ? newNote : note
          )
        : [...existingNotes, newNote];

      await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
      navigation.goBack();
    } catch (error) {
      console.error("Failed to save the note:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const existingNotes = JSON.parse(
        (await AsyncStorage.getItem("notes")) || "[]"
      );
      const updatedNotes = existingNotes.filter(
        (note: NoteData) => note.id !== initialValues.id
      );

      await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
      navigation.goBack();
    } catch (error) {
      console.error("Failed to delete the note:", error);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <ThemedView type="form">
      <TouchableOpacity
        style={{ marginBottom: 30 }}
        onPress={() => navigation.navigate("NoteListScreen")}
      >
        <Text style={styles.btnBack}>Back</Text>
      </TouchableOpacity>

      <NoteForm
        initialValues={initialValues}
        onSubmit={handleSave}
        onDelete={isEditing ? handleDelete : undefined}
        imageUri={imageUri}
        pickImage={pickImage}
        isEditing={isEditing}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  btnBack: {
    color: COLORS.accentPrimary,
    fontWeight: "700",
    fontSize: 18,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  imagePickerButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: COLORS.accentPrimary,
    borderRadius: 5,
    alignItems: "center",
  },
  imagePickerText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default NoteEditorScreen;
