import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { BlurView } from "expo-blur";
import styles from "../styles/StartScreenStyles";

export default function StartScreen() {
  const navigation = useNavigation();

  const handleStart = () => {
    navigation.replace("HomeScreen");
  };

  const version = Constants.expoConfig?.version ?? "1.0.0";
  const buildNumber =
    Constants.expoConfig?.ios?.buildNumber ??
    Constants.expoConfig?.android?.versionCode ??
    "1";

  return (
    <View style={styles.container}>
      <BlurView intensity={38} tint="light" style={StyleSheet.absoluteFill} />

      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Glass Cam</Text>

        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.versionText}>
          Version {version}
          {buildNumber !== "1" ? ` (Build ${buildNumber})` : ""}
        </Text>
        <Text style={styles.copyrightText}>
          © {new Date().getFullYear()} Tufan Cakir
        </Text>
      </View>
    </View>
  );
}
