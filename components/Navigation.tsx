import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LogBox } from "react-native";
import HomeScreen from "../screens/tabNavigation/HomeScreen";
import SettingsScreen from "../screens/tabNavigation/SettingsScreen";
import SearchScreen from "../screens/tabNavigation/SearchNavigation/SearchScreen";
import MessagesScreen from "../screens/tabNavigation/MessagesScreen";
import SelectLocationScreen from "../screens/tabNavigation/AddOfferNavigation/SelectLocationScreen";
import SearchFilterScreen from "../screens/tabNavigation/SearchNavigation/SearchFilterScreen";
import CharityProfileScreen from "../screens/CharityProfileScreen";
import { Icon, useTheme } from "@rneui/themed";
import AddOfferScreen from "../screens/tabNavigation/AddOfferNavigation/AddOfferScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  TabNavigationParamList,
  RootNavigationParamList,
  AddOfferStackParamList,
  SettingsModalsStackParamList,
} from "../types";
import SettingsLocationsScreen from "../screens/tabNavigation/SettingsNavigation/SettingsLocationsScreen";
import SettingsThemeScreen from "../screens/tabNavigation/SettingsNavigation/SettingsThemeScreen";
import ChatScreen from "./../screens/ChatScreen";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import OfferScreen from "./../screens/OfferScreen";

LogBox.ignoreAllLogs();
const Tab = createBottomTabNavigator<TabNavigationParamList>();
const RootStack = createNativeStackNavigator<RootNavigationParamList>();
const AddOfferStack = createNativeStackNavigator<AddOfferStackParamList>();
const SettingsStack =
  createNativeStackNavigator<SettingsModalsStackParamList>();
NavigationBar.setBackgroundColorAsync("white");

const AddOfferModal = () => null;

const TabStackScreen = () => {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName='Home'
      backBehavior='history'
      screenOptions={({ route }) => ({
        tabBarBadgeStyle: {
          marginTop: 22,
          fontSize: 12,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => {
          size = 27;
          let iconName: string;
          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Search":
              iconName = focused ? "search" : "search-outline";
              break;
            case "AddOffer":
              iconName = "heart-half-outline";
              size = 36;
              break;
            case "Messages":
              iconName = focused ? "mail" : "mail-outline";
              break;
            case "Settings":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              iconName = "";
          }
          return (
            <Icon name={iconName} size={size} color={color} type={"ionicon"} />
          );
        },
        tabBarActiveTintColor: theme.colors.black,
        tabBarInactiveTintColor: theme.colors.black,
        tabBarStyle: { height: 55 },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Search' component={SearchScreen} />
      <Tab.Screen
        name='AddOffer'
        component={AddOfferModal}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("AddOfferStack");
          },
        })}
      />
      <Tab.Screen
        name='Messages'
        component={MessagesScreen}
        options={{ tabBarBadge: 4 }}
      />
      <Tab.Screen name='Settings' component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const AddOfferStackScreen = () => (
  <AddOfferStack.Navigator screenOptions={{ headerShown: false }}>
    <AddOfferStack.Screen
      initialParams={{ location: "" }}
      name='AddOfferModal'
      component={AddOfferScreen}
    />
    <AddOfferStack.Screen
      initialParams={{ location: "" }}
      name='SelectLocation'
      component={SelectLocationScreen}
      options={{ animation: "slide_from_right" }}
    />
  </AddOfferStack.Navigator>
);

const SettingsStackScreen = () => (
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
  </RootStack.Navigator>
);

const Navigation = () => {
  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </>
  );
};

export default Navigation;
