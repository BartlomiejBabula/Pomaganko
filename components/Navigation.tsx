import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LogBox } from "react-native";
import HomeScreen from "../screens/tabNavigation/HomeScreen";
import ProfileScreen from "../screens/tabNavigation/ProfileScreen";
import SearchScreen from "./../screens/tabNavigation/SearchScreen";
import MessagesScreen from "../screens/tabNavigation/MessagesScreen";
import SelectLocationScreen from "../screens/tabNavigation/AddOfferNavigation/SelectLocationScreen";
import { Icon, useTheme } from "@rneui/themed";
import AddOfferScreen from "../screens/tabNavigation/AddOfferNavigation/AddOfferScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  TabNavigationParamList,
  RootNavigationParamList,
  AddOfferStackParamList,
} from "../types";

LogBox.ignoreAllLogs();
const Tab = createBottomTabNavigator<TabNavigationParamList>();
const RootStack = createNativeStackNavigator<RootNavigationParamList>();
const AddOfferStack = createNativeStackNavigator<AddOfferStackParamList>();
const AddOfferModal = () => null;

const TabStackScreen = () => {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName='Home'
      backBehavior='history'
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;
          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Search":
              iconName = "magnify";
              break;
            case "AddOffer":
              iconName = "heart-plus";
              break;
            case "Messages":
              iconName = focused ? "message" : "message-outline";
              break;
            case "Profile":
              iconName = focused ? "account" : "account-outline";
              break;
            default:
              iconName = "";
          }
          return (
            <Icon
              name={iconName}
              size={32}
              color={color}
              type={"material-community"}
            />
          );
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.grey3,
        tabBarShowLabel: false,
        tabBarStyle: { height: 55 },
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
      <Tab.Screen name='Messages' component={MessagesScreen} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
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

const RootStackScreen = () => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen name='BottomTab' component={TabStackScreen} />
    <RootStack.Screen
      name='AddOfferStack'
      component={AddOfferStackScreen}
      options={{ animation: "slide_from_bottom" }}
    />
  </RootStack.Navigator>
);

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default Navigation;
