import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import styles from "../styles/UpdateOverlayStyles";

export default function UpdateOverlay() {
  return (
    <View style={styles.updateOverlayBlock}>
      <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill} />
      <ActivityIndicator size="large" color="#fff" />
      <Text style={styles.updateText}>Update wird geladen…</Text>
    </View>
  );
}
