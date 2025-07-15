// components/ProfileHeader.js
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import styles from "../styles/ProfileHeaderStyles";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  MaterialIcons,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

// Gleiche Konstanten wie in ProfileScreen:
const STORAGE_KEY_NAME = "@profile_name";
const STORAGE_KEY_ICON = "@profile_icon";

const ICON_OPTIONS = [
  { name: "face", lib: MaterialIcons },
  { name: "user-circle", lib: FontAwesome },
  { name: "person-circle", lib: Ionicons },
  { name: "account", lib: MaterialCommunityIcons },
  { name: "person-outline", lib: Ionicons },
  { name: "user", lib: FontAwesome },
  { name: "account-circle-outline", lib: MaterialCommunityIcons },
  { name: "person-pin", lib: MaterialIcons },
  { name: "user-alt", lib: FontAwesome5 },
];

export default function ProfileHeader() {
  const [name, setName] = useState("");
  const [iconConfig, setIconConfig] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const storedName = await AsyncStorage.getItem(STORAGE_KEY_NAME);
        const storedIconName = await AsyncStorage.getItem(STORAGE_KEY_ICON);

        if (storedName) setName(storedName);
        if (storedIconName) {
          const match = ICON_OPTIONS.find((opt) => opt.name === storedIconName);
          if (match) setIconConfig(match);
        }
      } catch (e) {
        console.warn("Header-Profile-Daten konnten nicht geladen werden", e);
      }
    })();
  }, []);

  const Icon = iconConfig?.lib;

  return (
    <View style={styles.container}>
      <BlurView intensity={38} tint="light" style={StyleSheet.absoluteFill} />
      {Icon && (
        <Icon
          name={iconConfig.name}
          size={36}
          color="rgba(255,255,255,0.20)"
          style={styles.icon}
        />
      )}
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}
