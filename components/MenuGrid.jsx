import { useState, useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { BlurView } from "expo-blur";
import { menuButtons } from "../data/menuButtons";
import styles from "../styles/MenuGridStyles";
import {
  AntDesign,
  FontAwesome5,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";

const iconSets = {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
  AntDesign,
  MaterialIcons,
  Entypo,
};

const ICON_SIZE = 28;

export default function MenuGrid({ navigation }) {
  const data = Array.isArray(menuButtons) ? menuButtons : [];
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = useCallback(
    ({ item }) => {
      const { title = "Kein Titel", screen, icon } = item || {};
      const IconComponent =
        icon?.set && iconSets[icon.set] ? iconSets[icon.set] : null;

      return (
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => screen && navigation.navigate(screen)}
          activeOpacity={0.75}
          accessibilityRole="button"
          accessibilityLabel={item.accessibilityLabel || title}
          accessibilityHint={item.accessibilityHint || `${title} öffnen`}
        >
          <BlurView
            intensity={30}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.iconWrapper}>
            {IconComponent && icon?.name && (
              <IconComponent
                name={icon.name}
                size={ICON_SIZE}
                color={icon.color || "#fff"}
                accessibilityElementsHidden
                importantForAccessibility="no"
              />
            )}
            <Text style={styles.label}>{title}</Text>
          </View>
        </TouchableOpacity>
      );
    },
    [navigation]
  );

  return (
    <View style={styles.gridContainer}>
      {/* Info-Button oben rechts */}
      <View style={styles.topRightButton}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          accessibilityRole="button"
          accessibilityLabel="Neuigkeiten anzeigen"
        >
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="rgba(255,255,255,0.7)"
            accessibilityElementsHidden
            importantForAccessibility="no"
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item, index) =>
          item?.screen || item?.title || `menu-${index}`
        }
        numColumns={3}
        contentContainerStyle={styles.gridContent}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        accessibilityRole="grid"
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
        accessibilityViewIsModal
      >
        <SafeAreaView style={styles.modalOverlay}>
          <View
            style={styles.modalContent}
            accessible
            accessibilityLabel="Neuigkeiten"
          >
            <Text style={styles.modalTitle}>Neuigkeiten</Text>
            <Text style={styles.modalText}>
              Hier sind die neuesten Funktionen und Updates, die wir hinzugefügt
              haben:
              {"\n"}• Neues Design & Layout
              {"\n"}• Verbesserte Benutzeroberfläche
              {"\n"}• Neue & entfernte Funktionen
              {"\n"}• Schnellere Performance
              {"\n"}• Neue Icons für Menü & Fußzeile
              {"\n"}• Verbesserte Barrierefreiheit
              {"\n"}• Stabilität & Sicherheit erhöht
              {"\n"}• Viele Fehlerbehebungen
            </Text>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Neuigkeiten schließen"
            >
              <Text style={styles.closeButtonText}>Schließen</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
