import { useState, useRef, useCallback, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import AppNavigator from "./navigation/AppNavigator";
import useUpdateChecker from "./hooks/useUpdateChecker";
import OnlineGuard from "./components/OnlineGuard";
import UpdateOverlay from "./components/UpdateOverlay";
import LoadingOverlay from "./components/LoadingOverlay";

enableScreens();

export default function App() {
  const [loading, setLoading] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const loadingTimeoutRef = useRef();

  useUpdateChecker(setUpdateVisible);

  // Memoized Callback
  const handleNavigationStateChange = useCallback(() => {
    setLoading(true);
    clearTimeout(loadingTimeoutRef.current);
    loadingTimeoutRef.current = setTimeout(() => setLoading(false), 450);
  }, []);

  // Clean up Timer on Unmount
  useEffect(() => {
    return () => clearTimeout(loadingTimeoutRef.current);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <OnlineGuard>
        <NavigationContainer onStateChange={handleNavigationStateChange}>
          <AppNavigator />
        </NavigationContainer>
      </OnlineGuard>

      {/* Overlays */}
      {loading && <LoadingOverlay />}
      {updateVisible && <UpdateOverlay />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#282c34", // Glass-Dark Fallback
  },
});
