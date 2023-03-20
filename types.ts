import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootNavigationParamList = {
  BottomTab: TabNavigationParamList;
  AddOfferStack: AddOfferStackParamList;
};

export type TabNavigationParamList = {
  Home: undefined;
  Profile: undefined;
  Search: undefined;
  Messages: undefined;
  AddOffer: undefined;
};

export type AddOfferStackParamList = {
  AddOfferModal: { location: string };
  SelectLocation: { location: string };
};

export type AddOfferScreenParams = NativeStackScreenProps<
  AddOfferStackParamList,
  "AddOfferModal"
>;

export type SelectLocationScreenParams = NativeStackScreenProps<
  AddOfferStackParamList,
  "SelectLocation"
>;

export type ProfileScreenParams = NativeStackScreenProps<
  TabNavigationParamList,
  "Profile"
>;

export type SearchScreenParams = NativeStackScreenProps<
  TabNavigationParamList,
  "Search"
>;

export type UserType = {
  email?: string;
  name?: string;
  phone?: string;
  isLogged: boolean;
};

export type RootReducerType = {
  user: UserType;
};
