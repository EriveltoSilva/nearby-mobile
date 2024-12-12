import { Steps } from "@/components/steps";
import { Welcome } from "@/components/welcome";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Welcome />
      <Steps />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 20,
    gap: 40,
  },
});
