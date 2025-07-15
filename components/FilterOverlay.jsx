import { View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

// Mapping für Filterfarben und Spezialfälle wie "glass"
const FILTER_OVERLAYS = {
  glass: { blur: { intensity: 50, tint: "dark" } },
  fire: { color: "rgba(255, 100, 0, 0.1)" },
  ice: { color: "rgba(0, 200, 255, 0.1)" },
  nature: { color: "rgba(6, 214, 160, 0.1)" },
  void: { color: "rgba(114, 9, 183, 0.1)" },
  hell: { color: "rgba(230, 57, 70, 0.1)" },
  heaven: { color: "rgba(162, 210, 255, 0.1)" },
  dream: { color: "rgba(255, 200, 221, 0.1)" },
  neon: { color: "rgba(247, 37, 133, 0.1)" },
  midnight: { color: "rgba(58, 12, 163, 0.1)" },
  autumn: { color: "rgba(255, 159, 28, 0.1)" },
  sakura: { color: "rgba(255, 183, 195, 0.1)" },
  cyber: { color: "rgba(0, 245, 212, 0.1)" },
  ocean: { color: "rgba(0, 119, 182, 0.1)" },
  galaxy: { color: "rgba(114, 9, 183, 0.1)" },
  lightning: { color: "rgba(255, 214, 10, 0.1)" },
  vintage: { color: "rgba(214, 167, 122, 0.1)" },
  darksoul: { color: "rgba(26, 26, 29, 0.1)" },
};

export default function FilterOverlay({ filterId }) {
  if (!filterId || filterId === "none") return null;

  const overlay = FILTER_OVERLAYS[filterId];

  // BlurView bei "glass"
  if (overlay?.blur) {
    return (
      <BlurView
        intensity={overlay.blur.intensity}
        tint={overlay.blur.tint}
        style={StyleSheet.absoluteFill}
      />
    );
  }

  // Farbiger Overlay
  if (overlay?.color) {
    return (
      <View
        style={[StyleSheet.absoluteFill, { backgroundColor: overlay.color }]}
      />
    );
  }

  // Falls kein passender Filter gefunden
  return null;
}
