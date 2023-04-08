import AddOfferScreen from "../screens/main/TabAddOffer/AddOfferScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddOfferStackParamList } from "./types";

export const AddOfferStack =
  createNativeStackNavigator<AddOfferStackParamList>();

export const AddOfferStackScreen = () => (
  <AddOfferStack.Navigator screenOptions={{ headerShown: false }}>
    <AddOfferStack.Screen
      initialParams={{ location: "" }}
      name='AddOfferModal'
      component={AddOfferScreen}
    />
  </AddOfferStack.Navigator>
);
