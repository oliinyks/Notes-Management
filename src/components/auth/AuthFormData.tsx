import { StyleSheet, View, TextInput, Text, Button } from "react-native";
import { useFormik } from "formik";
import getAuthValidationSchema from "@/validation/getAuthValidationSchema";
import { gStyle } from "@/styles/globalStyles";
import { useState } from "react";
import { COLORS } from "@/styles/сolors";
import { Feather } from "@expo/vector-icons";
import { ThemedButton } from "../common/ThemedButton";

/**
 * `AuthFormData` is a component for user authentication that provides form fields
 * for email and password input, and optionally name input for new account creation.
 * It supports validation, password visibility toggling, and a loading state during submission.
 *
 * Features:
 * - Allows toggling of password visibility with an eye icon.
 * - Validates form inputs using a custom validation schema, with error messages displayed under invalid fields.
 * - Disables the submit button until all form fields are valid and have been modified.
 *
 * Props:
 * - `haveAccount`: A boolean indicating if the form is for login (`true`) or registration (`false`).
 * - `handleNext`: A function to handle the form submission, passing the collected data.
 * - `loading`: A boolean that indicates if the form is in a loading state (e.g., waiting for a network response).
 *
 * @component
 * @example
 * <AuthFormData haveAccount={true} handleNext={submitAuthData} loading={false} />
 */

interface AuthData {
  name: string;
  email: string;
  password: string;
}

interface AuthFormDataProps {
  haveAccount: boolean;
  handleNext: (data: AuthData) => Promise<void>;
  loading: boolean;
}

const AuthFormData: React.FC<AuthFormDataProps> = ({
  haveAccount,
  handleNext,
  loading,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: getAuthValidationSchema({ haveAccount: haveAccount }),
    onSubmit: (values) => handleNext(values),
  });

  return (
    <View style={{ gap: 24 }}>
      {!haveAccount && (
        <TextInput
          onChangeText={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          value={formik.values.name}
          placeholder="Full Name"
          style={gStyle.input}
          autoCorrect={false}
        />
      )}
      {formik.touched.name && formik.errors.name && (
        <Text>{formik.errors.name}</Text>
      )}

      <TextInput
        onChangeText={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
        value={formik.values.email}
        placeholder="Email"
        style={gStyle.input}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {formik.touched.email && formik.errors.email && (
        <Text>{formik.errors.email}</Text>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          value={formik.values.password}
          placeholder={haveAccount ? "Password" : "Create Password"}
          secureTextEntry={!showPassword}
          style={[gStyle.input, { flex: 1, paddingRight: 40 }]}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Feather
          name={!showPassword ? "eye-off" : "eye"}
          size={24}
          color={COLORS.accentPrimary}
          onPress={() => setShowPassword(!showPassword)}
          style={styles.icon}
        />
      </View>
      {formik.touched.password && formik.errors.password && (
        <Text>{formik.errors.password}</Text>
      )}

      <ThemedButton
        disabled={
          haveAccount
            ? !formik.dirty || !formik.isValid
            : !formik.dirty || !formik.isValid
        }
        style={{ marginTop: 20 }}
        onPress={formik.handleSubmit as any}
        title={loading ? "Loading..." : haveAccount ? "Sign In" : "Sign Up"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 12,
  },
});

export default AuthFormData;
