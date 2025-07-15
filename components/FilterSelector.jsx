import { View, TouchableOpacity, Text } from "react-native";
import filterData from "../data/filterData.json";
import styles from "../styles/FilterSelectorStyles";

export default function FilterSelector({ currentFilterId, setFilterId }) {
  return (
    <View style={styles.container}>
      {filterData.map((filter) => {
        const isActive = currentFilterId === filter.id;
        return (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.button,
              isActive && { backgroundColor: "rgba(255, 255, 255, 0.3)" },
            ]}
            onPress={() => setFilterId(filter.id)}
          >
            <Text style={[styles.text, isActive && styles.textActive]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
