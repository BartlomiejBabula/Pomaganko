import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
  Text,
  useTheme,
  Avatar,
  Divider,
  Icon,
  Card,
  Image,
  Button,
} from "@rneui/themed";
import { CharityProfileScreenParams } from "../types";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const TestItemList = [
  {
    title: "Wycieczka klasowa",
    city: "Bielsko-Biała",
    image: "https://source.unsplash.com/random?sig=10",
    price: 1000,
  },
  {
    title: "Plecak 32L",
    city: "Wrocław",
    image: "https://source.unsplash.com/random?sig=13",
    price: 100,
  },
  {
    title: "Rachunek za prąd",
    city: "Kielce",
    image: "https://source.unsplash.com/random?sig=15",
    price: 12899,
  },
  {
    title: "Węgiel",
    city: "Kędzierzyn Koźle",
    image: "https://source.unsplash.com/random?sig=18",
    price: 12663,
  },
  {
    title: "Źielona szkoła",
    city: "Bielsko-Biała",
    image: "https://source.unsplash.com/random?sig=12",
    price: 190213,
  },
];

const numberToStringPrice = (n: number) => {
  let string = n.toString();
  let length = string.length;
  if (length <= 3) {
    return string + " zł";
  } else {
    return string.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " zł";
  }
};

const CharityProfileScreen = ({
  route,
  navigation,
}: CharityProfileScreenParams) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [expandLines, setExpandLines] = useState<number>(0);
  const [headerAnimated, setHeaderAnimated] = useState<boolean>(true);
  const [animatedAvatarSize, setAnimatedAvatarSize] = useState<number>(75);
  const [animatedAvatarMargin, setAnimatedAvatarMargin] = useState<number>(0);
  const [animatedOpacitiHeader, setAnimatedOpacitiHeader] = useState<number>(0);
  const animatedInfoHeight = useSharedValue(150);
  const { name } = route.params;
  const { theme } = useTheme();

  const toggleExpand = () => {
    setExpand(!expand);
    if (animatedInfoHeight.value === 150) {
      let height = expandLines * 16.5;
      animatedInfoHeight.value = withTiming(height);
    } else {
      animatedInfoHeight.value = withTiming(150);
    }
  };

  const animatedInfoHeightStyles = useAnimatedStyle(() => {
    return {
      maxHeight: animatedInfoHeight.value,
    };
  });

  const LikeButton = () => (
    <Button
      onPress={() => {
        setFavorite(!favorite);
      }}
      title='Obserwuj'
      raised={false}
      radius={25}
      buttonStyle={{
        borderWidth: 1,
        paddingVertical: 4,
        paddingHorizontal: 7,
        backgroundColor: favorite ? theme.colors.success : theme.colors.white,
      }}
      titleStyle={{
        fontSize: 14,
        marginRight: 5,
        color: favorite ? theme.colors.white : theme.colors.success,
      }}
      type='outline'
      iconRight={true}
      icon={
        <Icon
          name={favorite ? "heart" : "heart-outline"}
          size={20}
          color={favorite ? theme.colors.white : theme.colors.success}
          type='material-community'
        />
      }
    />
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: "relative",
        backgroundColor: theme.colors.white,
      }}
    >
      <View
        style={{
          position: "absolute",
          paddingTop: 35,
          left: 0,
          zIndex: 1,
          width: "100%",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: theme.colors.white,
            opacity: animatedOpacitiHeader,
            height: 75,
            width: "100%",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            style={{
              marginTop: 2,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon
              name='window-close'
              containerStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                paddingHorizontal: 1,
              }}
              size={26}
              color={theme.colors.black}
              type='material-community'
            />
          </TouchableOpacity>
          {animatedOpacitiHeader >= 1 && (
            <>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 17,
                  maxWidth: "50%",
                  marginTop: 3,
                }}
              >
                {route.params.name.length > 18
                  ? route.params.name.substring(0, 16) + "..."
                  : route.params.name}
              </Text>
              <LikeButton />
            </>
          )}
        </View>
        {animatedOpacitiHeader >= 1 && <Divider style={{ marginTop: 8 }} />}
      </View>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={(e) => {
          let scrollValue = e.nativeEvent.contentOffset.y;
          if (
            (e.nativeEvent.velocity !== undefined &&
              e.nativeEvent.velocity?.y > 4) ||
            (e.nativeEvent.velocity !== undefined &&
              e.nativeEvent.velocity?.y < -4)
          ) {
            setHeaderAnimated(false);
            setAnimatedAvatarSize(75);
            setAnimatedAvatarMargin(0);
            if (scrollValue < 100) {
              setAnimatedOpacitiHeader(0);
            }
          } else if (scrollValue < 150 && headerAnimated) {
            if (scrollValue / 4 < 0) {
              setAnimatedAvatarMargin(0);
            } else {
              setAnimatedAvatarMargin(scrollValue / 4.2);
            }
            if (scrollValue / 5 > 75) {
              setAnimatedAvatarSize(75);
            } else {
              setAnimatedAvatarSize(75 - scrollValue / 5);
            }
            setAnimatedOpacitiHeader(scrollValue / 130);
          }
          if (animatedOpacitiHeader >= 0 && animatedOpacitiHeader <= 1) {
            setAnimatedOpacitiHeader(scrollValue / 130);
          }
          if (
            (scrollValue > 150 && scrollValue < 180 && !headerAnimated) ||
            scrollValue === 0
          ) {
            setHeaderAnimated(true);
          }
        }}
      >
        <View
          style={{ height: 150, backgroundColor: theme.colors.secondary }}
        ></View>
        <Divider />
        <View
          style={{
            position: "absolute",
            top: 125,
            left: 22,
            marginTop: animatedAvatarMargin,
          }}
        >
          <Avatar
            title={name.charAt(0)}
            containerStyle={{
              backgroundColor: theme.colors.secondary,
              borderRadius: 4,
              borderWidth: 3,
              borderColor: theme.colors.white,
              minHeight: 40,
              minWidth: 40,
              maxHeight: 75,
              maxWidth: 75,
            }}
            size={animatedAvatarSize}
          />
        </View>
        <View
          style={{
            position: "absolute",
            top: 170,
            right: 20,
          }}
        >
          <LikeButton />
        </View>
        <View style={{ marginHorizontal: 25 }}>
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
        <View style={{ backgroundColor: theme.colors.grey4 }}>
          {TestItemList?.map((offer, key) => (
            <Pressable
              key={key}
              onPress={() => {
                navigation.navigate("OfferScreen");
              }}
            >
              <Card
                containerStyle={{
                  marginHorizontal: 0,
                  marginVertical: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Image
                    source={{ uri: offer.image }}
                    containerStyle={{
                      aspectRatio: 4 / 5,
                      height: 100,
                    }}
                  />
                  <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontSize: 16 }}>{offer.title}</Text>
                    <Text
                      style={{
                        fontSize: 19,
                        marginTop: 2,
                        fontWeight: "bold",
                      }}
                    >
                      {numberToStringPrice(offer.price)}
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 15,
                      }}
                    >
                      {name}
                    </Text>
                    <Text
                      style={{
                        color: theme.colors.grey3,
                      }}
                    >
                      {offer.city}
                    </Text>
                  </View>
                </View>
              </Card>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CharityProfileScreen;
