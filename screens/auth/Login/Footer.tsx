import { View } from "react-native";
import { Button, Text, useTheme } from "@rneui/themed";

type FooterParams = {
  handleNaviToRegister: Function;
};

const Footer = ({ handleNaviToRegister }: FooterParams) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 15, color: theme.colors.grey3 }}>
        Nie posiadasz konta?
      </Text>
      <Button
        title='ZAREJESTRUJ'
        type='clear'
        titleStyle={{ fontSize: 15 }}
        onPress={() => {
          handleNaviToRegister();
        }}
      />
    </View>
  );
};

export default Footer;
