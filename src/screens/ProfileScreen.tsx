import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { auth } from "../../firebaseConfig";
import { ThemedButton } from "@/components/common/ThemedButton";
import ThemedView from "@/components/common/ThemedView";

const ProfileScreen: React.FC = () => {
  const user = auth.currentUser;

  return (
    <ThemedView>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.welcomeText}>
        Welcome back, {user?.displayName || "User"}
      </Text>
      <Text style={styles.welcomeEmail}>({user?.email})</Text>
      <ThemedButton title="Sign out" onPress={() => auth.signOut()} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    marginBottom: 10,
  },
  welcomeEmail: {
    marginBottom: 30,
  },
});

export default ProfileScreen;
