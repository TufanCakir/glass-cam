import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  Platform,
  Alert,
} from "react-native";
import { CameraView, Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import FilterSelector from "../components/FilterSelector";
import FilterOverlay from "../components/FilterOverlay";

const PHOTO_PREVIEW_DURATION = 1400;

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
    fontSize: 16,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 120,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  actionButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 50,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  snapButton: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    padding: 20,
    borderWidth: 2,
    borderColor: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
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
    textAlign: "center",
    marginBottom: 20,
  },
  closePreviewButton: {
    marginTop: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  closePreviewButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  filterScrollContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 8,
  },
  filterScrollViewContent: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    minWidth: "100%",
    gap: 12,
    paddingHorizontal: 12,
  },
});

export default function MinimalCameraScreen() {
  // Refs und States
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(undefined);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(undefined);
  const [filterId, setFilterId] = useState(null);
  const [facing, setFacing] = useState("back");
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  // =========== BERECHTIGUNGEN ===========
  useEffect(() => {
    (async () => {
      // Beide Berechtigungen parallel holen
      const [{ status: cameraStatus }, { status: libStatus }] =
        await Promise.all([
          Camera.requestCameraPermissionsAsync(),
          MediaLibrary.requestPermissionsAsync(),
        ]);
      setHasCameraPermission(cameraStatus === "granted");
      setHasMediaLibraryPermission(libStatus === "granted");
    })();
  }, []);

  // =========== FOTOVORSCHAU HANDLING ===========
  useEffect(() => {
    if (capturedPhoto) {
      const timer = setTimeout(
        () => setCapturedPhoto(null),
        PHOTO_PREVIEW_DURATION
      );
      return () => clearTimeout(timer);
    }
  }, [capturedPhoto]);

  // =========== FOTO AUFNEHMEN & SPEICHERN ===========
  const handleTakePicture = useCallback(async () => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(photo.uri);

      if (hasMediaLibraryPermission) {
        await MediaLibrary.saveToLibraryAsync(photo.uri);
      } else {
        // Plattform-übergreifender Hinweis
        if (Platform.OS === "ios" || Platform.OS === "android") {
          Alert.alert(
            "Speichern fehlgeschlagen",
            "Es konnte keine Berechtigung zum Speichern des Fotos in der Galerie erteilt werden. Bitte erlaube dies in den Einstellungen."
          );
        } else {
          console.warn("Keine Medienbibliotheks-Berechtigung!");
        }
      }
    } catch (e) {
      Alert.alert(
        "Fehler",
        "Beim Aufnehmen oder Speichern des Fotos ist ein Fehler aufgetreten."
      );
      console.error("Fehler beim Foto:", e);
    }
  }, [hasMediaLibraryPermission]);

  // =========== KAMERA WECHSELN ===========
  const flipCamera = useCallback(() => {
    setFacing((facing) => (facing === "back" ? "front" : "back"));
  }, []);

  // =========== BERECHTIGUNGS-MESSAGE-RENDERING ===========
  const renderPermissionMessage = (perm, label) => {
    if (perm === undefined) {
      return (
        <View style={styles.container}>
          <Text style={styles.permissionText}>
            Lade {label}-Berechtigung...
          </Text>
        </View>
      );
    }
    if (perm === false) {
      return (
        <View style={styles.container}>
          <Text style={styles.permissionText}>
            Keine {label}-Berechtigung!{"\n"}Bitte erlaube Zugriff in den
            Systemeinstellungen.
          </Text>
        </View>
      );
    }
    return null;
  };

  // Frühzeitiges Rendering für Berechtigungen
  const camMsg = renderPermissionMessage(hasCameraPermission, "Kamera");
  if (camMsg) return camMsg;

  const libMsg = renderPermissionMessage(
    hasMediaLibraryPermission,
    "Medienbibliothek"
  );
  if (libMsg) return libMsg;

  // =========== MAIN RENDER ===========
  return (
    <View style={styles.container}>
      {/* Fotovorschau */}
      {capturedPhoto ? (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: capturedPhoto }}
            style={styles.previewImage}
            pointerEvents="none"
          />
          <View style={styles.previewOverlay}>
            <Text style={styles.previewText}>Foto gespeichert!</Text>
            <Pressable
              style={styles.closePreviewButton}
              accessibilityLabel="Vorschau schließen"
              onPress={() => setCapturedPhoto(null)}
            >
              <Text style={styles.closePreviewButtonText}>Schließen</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <>
          <CameraView
            style={styles.camera}
            ref={cameraRef}
            facing={facing}
            enableTorch={false}
            photo={true}
          />
          {/* Filter-Overlay */}
          <FilterOverlay filterId={filterId} />

          {/* Action Buttons */}
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

      {/* Filter-ScrollView immer sichtbar */}
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
