import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import SelectLocationScreen from "../screens/main/SelectLocation/SelectLocationScreen";
import SearchFilterScreen from "../screens/main/TabSearch/SearchFilterScreen";
import CharityProfileScreen from "../screens/main/CharityProfile/CharityProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootNavigationParamList } from "./types";
import { RootReducerType } from "../reducers/types";
import ChatScreen from "../screens/main/TabMessages/ChatScreen";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import OfferScreen from "../screens/main/OfferScreen/OfferScreen";
import ImgShowScreen from "../screens/main/ImageGallery/ImgShowScreen";
import { useSelector } from "react-redux";
import { TabStackScreen } from "./BottomTabsNavigation";
import { AuthStackScreen } from "./AuthNavigation";
import { SettingsStackScreen } from "./SettingsNavigation";
import { AddOfferStackScreen, AddOfferStack } from "./AddOfferNavigation";

LogBox.ignoreAllLogs();
const RootStack = createNativeStackNavigator<RootNavigationParamList>();

NavigationBar.setBackgroundColorAsync("white");

const RootStackScreen = () => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen
      name='BottomTab'
      component={TabStackScreen}
      options={{ animation: "slide_from_left" }}
    />
    <RootStack.Screen
      name='AddOfferStack'
      component={AddOfferStackScreen}
      options={{ animation: "slide_from_bottom" }}
    />
    <RootStack.Screen
      name='SearchFilter'
      component={SearchFilterScreen}
      options={{ animation: "slide_from_bottom" }}
    />
    <RootStack.Screen
      name='ChatModal'
      component={ChatScreen}
      options={{ animation: "slide_from_right" }}
    />
    <RootStack.Screen
      name='CharityProfile'
      component={CharityProfileScreen}
      options={{ animation: "fade" }}
    />
    <RootStack.Screen
      name='SettingsModal'
      component={SettingsStackScreen}
      options={{ animation: "slide_from_right" }}
    />
    <RootStack.Screen
      name='OfferScreen'
      component={OfferScreen}
      options={{ animation: "slide_from_right" }}
    />
    <RootStack.Screen
      name='ImgScreen'
      component={ImgShowScreen}
      options={{ animation: "fade" }}
    />
    <AddOfferStack.Screen
      initialParams={{ location: "" }}
      name='SelectLocation'
      component={SelectLocationScreen}
      options={{ animation: "slide_from_right" }}
    />
  </RootStack.Navigator>
);

const Navigation = () => {
  let user = useSelector((state: RootReducerType) => state.user);
  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        {user.isLogged ? <RootStackScreen /> : <AuthStackScreen />}
      </NavigationContainer>
    </>
  );
};

export default Navigation;
