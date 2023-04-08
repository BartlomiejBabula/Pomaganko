import {
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Text, Image, useTheme, Divider, Avatar } from "@rneui/themed";
import { OfferModalParams } from "../../../routes/types";
import Carousel from "react-native-reanimated-carousel";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolateColor,
} from "react-native-reanimated";
import { numberToStringPrice } from "../../../components/OfferListCard";
import AnimatedHeader from "./AnimatedHeader";
import ButtonSubmit from "../../../components/ButtonSubmit";
import Contact from "./Contact";

const OfferScreen = ({ navigation }: OfferModalParams) => {
  const { theme } = useTheme();
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const animatedOpacity = useSharedValue(0);
  const animatedColor = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((e) => {
    animatedOpacity.value = e.contentOffset.y / (height / 2.75);
    animatedColor.value = e.contentOffset.y / (height / 2.75);
  });

  const animatedOpacityStyles = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(animatedColor.value, [0, 1], ["white", "black"]),
    };
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleGoChatScren = () => {
    navigation.navigate("ChatModal", {
      user: "Jadłodalnia brata Alberta",
      topic: "Bułka",
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.white,
      }}
    >
      <AnimatedHeader
        handleGoBack={handleGoBack}
        animatedStyle={animatedStyle}
        animatedOpacityStyles={animatedOpacityStyles}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        style={{ position: "relative" }}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("ImgScreen", {
              img: [
                {
                  uri: "https://source.unsplash.com/random?sig=20",
                  aspectRatio: 4 / 5,
                },
                {
                  uri: "https://source.unsplash.com/random?sig=21",
                  aspectRatio: 6 / 4,
                },
                {
                  uri: "https://source.unsplash.com/random?sig=22",
                  aspectRatio: 4 / 5,
                },
                {
                  uri: "https://source.unsplash.com/random?sig=23",
                  aspectRatio: 5 / 4,
                },
                {
                  uri: "https://source.unsplash.com/random?sig=24",
                  aspectRatio: 4 / 5,
                },
              ],
            });
          }}
        >
          <Carousel
            loop
            width={width}
            height={height / 2.5}
            // autoPlay={true}
            data={[1, 2, 3]}
            scrollAnimationDuration={700}
            // onSnapToItem={(index) => console.log("current index:", index)}
            renderItem={({ index }) => (
              <View
                style={{
                  flex: 1,
                }}
              >
                <Image
                  source={{
                    uri: `https://source.unsplash.com/random?sig=2${index}`,
                  }}
                  containerStyle={{
                    flex: 1,
                  }}
                />
              </View>
            )}
          />
        </Pressable>
        <View
          style={{
            height: 30,
            backgroundColor: theme.colors.white,
            width: width,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            position: "absolute",
            top: height / 2.7,
          }}
        />
        <View>
          {/* Header */}
          <View style={{ paddingHorizontal: 15, marginBottom: 25 }}>
            <Text
              style={{
                fontSize: 14,
                textAlign: "right",
                color: theme.colors.grey3,
                marginTop: 5,
                marginBottom: 15,
              }}
            >
              28.03.2022
            </Text>
            <Text style={{ fontSize: 22 }}>Testowa oferta GTX 2060ti</Text>
            <Text h3 style={{ marginTop: 2 }}>
              {numberToStringPrice(85232)}
            </Text>
          </View>
          <Divider width={10} />
          {/* Description */}
          <View style={{ paddingHorizontal: 15 }}>
            <Text h4 style={{ marginBottom: 10, marginTop: 20 }}>
              Opis
            </Text>
            <Text style={{ letterSpacing: 0.2 }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum,
              molestias nostrum et nam commodi provident sed veniam numquam
              veritatis, cupiditate expedita, laborum quos beatae eaque tempora
              ducimus saepe in ad. Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Similique ratione, sequi perferendis minus
              nesciunt voluptas dolorem placeat, explicabo aperiam nam qui et
              consectetur facere ipsum ex tenetur, quam recusandae deserunt.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus accusamus voluptatum fuga voluptas nesciunt maiores
              distinctio blanditiis voluptate molestiae laborum neque, ipsa
              corrupti tempore asperiores eveniet iusto deleniti aspernatur
              nostrum.
            </Text>
          </View>
          <Contact handleGoChatScren={handleGoChatScren} />
          {/* Organization */}
          <View style={{ paddingHorizontal: 15, marginBottom: 50 }}>
            <Text h4 style={{ marginBottom: 30, marginTop: 40 }}>
              Organizacja
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CharityProfile", {
                    name: "Jadłodalnia brata Alberta",
                  });
                }}
              >
                <Avatar
                  title={"Jadłodalnia".charAt(0)}
                  containerStyle={{
                    backgroundColor: theme.colors.secondary,
                    borderRadius: 4,
                    marginRight: 20,
                  }}
                  size={"medium"}
                />
              </TouchableOpacity>
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  Jadłodalnia brata Alberta
                </Text>
                <Text style={{ fontSize: 15, color: theme.colors.grey3 }}>
                  Bielsko-Biała ul. Czerwona 112
                </Text>
              </View>
            </View>
          </View>
          <ButtonSubmit
            title='Przypisz'
            containerStyle={{ marginBottom: 20, marginHorizontal: "5%" }}
          />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default OfferScreen;
