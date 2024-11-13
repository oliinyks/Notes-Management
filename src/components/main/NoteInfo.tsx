import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ThemedButton } from "@/components/common/ThemedButton";

interface NoteData {
  id: string;
  date: string;
  title: string;
  body: string;
  imageUri?: string;
}

interface NoteInfoProps {
  note: NoteData;
  onEdit: () => void;
}

const NoteInfo: React.FC<NoteInfoProps> = ({ note, onEdit }) => {
  return (
    <View style={styles.noteContainer}>
      <View style={styles.innerBox}>
        {note.imageUri && (
          <Image source={{ uri: note.imageUri }} style={styles.noteImage} />
        )}
        <View style={styles.noteContent}>
          <Text style={styles.noteDate}>{note.date}</Text>
          <Text style={styles.noteTitle}>{note.title}</Text>
        </View>
        <ThemedButton title="Edit" style={{ width: 100 }} onPress={onEdit} />
      </View>
      <Text style={styles.noteBody}>{note.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  innerBox: {
    flexDirection: "row",
  },
  noteImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  noteContent: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  noteDate: {
    color: "#888",
    fontSize: 12,
    marginTop: 4,
  },
  noteBody: {
    fontSize: 14,
    color: "#555",
    marginTop: 6,
  },
});

export default NoteInfo;
