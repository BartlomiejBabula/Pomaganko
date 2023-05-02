import { SafeAreaView, View, TouchableOpacity, ScrollView } from "react-native";
import { Divider, useTheme, Icon, Text } from "@rneui/themed";
import { translate } from "../../../i18n/i18n";
import { StackActions } from "@react-navigation/native";
import { SettingsLocationsScreenParams } from "../../../routes/types";

type longuage = {
  label: string;
  locale: "pl" | "en";
};

const languageList: longuage[] = [
  { label: "polski", locale: "pl" },
  { label: "angielski", locale: "en" },
];

const SettingsLocationsScreen = ({
  navigation,
}: SettingsLocationsScreenParams) => {
  const { theme } = useTheme();
  const currentLanguage = translate.locale;

  return (
    <SafeAreaView
      style={{
        paddingVertical: 45,
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          marginBottom: 35,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon
            name='arrow-left'
            size={26}
            color={theme.colors.black}
            type='material-community'
            containerStyle={{ marginRight: 25 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: "7%" }}>
        <Text h2>Wybierz</Text>
        <Text h2>Język</Text>
        <Text
          style={{
            color: theme.colors.grey3,
            fontSize: 14,
            marginTop: 30,
            marginBottom: 10,
            marginRight: "15%",
          }}
        >
          Ustaw język, który ma być wyświetlany w aplikacji
        </Text>
      </View>
      <ScrollView
        style={{
          backgroundColor: theme.colors.white,
          minHeight: "100%",
          paddingVertical: 5,
          paddingHorizontal: "7%",
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
          marginHorizontal: "2%",
        }}
      >
        {languageList.map((language, i) => (
          <View key={i}>
            <TouchableOpacity
              onPress={() => {
                translate.locale = language.locale;
                navigation.dispatch(
                  StackActions.replace("BottomTab", { screen: "Settings" })
                );
              }}
            >
              <View
                style={{
                  paddingVertical: 15,
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  marginRight: 5,
                }}
              >
                <Text style={{ fontSize: 15 }}>{language.label}</Text>
                {language.locale === currentLanguage && (
                  <Icon
                    size={24}
                    name={"check"}
                    type='material-community'
                    color={theme.colors.success}
                  />
                )}
              </View>
            </TouchableOpacity>
            <Divider width={1} />
          </View>
        ))}
        <Text
          style={{
            color: theme.colors.grey3,
            fontSize: 12,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Więcej języków dostępnych już w krótce.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsLocationsScreen;
