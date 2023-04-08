import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/main/TabHome/HomeScreen";
import SettingsScreen from "../screens/main/TabSettings/SettingsScreen";
import SearchScreen from "../screens/main/TabSearch/SearchScreen";
import MessagesScreen from "../screens/main/TabMessages/MessagesScreen";
import { Icon, useTheme } from "@rneui/themed";
import { TabNavigationParamList } from "./types";
import { RootReducerType } from "../reducers/types";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator<TabNavigationParamList>();

export const TabStackScreen = () => {
  const { theme } = useTheme();
  let user = useSelector((state: RootReducerType) => state.user);

  const AddOfferModal = () => null;

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
