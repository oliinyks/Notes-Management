import { useState } from "react";
import ThemedView from "@/components/common/ThemedView";
import { Text, StyleSheet } from "react-native";
import AuthFormData from "@/components/auth/AuthFormData";
import { ThemedButton } from "@/components/common/ThemedButton";
import { auth } from "../../firebaseConfig";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

interface AuthData {
  name: string;
  email: string;
  password: string;
}

const AuthScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [haveAccount, setHaveAccount] = useState(false);

  const handleAuth = async (data: AuthData) => {
    setLoading(true);
    try {
      if (haveAccount) {
        // User login
        await signInWithEmailAndPassword(auth, data.email, data.password);
        alert("Welcome back!");
      } else {
        // User registration
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        // Update user profile to add name
        if (userCredential.user) {
          await updateProfile(userCredential.user, {
            displayName: data.name,
          });
        }
        alert("Check your emails!");
      }
    } catch (e: any) {
      const err = e as FirebaseError;
      alert("Operation failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView type="form">
      <Text style={styles.title}>{haveAccount ? "Sign In" : "Sign Up"}</Text>
      <AuthFormData
        haveAccount={haveAccount}
        handleNext={handleAuth}
        loading={loading}
      />
      <ThemedButton
        style={{ marginTop: 20 }}
        type="additional"
        title={haveAccount ? "Sign Up" : "Sign In"}
        onPress={() => setHaveAccount(!haveAccount)}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 86,
    marginBottom: 43,
    textAlign: "center",
    fontWeight: "500",
    fontSize: 30,
  },
});

export default AuthScreen;
