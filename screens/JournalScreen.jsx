import { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import Footer from "../components/Footer";
import styles from "../styles/JournalScreenStyles";

const STORAGE_KEY = "@journal_entries";

export default function JournalScreen() {
  const [entries, setEntries] = useState([]);
  const scrollRef = useRef();

  // Lade Einträge
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setEntries(JSON.parse(stored));
      } catch (e) {
        console.warn("Fehler beim Laden der Einträge", e);
      }
    })();
  }, []);

  // Speichere Einträge
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      } catch (e) {
        console.warn("Fehler beim Speichern", e);
      }
    })();
  }, [entries]);

  const handleAddEntry = () => {
    setEntries((prev) => [...prev, ""]);
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  const handleChangeText = (text, index) => {
    setEntries((prev) => {
      const updated = [...prev];
      updated[index] = text;
      return updated;
    });
  };

  const handleDeleteEntry = () => {
    if (entries.length === 0) {
      Alert.alert("Keine Einträge", "Es gibt keinen Eintrag zum Löschen.");
      return;
    }
    Alert.alert("Eintrag löschen", "Letzten Eintrag wirklich löschen?", [
      { text: "Abbrechen", style: "cancel" },
      {
        text: "Löschen",
        style: "destructive",
        onPress: () => setEntries((prev) => prev.slice(0, -1)),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Glass-Blur-Background */}
      <BlurView intensity={38} tint="light" style={StyleSheet.absoluteFill} />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.scrollWrapper}>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.entriesContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {entries.length === 0 ? (
              <View style={styles.entryBlock}>
                <Text style={styles.entryLabel}>
                  Noch keine Einträge. Starte mit deinem ersten Gedanken!
                </Text>
              </View>
            ) : (
              entries.map((entry, index) => (
                <View key={index} style={styles.entryBlock}>
                  <Text style={styles.entryLabel}>Eintrag {index + 1}</Text>
                  <TextInput
                    style={styles.textInput}
                    multiline
                    placeholder="Schreibe hier deine Gedanken..."
                    value={entry}
                    onChangeText={(text) => handleChangeText(text, index)}
                    placeholderTextColor="rgba(34, 34, 34, 0.35)"
                    underlineColorAndroid="transparent"
                    accessibilityLabel={`Journal-Eintrag ${index + 1}`}
                  />
                </View>
              ))
            )}
          </ScrollView>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={handleAddEntry}
            accessibilityRole="button"
            accessibilityLabel="Neuen Eintrag erstellen"
          >
            <Text style={styles.addBtnText}>Neuer Eintrag</Text>
          </TouchableOpacity>

          {entries.length > 0 && (
            <TouchableOpacity
              style={[styles.addBtn, styles.deleteBtn]}
              onPress={handleDeleteEntry}
              accessibilityRole="button"
              accessibilityLabel="Letzten Eintrag löschen"
            >
              <Text style={styles.addBtnText}>Löschen</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>

      <View style={styles.footerWrapper}>
        <Footer />
      </View>
    </SafeAreaView>
  );
}
