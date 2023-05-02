import { useState } from "react";
import { SafeAreaView, View, TouchableOpacity, Pressable } from "react-native";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { Text, useTheme, Avatar, Divider, Icon, Image } from "@rneui/themed";
import { CharityProfileScreenParams } from "../../../routes/types";
import OfferListCard from "../../../components/OfferListCard";
import AnimatedHeader from "./AnimatedHeader";
import { LikeButton } from "../../../components/LikeButton";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { TestItemList } from "../../../components/TestItemList";

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>
) => void;

const CharityProfileScreen = ({
  route,
  navigation,
}: CharityProfileScreenParams) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [expandLines, setExpandLines] = useState<number>(0);
  const [animatedAvatarSize, setAnimatedAvatarSize] = useState<number>(60);
  const [animatedAvatarMargin, setAnimatedAvatarMargin] = useState<number>(0);
  const animatedInfoHeight = useSharedValue(150);
  const animatedColor = useSharedValue(0);
  const { name } = route.params;
  const { theme } = useTheme();
  const [showHeader, setShowHeader] = useState<boolean>(false);

  const animatedIconColorStyles = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        animatedColor.value,
        [0, 1],
        [theme.colors.white, theme.colors.black]
      ),
    };
  });

  const animatedBgColorStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animatedColor.value,
        [0, 1],
        ["transparent", theme.colors.white]
      ),
    };
  });

  const animatedInfoHeightStyles = useAnimatedStyle(() => {
    return {
      maxHeight: animatedInfoHeight.value,
    };
  });

  const toggleExpand = () => {
    setExpand(!expand);
    if (animatedInfoHeight.value === 150) {
      let height = expandLines * 16.5;
      animatedInfoHeight.value = withTiming(height);
    } else {
      animatedInfoHeight.value = withTiming(150);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleScrollActions: OnScrollEventHandler = (e) => {
    if (e.nativeEvent.contentOffset.y >= 120) {
      animatedColor.value = e.nativeEvent.contentOffset.y / 120;
      if (!showHeader) {
        setShowHeader(true);
      }
    }
    if (e.nativeEvent.contentOffset.y <= 120) {
      animatedColor.value = e.nativeEvent.contentOffset.y / 120;
      if (showHeader) {
        setShowHeader(false);
      }
    }
    if (
      e.nativeEvent.contentOffset.y <= 120 ||
      e.nativeEvent.contentOffset.y >= 120
    ) {
      setAnimatedAvatarMargin(e.nativeEvent.contentOffset.y / 10);
      setAnimatedAvatarSize(60 - e.nativeEvent.contentOffset.y / 10);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: "relative",
        backgroundColor: theme.colors.white,
      }}
    >
      <AnimatedHeader
        name={name}
        handleGoBack={handleGoBack}
        showHeader={showHeader}
        animatedIconColorStyles={animatedIconColorStyles}
        animatedBgColorStyles={animatedBgColorStyles}
      />
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={handleScrollActions}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("ImgScreen", {
              img: [
                {
                  uri: "https://source.unsplash.com/random?sig=3",
                  aspectRatio: 5 / 2,
                },
              ],
            });
          }}
          style={{ height: 145, backgroundColor: theme.colors.secondary }}
        >
          <Image
            source={{ uri: "https://source.unsplash.com/random?sig=3" }}
            containerStyle={{
              aspectRatio: 5 / 2,
            }}
          />
        </Pressable>
        <View
          style={{
            position: "absolute",
            top: 135,
            left: 22,
            marginTop: animatedAvatarMargin,
          }}
        >
          <Avatar
            title={name.charAt(0)}
            rounded
            containerStyle={{
              backgroundColor: theme.colors.secondary,
              borderWidth: 2,
              borderColor: theme.colors.white,
              minHeight: 35,
              minWidth: 35,
              maxHeight: 60,
              maxWidth: 60,
            }}
            size={animatedAvatarSize}
          />
        </View>
        <View
          style={{
            position: "absolute",
            top: 160,
            right: 20,
          }}
        >
          <LikeButton />
        </View>
        <View
          style={{
            marginHorizontal: 25,
          }}
        >
          <Text h4 style={{ marginTop: 70 }}>
            {name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 7,
              alignItems: "center",
            }}
          >
            <Icon
              name='map-marker'
              size={16}
              color={theme.colors.grey3}
              type='material-community'
            />
            <Text
              style={{
                marginLeft: 5,
                color: theme.colors.grey3,
              }}
            >
              Bielsko-Biała, ul.Czerwona 112
            </Text>
          </View>
          <Animated.View
            style={[
              { marginTop: 10, minHeight: 150 },
              animatedInfoHeightStyles,
            ]}
          >
            <Text
              onTextLayout={(e) => {
                setExpandLines(e.nativeEvent.lines.length);
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In
              debitis sint obcaecati, ullam molestias minus atque, sit explicabo
              fugit dignissimos libero numquam animi porro consectetur, culpa
              necessitatibus nostrum! Excepturi, velit. rerum aperiam temporibus
              libero culpa vel quae, neque illo atque tenetur. Quis, dolores.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut
              neque voluptate quam, doloribus numquam perspiciatis? Voluptates
              accusamus rerum aperiam temporibus libero culpa vel quae, neque
              illo atque tenetur. Quis, dolores. Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Neque dolore at sequi facilis,
              fugiat, vel aliquid voluptatem natus voluptatibus quisquam
              excepturi nostrum! Temporibus fuga, accusamus quasi a voluptas
              iure nulla?
            </Text>
          </Animated.View>
          {expandLines > 7 && (
            <TouchableOpacity
              onPress={toggleExpand}
              style={{
                height: 25,
              }}
            >
              <Icon
                size={30}
                name={expand ? "chevron-up" : "chevron-down"}
                color={theme.colors.black}
                type='material-community'
              />
            </TouchableOpacity>
          )}
        </View>
        <Divider />
        <View
          style={{
            backgroundColor: theme.colors.grey4,
          }}
        >
          {TestItemList?.map((offer, i) => (
            <View key={i}>
              <OfferListCard
                navigation={navigation}
                uri={offer.image}
                title={offer.title}
                city={offer.city}
                organization={name}
                price={offer.price}
              />
            </View>
          ))}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default CharityProfileScreen;
