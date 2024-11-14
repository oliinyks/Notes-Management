import React, { useEffect, useState, useRef } from "react";
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
  const mapRef = useRef<MapView>(null); // використання рефа для карти

  useEffect(() => {
    const fetchNotes = async () => {
      const notesData = await AsyncStorage.getItem("notes");
      if (notesData) {
        setNotes(JSON.parse(notesData));
      }
    };
    fetchNotes();
  }, []);

  //We filter notes that have a location
  const notesWithLocation = notes.filter((note) => note.location);

  useEffect(() => {
    if (notesWithLocation.length > 0 && mapRef.current) {
      mapRef.current.fitToCoordinates(
        notesWithLocation.map((note) => note.location!),
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        }
      );
    }
  }, [notesWithLocation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Note Map</Text>
      </View>
      {notesWithLocation.length > 0 ? (
        <MapView ref={mapRef} style={styles.map}>
          {notesWithLocation.map((note) => (
            <Marker
              key={note.id}
              coordinate={{
                latitude: note.location!.latitude,
                longitude: note.location!.longitude,
              }}
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
