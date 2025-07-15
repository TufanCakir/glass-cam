import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { CameraView, Camera } from "expo-camera";
import { MediaLibrary } from "expo-media-library";

import FilterSelector from "../components/FilterSelector";
import FilterOverlay from "../components/FilterOverlay";

const PHOTO_PREVIEW_DURATION = 1400; // Dauer, wie lange das aufgenommene Foto angezeigt wird

// Zentralisierte Styles für die Komponente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  permissionText: {
    color: "#fff",
    textAlign: "center",
    marginHorizontal: 20,
    fontSize: 16, // Etwas größere Schrift für bessere Lesbarkeit
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  // Styles für die Buttons
  buttonContainer: {
    position: "absolute",
    bottom: 120, // Über den Filter-Optionen platzieren
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 10, // Stellt sicher, dass die Buttons über anderen Elementen liegen
  },
  actionButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 50, // Macht sie rund
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  snapButton: {
    backgroundColor: "rgba(255, 255, 255, 0.4)", // Etwas sichtbarer für den Haupt-Action-Button
    padding: 20,
    borderWidth: 2,
    borderColor: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Styles für die Fotovorschau
  previewContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  previewOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  previewText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  // Style für den Filter-Scrollbereich
  filterScrollContainer: {
    position: "absolute",
    bottom: 0, // Ganz unten positionieren
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 8,
  },
  filterScrollViewContent: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    minWidth: "100%",
    gap: 12, // RN 0.71+ oder mit marginRight als fallback
    paddingHorizontal: 12,
  },
});

export default function MinimalCameraScreen() {
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null); // Umbenannt zur Klarheit
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(null); // Umbenannt zur Klarheit

  const [filterId, setFilterId] = useState(null);
  const [facing, setFacing] = useState("back"); // Für Selfie-Funktion
  const [capturedPhoto, setCapturedPhoto] = useState(null); // Für Fotovorschau

  // Effekt zum Anfordern der Kamera-Berechtigungen
  useEffect(() => {
    let isActive = true;
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (isActive) setHasCameraPermission(status === "granted");
    })();
    return () => {
      isActive = false;
    };
  }, []);

  // Effekt zum Anfordern der Medienbibliothek-Berechtigungen
  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(status === "granted");
    })();
  }, []); // Leeres Dependency-Array, da dieser Effekt nur einmal beim Mounten ausgeführt werden soll

  // Vorschau Timer für aufgenommene Fotos
  useEffect(() => {
    if (!capturedPhoto) return;
    const timer = setTimeout(
      () => setCapturedPhoto(null),
      PHOTO_PREVIEW_DURATION
    );
    return () => clearTimeout(timer);
  }, [capturedPhoto]);

  // Funktion zum Aufnehmen eines Fotos und Speichern in der Galerie
  const handleTakePicture = useCallback(async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedPhoto(photo.uri);

        // Speicher das Foto direkt in die Galerie, wenn Berechtigung erteilt
        if (hasMediaLibraryPermission) {
          await MediaLibrary.saveToLibraryAsync(photo.uri);
          console.log("Foto in Galerie gespeichert:", photo.uri);
        } else {
          console.warn(
            "Keine Berechtigung zum Speichern in der Medienbibliothek."
          );
          // Optional: Hier könnte eine Meldung an den Nutzer angezeigt werden
        }
        console.log("Foto aufgenommen:", photo.uri);
      } catch (e) {
        console.error("Fehler beim Aufnehmen oder Speichern des Fotos:", e);
      }
    }
  }, [hasMediaLibraryPermission]); // Abhängigkeit von hasMediaLibraryPermission hinzugefügt

  // Funktion zum Wechseln der Kamera (Selfie-Button)
  const flipCamera = useCallback(() => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  }, []);

  // Hilfsfunktion zum Rendern der Berechtigungs-Nachrichten
  const renderPermissionMessage = (permissionStatus, permissionType) => {
    if (permissionStatus === null) {
      return (
        <View style={styles.container}>
          <Text style={styles.permissionText}>
            Lade {permissionType}-Berechtigung...
          </Text>
        </View>
      );
    }
    if (permissionStatus === false) {
      return (
        <View style={styles.container}>
          <Text style={styles.permissionText}>
            Keine {permissionType}-Berechtigung!{"\n"}
            Bitte erlaube Zugriff in den Systemeinstellungen.
          </Text>
        </View>
      );
    }
    return null; // Keine Nachricht, wenn Berechtigung erteilt
  };

  // Überprüfe zuerst Kamera-Berechtigung
  const cameraPermissionMessage = renderPermissionMessage(
    hasCameraPermission,
    "Kamera"
  );
  if (cameraPermissionMessage) {
    return cameraPermissionMessage;
  }

  // Überprüfe dann Medienbibliothek-Berechtigung
  const mediaLibraryPermissionMessage = renderPermissionMessage(
    hasMediaLibraryPermission,
    "Medienbibliothek"
  );
  if (mediaLibraryPermissionMessage) {
    return mediaLibraryPermissionMessage;
  }

  // Haupt-Rendering, wenn alle Berechtigungen erteilt sind
  return (
    <View style={styles.container}>
      {capturedPhoto ? (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: capturedPhoto }}
            style={styles.previewImage}
            pointerEvents="none"
          />
          <View style={styles.previewOverlay}>
            <Text style={styles.previewText}>Foto gespeichert</Text>
          </View>
        </View>
      ) : (
        <>
          <CameraView
            style={styles.camera}
            ref={cameraRef}
            facing={facing} // Verwende den facing-State
            enableTorch={false}
            photo={true}
          />
          {/* Filter-Overlay */}
          <FilterOverlay filterId={filterId} />

          {/* Aktions-Buttons: Kamera wechseln und Foto aufnehmen */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={flipCamera}
              accessibilityLabel="Kamera wechseln"
            >
              <Text style={styles.buttonText}>🔄</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.snapButton]}
              onPress={handleTakePicture}
              accessibilityLabel="Foto aufnehmen"
            >
              <Text style={styles.buttonText}>📸</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Filter-Auswahl am unteren Rand */}
      <View style={styles.filterScrollContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollViewContent}
        >
          <FilterSelector
            currentFilterId={filterId}
            setFilterId={setFilterId}
          />
        </ScrollView>
      </View>
    </View>
  );
}
