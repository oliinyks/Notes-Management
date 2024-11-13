import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "@/screens/ProfileScreen";
import NoteMapScreen from "@/screens/NoteMapScreen";
import NoteListStack from "@/navigation/NoteListStack";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="NoteList"
        component={NoteListStack}
        options={{ title: "Note List" }}
      />
      <Tab.Screen
        name="NoteMap"
        component={NoteMapScreen}
        options={{ title: "Note Map" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
}
