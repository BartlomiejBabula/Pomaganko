import { SafeAreaView } from "react-native";
import { Button } from "@rneui/themed";
import { translate } from "../../../i18n/i18n";
import { StackActions } from "@react-navigation/native";
import { SettingsLocationsScreenParams } from "../../../routes/types";

const SettingsLocationsScreen = ({
  navigation,
}: SettingsLocationsScreenParams) => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Button
        title={"toggleLanguage"}
        onPress={() => {
          if (translate.locale === "en") {
            translate.locale = "pl";
          } else {
            translate.locale = "en";
          }
          navigation.dispatch(
            StackActions.replace("BottomTab", { screen: "Settings" })
          );
        }}
      />
    </SafeAreaView>
  );
};

export default SettingsLocationsScreen;
