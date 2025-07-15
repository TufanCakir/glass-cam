import { ActivityIndicator, View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import styles from "../styles/LoadingOverlayStyles";

export default function LoadingOverlay() {
  return (
    <View style={styles.loadingOverlayBlack}>
      <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill} />
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}
