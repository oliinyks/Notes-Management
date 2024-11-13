import React, { useState, useCallback } from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedButton } from "@/components/common/ThemedButton";
import ThemedView from "@/components/common/ThemedView";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import NoteInfo from "@/components/main/NoteInfo";
import { useFocusEffect } from "@react-navigation/native";

type RootStackParamList = {
  NoteEditorScreen: { note: any } | undefined;
  NoteListScreen: undefined;
};

type NoteListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "NoteListScreen"
>;

interface NoteData {
  id: string;
  date: string;
  title: string;
  body: string;
  imageUri?: string;
}

const NoteListScreen: React.FC<NoteListScreenProps> = ({ navigation }) => {
  const [list, setList] = useState<NoteData[]>([]);

  useFocusEffect(
    useCallback(() => {
      fetchNotes();
    }, [])
  );

  // We load notes from AsyncStorage when loading the screen
  const fetchNotes = async () => {
    const notes = await AsyncStorage.getItem("notes");
    if (notes) {
      setList(JSON.parse(notes));
    }
  };
  // We update the list of notes after creation or editing
  const refreshList = async () => {
    const notes = await AsyncStorage.getItem("notes");
    if (notes) {
      setList(JSON.parse(notes));
    }
  };

  return (
    <ThemedView type="flatList">
      <Text style={styles.title}>Note List</Text>
      <ThemedButton
        title="Create a new note"
        onPress={() => navigation.navigate("NoteEditorScreen")}
      />
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteInfo
            note={item}
            onEdit={() =>
              navigation.navigate("NoteEditorScreen", { note: item })
            }
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No notes available</Text>
        }
        onRefresh={refreshList}
        refreshing={false}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  list: {
    paddingVertical: 10,
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
});

export default NoteListScreen;
