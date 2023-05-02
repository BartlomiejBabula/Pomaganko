import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";
import * as Linking from "expo-linking";
import { Text, Avatar, useTheme, Divider, Card, Icon } from "@rneui/themed";
import { SettingsScreenParams } from "../../../routes/types";
import { useDispatch } from "react-redux";
import { logOutAction } from "../../../actions/UserAction";
import { RootReducerType } from "../../../reducers/types";
import { useSelector } from "react-redux";

type settingsType = {
  label: string;
  description: string;
  navigation:
    | "SettingsLocations"
    | "SettingsTheme"
    | "SettingsChangePassword"
    | "SettingsLocalization"
    | "SettingsProfile";
};

type appInfoType = {
  label: string;
  url: string;
};

const accountSettings: settingsType[] = [
  {
    label: "Profil",
    description: "Informacje o tobie",
    navigation: "SettingsProfile",
  },
  {
    label: "Lokalizacja",
    description: "Ustwienia twojej lokalizacji",
    navigation: "SettingsLocalization",
  },
  {
    label: "Hasło",
    description: "Zmień swoje hasło",
    navigation: "SettingsChangePassword",
  },
];

const appSettings: settingsType[] = [
  {
    label: "Język",
    description: "Ustawienia języka aplikacji",
    navigation: "SettingsLocations",
  },
  {
    label: "Motyw",
    description: "Ustaw motyw jasny lub ciemny",
    navigation: "SettingsTheme",
  },
];

const appInfo: appInfoType[] = [
  {
    label: "Regulamin",
    url: "https://www.freeprivacypolicy.com/live/fe0357b6-4fe7-4f4b-a3e7-c8d24dba969a",
  },
  {
    label: "Polityka prywatności",
    url: "https://www.freeprivacypolicy.com/live/fe0357b6-4fe7-4f4b-a3e7-c8d24dba969a",
  },
  {
    label: "Oceń aplikacje",
    url: "https://play.google.com/store/apps/details?id=com.tongueTwist&gl=PL",
  },
  { label: "O aplikacji", url: "AboutApp" },
];

const SettingsScreen = ({ navigation }: SettingsScreenParams) => {
  const dispatch = useDispatch();
  let user = useSelector((state: RootReducerType) => state.user);
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: 30, backgroundColor: theme.colors.white }} />
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            paddingTop: 35,
            paddingHorizontal: "5%",
            paddingBottom: 10,
            backgroundColor: theme.colors.white,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text h3>Ustawienia</Text>
            <Text
              style={{ fontSize: 13, color: theme.colors.grey3, marginLeft: 2 }}
            >
              {user.email}
            </Text>
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate("SettingsModal", {
                screen: "SettingsProfile",
              });
            }}
          >
            <Avatar
              title={"B"}
              size={"medium"}
              rounded
              containerStyle={{ backgroundColor: theme.colors.secondary }}
            />
          </Pressable>
        </View>
        <Card containerStyle={styles.cardStyle}>
          <Text h4 style={styles.cardTitle}>
            Ustawienia konta
          </Text>
          {accountSettings.map((param, i) => (
            <View key={i}>
              <Divider />
              <View
                style={{
                  paddingVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={{ fontSize: 15 }}>{param.label}</Text>
                  <Text
                    style={{
                      color: theme.colors.grey3,
                      marginTop: 2,
                      fontSize: 12,
                    }}
                  >
                    {param.description}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("SettingsModal", {
                      screen: param.navigation,
                    });
                  }}
                >
                  <Icon
                    size={32}
                    name={"chevron-right"}
                    type='material-community'
                    color={theme.colors.black}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Card>
        <Card containerStyle={styles.cardStyle}>
          <Text h4 style={styles.cardTitle}>
            Ustawienia aplikacji
          </Text>
          {appSettings.map((param, i) => (
            <View key={i}>
              <Divider />
              <View
                style={{
                  paddingVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={{ fontSize: 15 }}>{param.label}</Text>
                  <Text
                    style={{
                      color: theme.colors.grey3,
                      marginTop: 2,
                      fontSize: 12,
                    }}
                  >
                    {param.description}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("SettingsModal", {
                      screen: param.navigation,
                    });
                  }}
                >
                  <Icon
                    size={32}
                    name={"chevron-right"}
                    type='material-community'
                    color={theme.colors.black}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Card>
        <Card containerStyle={styles.cardStyle}>
          <Text h4 style={styles.cardTitle}>
            Informacje o aplikacji
          </Text>
          {appInfo.map((param, i) => (
            <View key={i}>
              <Divider />
              <TouchableOpacity
                onPress={() => {
                  if (param.url === "AboutApp") {
                    navigation.navigate("SettingsModal", {
                      screen: param.url,
                    });
                  } else {
                    Linking.openURL(param.url);
                  }
                }}
              >
                <View
                  style={{
                    paddingVertical: 15,
                  }}
                >
                  <Text style={{ fontSize: 15 }}>{param.label}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </Card>
        <Card
          containerStyle={[
            styles.cardStyle,
            { marginBottom: 15, paddingVertical: 15 },
          ]}
        >
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() => {
              dispatch(logOutAction());
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Wyloguj
            </Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  cardStyle: {
    marginHorizontal: 0,
    paddingHorizontal: "5%",
    paddingVertical: 10,
  },
  cardTitle: { paddingTop: 5, marginBottom: 20 },
});
