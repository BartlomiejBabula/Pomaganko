import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";

type ImgParam = {
  uri: string;
  aspectRatio: number;
};

export type RootNavigationParamList = {
  BottomTab: NavigatorScreenParams<TabNavigationParamList>;
  AddOfferStack: NavigatorScreenParams<AddOfferStackParamList>;
  SearchFilter: undefined;
  CharityProfile: { name: string };
  SettingsModal: NavigatorScreenParams<SettingsModalsStackParamList>;
  ChatModal: { user: string; topic: string };
  OfferScreen: undefined;
  ImgScreen: { img: ImgParam[] };
};

export type TabNavigationParamList = {
  Home: undefined;
  Settings: undefined;
  ChatModal: RootNavigationParamList["ChatModal"];
  SettingsModal: RootNavigationParamList["SettingsModal"];
  ImgScreen: RootNavigationParamList["ImgScreen"];
  Search: undefined;
  Messages: undefined;
  AddOffer: undefined;
  SearchFilter: RootNavigationParamList["SearchFilter"];
  CharityProfile: RootNavigationParamList["CharityProfile"];
  OfferScreen: RootNavigationParamList["OfferScreen"];
};

export type AddOfferStackParamList = {
  AddOfferModal: { location: string };
  SelectLocation: {
    location: string;
    backLocation: "AddOfferModal" | "FirstLogin";
  };
};

export type SelectLocationParamList = {
  AddOfferModal: AddOfferStackParamList["AddOfferModal"];
  FirstLogin: LoginStackParamList["FirstLogin"];
  SelectLocation: AddOfferStackParamList["SelectLocation"];
};

export type SettingsModalsStackParamList = {
  SettingsLocations: undefined;
  SettingsTheme: undefined;
};

export type LoginStackParamList = {
  Login: undefined;
  Register: undefined;
  FirstLogin: { location: string };
  ResetPassword: undefined;
  SelectLocation: AddOfferStackParamList["SelectLocation"];
  Verification: undefined;
  ChangePassword: undefined;
};

export type LoginScreenParams = NativeStackScreenProps<
  LoginStackParamList,
  "Login"
>;

export type RegisterScreenParams = NativeStackScreenProps<
  LoginStackParamList,
  "Register"
>;

export type ResetPasswordParams = NativeStackScreenProps<
  LoginStackParamList,
  "ResetPassword"
>;

export type ChangePasswordParams = NativeStackScreenProps<
  LoginStackParamList,
  "ChangePassword"
>;

export type VerificationResetPasswordParams = NativeStackScreenProps<
  LoginStackParamList,
  "Verification"
>;

export type FirstLoginScreenParams = NativeStackScreenProps<
  LoginStackParamList,
  "FirstLogin"
>;

export type SettingsLocationsScreenParams = NativeStackScreenProps<
  SettingsModalsStackParamList,
  "SettingsLocations"
>;

export type HomeScreenParams = NativeStackScreenProps<
  TabNavigationParamList,
  "Home"
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
  SelectLocationParamList,
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
  TabNavigationParamList,
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
export type ImgScreenParams = NativeStackScreenProps<
  RootNavigationParamList,
  "ImgScreen"
>;
