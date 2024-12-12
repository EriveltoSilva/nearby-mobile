import { Button } from "@/components/button";
import { Steps } from "@/components/steps";
import { Welcome } from "@/components/welcome";
import { StyleSheet, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Welcome />
      <Steps />
      <Button>
        <Button.Text>Começar</Button.Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    paddingBottom: 20,
    gap: 40,
  },
});
