import { useState } from "react";
import * as Linking from "expo-linking";
import { TouchableOpacity, View } from "react-native";
import { Text, useTheme, Button, Icon } from "@rneui/themed";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

type ContactParams = {
  handleGoChatScren: Function;
};

const Contact = ({ handleGoChatScren }: ContactParams) => {
  const [contactExpand, setContactExpand] = useState<boolean>(false);
  const { theme } = useTheme();
  const animatedContactHeight = useSharedValue(70);

  const toggleContactExpand = () => {
    setContactExpand(!contactExpand);
    if (animatedContactHeight.value === 200) {
      animatedContactHeight.value = withTiming(70);
    } else {
      animatedContactHeight.value = withTiming(200);
    }
  };
  const animatedContactHeightStyles = useAnimatedStyle(() => {
    return {
      height: animatedContactHeight.value,
    };
  });
  return (
    <Animated.View
      style={[
        { overflow: "hidden", paddingHorizontal: 15 },
        animatedContactHeightStyles,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          marginTop: 40,
        }}
      >
        <Text h4 style={{ marginRight: 5 }}>
          Kontakt
        </Text>
        <TouchableOpacity onPress={toggleContactExpand}>
          <Icon
            size={30}
            name={contactExpand ? "chevron-up" : "chevron-down"}
            color={theme.colors.black}
            type='material-community'
          />
        </TouchableOpacity>
      </View>
      <Button
        onPress={() => {
          Linking.openURL("tel://533131191");
        }}
        raised={false}
        title={"533 131 191"}
        uppercase={true}
        type='outline'
        color={theme.colors.secondary}
        icon={
          <Icon
            name='cellphone'
            size={20}
            color={theme.colors.primary}
            type='material-community'
            containerStyle={{ marginRight: 10 }}
          />
        }
        buttonStyle={{
          height: 50,
          marginTop: 20,
          borderWidth: 2,
          borderRadius: 6,
        }}
        titleStyle={{
          fontSize: 18,
        }}
      />
      <Button
        raised={false}
        title={"napisz wiadomość"}
        uppercase={true}
        color={theme.colors.primary}
        icon={
          <Icon
            name='email-outline'
            size={20}
            color={theme.colors.white}
            type='material-community'
            containerStyle={{ marginRight: 7 }}
          />
        }
        buttonStyle={{
          height: 50,
          marginTop: 10,
          borderWidth: 2,
          borderRadius: 6,
        }}
        onPress={() => {
          handleGoChatScren();
        }}
      />
    </Animated.View>
  );
};

export default Contact;
