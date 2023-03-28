import { SafeAreaView } from "react-native";
import { Text } from "@rneui/themed";
import { SettingsThemeScreenParams } from "../../../types";

const SettingsThemeScreen = ({ navigation }: SettingsThemeScreenParams) => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Theme</Text>
    </SafeAreaView>
  );
};

export default SettingsThemeScreen;
