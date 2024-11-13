import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface NoteData {
  id: string;
  title: string;
  body: string;
  location?: { latitude: number; longitude: number };
}

const NoteMapScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [notes, setNotes] = useState<NoteData[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const notesData = await AsyncStorage.getItem("notes");
      if (notesData) {
        setNotes(JSON.parse(notesData));
      }
    };
    fetchNotes();
  }, []);

  // We filter notes that have a location
  const notesWithLocation = notes.filter((note) => note.location);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Note Map</Text>
      </View>
      {notesWithLocation.length > 0 ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {notesWithLocation.map((note) => (
            <Marker
              key={note.id}
              coordinate={note.location!}
              title={note.title}
              description={note.body}
              onPress={() => navigation.navigate("NoteEditorScreen", { note })}
            />
          ))}
        </MapView>
      ) : (
        <View style={styles.noLocationContainer}>
          <Text style={styles.noLocationText}>
            No notes with location found
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    position: "absolute",
    top: 20,
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  noLocationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noLocationText: {
    fontSize: 18,
    color: "#888",
  },
});

export default NoteMapScreen;
