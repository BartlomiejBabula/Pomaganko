import { useState, useEffect } from "react";
import { Dimensions, Pressable } from "react-native";
import { useTheme } from "@rneui/themed";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

type SwitchButtonParams = {
  option1: string;
  option2: string;
  switchHeight: number;
  getValue: Function;
};

const SwitchButton = ({
  option1,
  option2,
  switchHeight,
  getValue,
}: SwitchButtonParams) => {
  const width = Dimensions.get("window").width;
  const { theme } = useTheme();
  const switchMargin = useSharedValue(0);
  const animatedColor = useSharedValue(0);
  const animatedColor2 = useSharedValue(1);
  const [value, setValue] = useState(1);

  const animatedSwitchStyle = useAnimatedStyle(() => {
    return {
      left: switchMargin.value,
    };
  });

  const animatedTextSwitchColorStyles = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        animatedColor.value,
        [0, 1],
        [theme.colors.white, theme.colors.black]
      ),
    };
  });

  const animatedTextSwitchColorStyles2 = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        animatedColor2.value,
        [0, 1],
        [theme.colors.white, theme.colors.black]
      ),
    };
  });

  const handleSwitch = () => {
    if (switchMargin.value === 0) {
      setValue(2);
      switchMargin.value = withTiming((width / 2) * 0.9);
      animatedColor.value = withTiming(1);
      animatedColor2.value = withTiming(0);
    }
    if (switchMargin.value > 0) {
      switchMargin.value = withTiming(0);
      animatedColor.value = withTiming(0);
      animatedColor2.value = withTiming(1);
      setValue(1);
    }
  };

  useEffect(() => {
    getValue(value);
  }, [value]);

  return (
    <Animated.View
      style={{
        width: "100%",
        height: switchHeight,
        backgroundColor: theme.colors.grey5,
        borderRadius: 15,
        marginBottom: 25,
        position: "relative",
      }}
    >
      <Pressable
        onPress={handleSwitch}
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: switchHeight,
        }}
      >
        <Animated.View
          style={[
            animatedSwitchStyle,
            {
              position: "absolute",
              top: 0,
              left: 0,
              width: (width / 2) * 0.9,
              height: switchHeight,
              borderRadius: 15,
              backgroundColor: theme.colors.secondary,
              justifyContent: "center",
              alignItems: "center",
              zIndex: -1,
            },
          ]}
        />
        <Animated.Text
          style={[
            {
              textAlign: "center",
              width: (width / 2) * 0.9,
              fontWeight: "bold",
              letterSpacing: 0.5,
              fontSize: 15,
            },
            animatedTextSwitchColorStyles,
          ]}
        >
          {option1}
        </Animated.Text>
        <Animated.Text
          style={[
            {
              textAlign: "center",
              width: (width / 2) * 0.9,
              fontWeight: "bold",
              letterSpacing: 0.5,
              fontSize: 15,
            },
            animatedTextSwitchColorStyles2,
          ]}
        >
          {option2}
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
};

export default SwitchButton;
