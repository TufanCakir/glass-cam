import {
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  Linking,
  StyleSheet,
} from "react-native";
import styles from "../styles/SettingsGridStyles";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { settingsButtons } from "../data/settingsButtons";
import { BlurView } from "expo-blur";

const iconSets = {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
};

export default function SettingsGrid({ navigation, onClose, onResetAccount }) {
  const handlePress = (item) => {
    if (item.isReset) return onResetAccount?.();
    if (item.isClose) return onClose?.();
    if (item.screen) return navigation.navigate(item.screen);
    if (item.url) return Linking.openURL(item.url);
  };

  const renderItem = ({ item }) => {
    const IconComponent =
      item.icon?.set && iconSets[item.icon.set]
        ? iconSets[item.icon.set]
        : null;

    return (
      <TouchableOpacity
        onPress={() => handlePress(item)}
        style={styles.button}
        accessibilityRole="button"
        accessibilityLabel={item.accessibilityLabel || item.title}
        accessibilityHint={item.accessibilityHint}
      >
        <BlurView intensity={30} tint="light" style={StyleSheet.absoluteFill} />
        <View style={styles.iconWrapper}>
          {IconComponent && item.icon?.name && (
            <IconComponent
              name={item.icon.name}
              size={28}
              color="white"
              accessibilityElementsHidden={true}
              importantForAccessibility="no"
            />
          )}
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>{item.title}</Text>
            {item.url && (
              <Feather
                name="external-link"
                size={14}
                color="white"
                style={styles.externalIcon}
                accessibilityElementsHidden={true}
                importantForAccessibility="no"
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.screenContainer} accessible={false}>
      <FlatList
        data={settingsButtons}
        keyExtractor={(item, index) =>
          item?.screen || item?.title || `btn-${index}`
        }
        numColumns={3}
        contentContainerStyle={styles.gridContent}
        renderItem={renderItem}
        accessibilityRole="menu"
        accessibilityLabel="Einstellungen"
      />
    </SafeAreaView>
  );
}
