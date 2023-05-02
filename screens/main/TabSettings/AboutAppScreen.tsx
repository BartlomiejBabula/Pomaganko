import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { Text, Icon, useTheme } from "@rneui/themed";
import { AboutAppScreenParams } from "../../../routes/types";

const AboutAppScreen = ({ navigation }: AboutAppScreenParams) => {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 45 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          marginBottom: "50%",
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
        <Text h3>O Aplikacji</Text>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon
          name='charity'
          size={150}
          color={theme.colors.primary}
          type='material-community'
          style={{ marginBottom: 20 }}
        />
        <Text h2 style={{ letterSpacing: 1 }}>
          Pomaganko
        </Text>
        <Text
          style={{
            marginTop: 10,
            color: theme.colors.grey3,
            fontSize: 22,
            fontWeight: "bold",
            letterSpacing: 0.5,
          }}
        >
          Wersja v0.5
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AboutAppScreen;
