import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProfileHeader from "../components/ProfileHeader";
import Footer from "../components/Footer";
import MenuGrid from "../components/MenuGrid";
import styles from "../styles/HomeScreenStyles";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ProfileHeader />
      <MenuGrid navigation={navigation} />
      <Footer />
    </View>
  );
}
