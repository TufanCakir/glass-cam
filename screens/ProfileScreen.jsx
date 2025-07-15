import { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  MaterialIcons,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Footer from "../components/Footer";
import styles from "../styles/ProfileScreenStyles";

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

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(ICON_OPTIONS[0]);
  const [loading, setLoading] = useState(true);

  // Lade Profil-Infos aus AsyncStorage
  useEffect(() => {
    async function loadProfile() {
      try {
        const [storedName, storedIconName] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEY_NAME),
          AsyncStorage.getItem(STORAGE_KEY_ICON),
        ]);
        if (storedName) setName(storedName);
        if (storedIconName) {
          const found = ICON_OPTIONS.find((opt) => opt.name === storedIconName);
          if (found) setSelectedIcon(found);
        }
      } catch (e) {
        console.warn("Fehler beim Laden des Profils:", e);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const saveProfile = useCallback(async () => {
    if (!name.trim()) {
      Alert.alert("Fehler", "Bitte gib einen Namen ein.");
      return;
    }
    try {
      await AsyncStorage.setItem(STORAGE_KEY_NAME, name.trim());
      await AsyncStorage.setItem(STORAGE_KEY_ICON, selectedIcon.name);
      Alert.alert("Erfolg", "Profil gespeichert.");
    } catch (e) {
      console.warn("Speichern fehlgeschlagen", e);
      Alert.alert("Fehler", "Profil konnte nicht gespeichert werden.");
    }
  }, [name, selectedIcon]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <BlurView intensity={38} tint="light" style={StyleSheet.absoluteFill} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 36 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.heading}>Profil</Text>
          <View style={styles.section}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Dein Name"
              value={name}
              onChangeText={setName}
              returnKeyType="done"
              maxLength={32}
              accessibilityLabel="Profilname"
              editable={!loading}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Icon auswählen</Text>
            <View style={styles.iconsRow}>
              {ICON_OPTIONS.map((opt) => {
                const IconComponent = opt.lib;
                const isSelected = opt.name === selectedIcon.name;
                return (
                  <TouchableOpacity
                    key={opt.name}
                    style={[
                      styles.iconBtn,
                      isSelected && styles.iconSelected,
                      loading && { opacity: 0.5 },
                    ]}
                    onPress={() => !loading && setSelectedIcon(opt)}
                    disabled={loading}
                    accessibilityRole="button"
                    accessibilityLabel={`Icon auswählen: ${opt.name}`}
                  >
                    <IconComponent
                      name={opt.name}
                      size={36}
                      color={isSelected ? "#3498db" : "#555"}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={styles.preview}>
            <Text style={styles.previewLabel}>Vorschau:</Text>
            <selectedIcon.lib name={selectedIcon.name} size={48} color="#333" />
            <Text style={styles.previewName}>{name || "Dein Name"}</Text>
          </View>
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={saveProfile}
            accessibilityRole="button"
            accessibilityLabel="Profil speichern"
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={styles.saveBtnText}>
              {loading ? "Lädt..." : "Speichern"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <Footer />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
