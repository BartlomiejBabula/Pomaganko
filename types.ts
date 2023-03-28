import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";

export type RootNavigationParamList = {
  BottomTab: NavigatorScreenParams<TabNavigationParamList>;
  AddOfferStack: NavigatorScreenParams<AddOfferStackParamList>;
  SearchFilter: undefined;
  CharityProfile: { name: string };
  SettingsModal: NavigatorScreenParams<SettingsModalsStackParamList>;
  ChatModal: { user: string; topic: string };
  OfferScreen: undefined;
};

export type TabNavigationParamList = {
  Home: undefined;
  Settings: undefined;
  ChatModal: RootNavigationParamList["ChatModal"];
  SettingsModal: RootNavigationParamList["SettingsModal"];
  Search: undefined;
  Messages: undefined;
  AddOffer: undefined;
  SearchFilter: RootNavigationParamList["SearchFilter"];
  CharityProfile: RootNavigationParamList["CharityProfile"];
  OfferScreen: RootNavigationParamList["OfferScreen"];
};

export type AddOfferStackParamList = {
  AddOfferModal: { location: string };
  SelectLocation: { location: string };
};

export type SettingsModalsStackParamList = {
  SettingsLocations: undefined;
  SettingsTheme: undefined;
};

export type SettingsLocationsScreenParams = NativeStackScreenProps<
  SettingsModalsStackParamList,
  "SettingsLocations"
>;

export type SettingsThemeScreenParams = NativeStackScreenProps<
  SettingsModalsStackParamList,
  "SettingsTheme"
>;

export type AddOfferScreenParams = NativeStackScreenProps<
  AddOfferStackParamList,
  "AddOfferModal"
>;

export type SelectLocationScreenParams = NativeStackScreenProps<
  AddOfferStackParamList,
  "SelectLocation"
>;

export type SettingsScreenParams = NativeStackScreenProps<
  TabNavigationParamList,
  "Settings"
>;

export type SearchScreenParams = NativeStackScreenProps<
  TabNavigationParamList,
  "Search"
>;

export type MessagesScreenParams = NativeStackScreenProps<
  TabNavigationParamList,
  "Messages"
>;

export type SearchFilterScreenParams = NativeStackScreenProps<
  RootNavigationParamList,
  "SearchFilter"
>;

export type CharityProfileScreenParams = NativeStackScreenProps<
  RootNavigationParamList,
  "CharityProfile"
>;

export type ChatScreenParams = NativeStackScreenProps<
  RootNavigationParamList,
  "ChatModal"
>;

export type OfferModalParams = NativeStackScreenProps<
  RootNavigationParamList,
  "OfferScreen"
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
