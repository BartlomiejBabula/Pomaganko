import { useState } from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";
import { useTheme } from "@rneui/themed";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Animated from "react-native-reanimated";

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

type AnimatedHeader = {
  handleGoBack: Function;
  animatedStyle: any;
  animatedOpacityStyles: any;
};

const AnimatedHeader = ({
  animatedOpacityStyles,
  animatedStyle,
  handleGoBack,
}: AnimatedHeader) => {
  const [favorite, setFavorite] = useState<boolean>(false);
  const width = Dimensions.get("window").width;
  const { theme } = useTheme();
  return (
    <>
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            height: 75,
            width: "100%",
            zIndex: 1,
            backgroundColor: theme.colors.white,
          },
          animatedOpacityStyles,
        ]}
      />
      <View
        style={{
          position: "absolute",
          top: 35,
          width: width,
          paddingHorizontal: 15,
          zIndex: 3,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            handleGoBack();
          }}
        >
          <AnimatedIcon size={26} name='arrow-left' style={animatedStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setFavorite(!favorite);
          }}
        >
          <AnimatedIcon
            size={30}
            name={favorite ? "heart" : "heart-outline"}
            style={[animatedStyle]}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AnimatedHeader;
