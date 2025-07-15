import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Keyboard,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../components/Footer";
import styles from "../styles/TextEditorScreenStyles";

const STORAGE_KEY = "@rich_text_content_simple";

export default function TextEditorScreen() {
  const [text, setText] = useState("");

  useEffect(() => {
    const loadContent = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setText(saved);
      } catch (err) {
        console.error("Fehler beim Laden:", err);
      }
    };
    loadContent();
  }, []);

  const handleContentChange = useCallback(async (content) => {
    try {
      setText(content);
      await AsyncStorage.setItem(STORAGE_KEY, content);
    } catch (err) {
      console.error("Fehler beim Speichern:", err);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          <View style={styles.inner}>
            <Text style={styles.title}>Text Editor</Text>

            <Text style={styles.label}>Inhalt:</Text>

            <ScrollView
              style={styles.editorWrapper}
              keyboardShouldPersistTaps="handled"
            >
              <TextInput
                style={styles.editor}
                multiline
                placeholder="Schreib etwas…"
                placeholderTextColor="#888"
                value={text}
                onChangeText={handleContentChange}
              />
              <View style={{ height: 100 }} />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Pressable>

      {/* Footer */}
      <View style={styles.footerWrapper}>
        <Footer />
      </View>
    </SafeAreaView>
  );
}
