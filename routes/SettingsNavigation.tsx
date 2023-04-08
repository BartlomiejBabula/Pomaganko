import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsModalsStackParamList } from "./types";
import SettingsLocationsScreen from "../screens/main/TabSettings/SettingsLocationsScreen";
import SettingsThemeScreen from "../screens/main/TabSettings/SettingsThemeScreen";

const SettingsStack =
  createNativeStackNavigator<SettingsModalsStackParamList>();

export const SettingsStackScreen = () => (
  <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
    <SettingsStack.Screen
      name='SettingsLocations'
      component={SettingsLocationsScreen}
      // options={{ animation: "slide_from_right" }}
    />
    <SettingsStack.Screen
      name='SettingsTheme'
      component={SettingsThemeScreen}
      // options={{ animation: "slide_from_right" }}
    />
  </SettingsStack.Navigator>
);
