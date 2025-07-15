import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import styles from "../styles/OnlineGuardStyles";
import { BlurView } from "expo-blur";
import NetInfo from "@react-native-community/netinfo";

export default function OnlineGuard({ children }) {
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    // Initialen Status abrufen
    NetInfo.fetch().then((state) => {
      const reachable =
        state.isConnected && state.isInternetReachable !== false;
      setIsConnected(reachable);
    });

    // Live-Aktualisierung
    const unsubscribe = NetInfo.addEventListener((state) => {
      const reachable =
        state.isConnected && state.isInternetReachable !== false;
      setIsConnected(reachable);
    });

    return () => unsubscribe();
  }, []);

  if (isConnected === null) {
    return (
      <View style={styles.overlay}>
        <BlurView intensity={50} tint="light" style={StyleSheet.absoluteFill} />
        <Text style={styles.subtext}>Verbindung wird geprüft…</Text>
      </View>
    );
  }

  if (!isConnected) {
    return (
      <View style={styles.overlay}>
        <BlurView intensity={50} tint="light" style={StyleSheet.absoluteFill} />
        <Text style={styles.message}>⚠️ Keine Internetverbindung</Text>
        <Text style={styles.subtext}>
          Bitte überprüfe deine Netzwerkverbindung.
        </Text>
      </View>
    );
  }

  return <>{children}</>;
}
