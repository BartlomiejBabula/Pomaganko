import { useState, useEffect } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useTheme, Image } from "@rneui/themed";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Layout,
} from "react-native-reanimated";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

const Header = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { theme } = useTheme();
  const iconHeight = useSharedValue(140);
  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      fontSize: iconHeight.value,
      paddingTop: 55,
    };
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  if (isKeyboardVisible) iconHeight.value = withTiming(75, { duration: 150 });
  else iconHeight.value = withTiming(140, { duration: 150 });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View
        layout={Layout.duration(150)}
        style={{
          flex: 1,
          alignItems: "center",
          position: "relative",
        }}
      >
        <Image
          source={{
            uri: `https://source.unsplash.com/1080x900/?charity-people`,
          }}
          containerStyle={{
            top: 0,
            left: 0,
            height: 340,
            width: "100%",
            position: "absolute",
            zIndex: 0,
            opacity: 0.85,
          }}
        />
        <AnimatedIcon
          name='charity'
          color={theme.colors.white}
          style={animatedIconStyle}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Header;
