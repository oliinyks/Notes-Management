import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth"; // Імпортуємо потрібні типи та функції з firebase/auth
import { auth } from "../../../firebaseConfig"; // Імпорт firebase auth з firebaseConfig
import { View, ActivityIndicator } from "react-native";
import MyTabs from "@/components/common/MyTabs";
import AuthScreen from "@/screens/AuthScreen";

const Stack = createStackNavigator();

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  // The function that handles the authorization state change
  const onAuthStateChangedHandler = (user: FirebaseUser | null) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    // Subscribe to the authorization state change
    const unsubscribe = onAuthStateChanged(auth, onAuthStateChangedHandler);
    return unsubscribe;
  }, [initializing]);

  if (initializing) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* If the user is not authorized */}
        {!user ? (
          <Stack.Screen name="Auth" component={AuthScreen} />
        ) : (
          <Stack.Screen name="Main" component={MyTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
