import { useState } from "react";
import { View, Pressable, TouchableOpacity } from "react-native";
import { useTheme, Text, Card, Image, Icon } from "@rneui/themed";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabNavigationParamList } from "../routes/types";

export const numberToStringPrice = (n: number) => {
  let string = n.toString();
  let length = string.length;
  if (length <= 3) {
    return string + " zł";
  } else {
    return string.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " zł";
  }
};

type OfferCard = {
  navigation:
    | NativeStackNavigationProp<TabNavigationParamList, "CharityProfile">
    | NativeStackNavigationProp<TabNavigationParamList, "Search">
    | NativeStackNavigationProp<TabNavigationParamList, "Home">;
  uri: string;
  title: string;
  price: number;
  organization: string;
  city: string;
};

const OfferListCard = ({
  navigation,
  uri,
  title,
  price,
  organization,
  city,
}: OfferCard) => {
  const { theme } = useTheme();
  const [favorite, setFavorite] = useState<boolean>(false);
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("OfferScreen");
      }}
    >
      <Card
        containerStyle={{
          padding: 0,
          borderRadius: 4,
          marginHorizontal: 5,
          marginVertical: 10,
          position: "relative",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setFavorite(!favorite);
          }}
        >
          <Icon
            size={25}
            name={favorite ? "heart" : "heart-outline"}
            type='material-community'
            color={favorite ? theme.colors.primary : theme.colors.grey3}
            containerStyle={{ position: "absolute", top: 10, right: 10 }}
          />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Image
            source={{ uri: uri }}
            containerStyle={{
              borderTopLeftRadius: 4,
              borderBottomLeftRadius: 4,
              aspectRatio: 4 / 5,
              height: 130,
            }}
          />
          <View style={{ marginLeft: 20, paddingVertical: 10 }}>
            <Text style={{ fontSize: 16 }}>{title}</Text>
            <Text
              style={{
                fontSize: 21,
                marginTop: 2,
                fontWeight: "bold",
              }}
            >
              {numberToStringPrice(price)}
            </Text>
            <Text
              style={{
                marginTop: 20,
                fontSize: 13,
                color: theme.colors.grey3,
              }}
            >
              {organization}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 2,
              }}
            >
              <Icon
                name='map-marker'
                type='material-community'
                size={14}
                color={theme.colors.grey3}
                style={{ marginRight: 2 }}
              />
              <Text
                style={{
                  fontSize: 13,
                  color: theme.colors.grey3,
                }}
              >
                {city}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

export default OfferListCard;
