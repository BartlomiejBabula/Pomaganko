import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsModalsStackParamList } from "./types";
import SettingsLocationsScreen from "../screens/main/TabSettings/SettingsLocationsScreen";
import SettingsThemeScreen from "../screens/main/TabSettings/SettingsThemeScreen";
import SettingsChangePasswordScreen from "../screens/main/TabSettings/SettingsChangePasswordScreen";
import SettingsLocalizationScreen from "../screens/main/TabSettings/SettingsLocalizationScreen";
import SettingsProfileScreen from "../screens/main/TabSettings/SettingsProfileScreen";
import AboutAppScreen from "../screens/main/TabSettings/AboutAppScreen";

const SettingsStack =
  createNativeStackNavigator<SettingsModalsStackParamList>();

export const SettingsStackScreen = () => (
  <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
    <SettingsStack.Screen
      name='SettingsLocations'
      component={SettingsLocationsScreen}
    />
    <SettingsStack.Screen
      name='SettingsTheme'
      component={SettingsThemeScreen}
    />
    <SettingsStack.Screen
      name='SettingsChangePassword'
      component={SettingsChangePasswordScreen}
    />
    <SettingsStack.Screen
      name='SettingsLocalization'
      component={SettingsLocalizationScreen}
    />
    <SettingsStack.Screen
      name='SettingsProfile'
      component={SettingsProfileScreen}
    />
    <SettingsStack.Screen name='AboutApp' component={AboutAppScreen} />
  </SettingsStack.Navigator>
);
