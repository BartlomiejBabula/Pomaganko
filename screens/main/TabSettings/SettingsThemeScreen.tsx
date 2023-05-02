import { SafeAreaView, View, TouchableOpacity, Appearance } from "react-native";
import { Divider, useTheme, Icon, Text, useThemeMode } from "@rneui/themed";
import { translate } from "../../../i18n/i18n";
import { SettingsThemeScreenParams } from "../../../routes/types";
import { setTheme } from "../../../components/Theme";

type ThemeType = {
  label: string;
  mode: "light" | "dark" | "auto";
};

const themeList: ThemeType[] = [
  {
    label: "jasny",
    mode: "light",
  },
  {
    label: "ciemny",
    mode: "dark",
  },
];

const SettingsThemeScreen = ({ navigation }: SettingsThemeScreenParams) => {
  const { theme } = useTheme();
  const { mode, setMode } = useThemeMode();
  const colorScheme = Appearance.getColorScheme();

  const handleChangeTheme = async (mode: ThemeType["mode"]) => {
    switch (mode) {
      case "light":
        await setTheme(setMode, "light");
        break;
      case "dark":
        await setTheme(setMode, "dark");
        break;
      default:
        break;
    }
  };

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
        <Text h2>Motyw</Text>
        <Text
          style={{
            color: theme.colors.grey3,
            fontSize: 14,
            marginTop: 30,
            marginBottom: 10,
            marginRight: "15%",
          }}
        >
          Ustaw motyw, który ma być wyświetlany w aplikacji
        </Text>
      </View>
      <View
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
        {themeList.map((currentTheme, i) => (
          <View key={i}>
            <TouchableOpacity
              onPress={() => {
                handleChangeTheme(currentTheme.mode);
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
                <Text style={{ fontSize: 15 }}>{currentTheme.label}</Text>
                {currentTheme.mode === mode && (
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
      </View>
    </SafeAreaView>
  );
};

export default SettingsThemeScreen;
