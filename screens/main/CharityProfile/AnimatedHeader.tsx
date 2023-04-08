import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, TouchableOpacity, Dimensions } from "react-native";
import { Text, Divider } from "@rneui/themed";
import Animated from "react-native-reanimated";
import { LikeButton } from "../../../components/LikeButton";

type AnimatedHeaderParams = {
  name: string;
  showHeader: boolean;
  handleGoBack: Function;
  animatedBgColorStyles: any;
  animatedIconColorStyles: any;
};

const AnimatedHeader = ({
  name,
  handleGoBack,
  showHeader,
  animatedBgColorStyles,
  animatedIconColorStyles,
}: AnimatedHeaderParams) => {
  const width = Dimensions.get("window").width;

  const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

  return (
    <View
      style={{
        position: "absolute",
        paddingTop: 35,
        left: 0,
        zIndex: 1,
        width: width,
      }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            height: 75,
            width: width,
          },
          animatedBgColorStyles,
        ]}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: width,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={{
            marginTop: 2,
          }}
          onPress={() => {
            handleGoBack();
          }}
        >
          <AnimatedIcon
            size={26}
            name='window-close'
            style={animatedIconColorStyles}
          />
        </TouchableOpacity>
        {showHeader && (
          <>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                maxWidth: width / 2,
                marginTop: 3,
              }}
            >
              {name.length > 18 ? name.substring(0, 16) + "..." : name}
            </Text>
            <LikeButton />
          </>
        )}
      </View>
      {showHeader && <Divider style={{ marginTop: 8 }} />}
    </View>
  );
};

export default AnimatedHeader;
