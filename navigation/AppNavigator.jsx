import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screens } from "./screens";

const Stack = createNativeStackNavigator();

function Navigator() {
  // useMemo, damit screens nur bei Änderung gefiltert werden
  const validScreens = useMemo(
    () =>
      Array.isArray(screens)
        ? screens.filter(
            (screen) =>
              !!screen &&
              typeof screen.name === "string" &&
              typeof screen.getComponent === "function"
          )
        : [],
    [screens]
  );

  return (
    <Stack.Navigator
      initialRouteName="StartScreen"
      screenOptions={{
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      {validScreens.map(
        ({ name, getComponent, title = "", headerShown = false, ...rest }) => (
          <Stack.Screen
            key={name}
            name={name}
            getComponent={getComponent}
            options={{
              title,
              headerShown,
              ...rest.options,
            }}
          />
        )
      )}
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <View style={styles.container}>
      <Navigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent", // Fallback background
  },
});
