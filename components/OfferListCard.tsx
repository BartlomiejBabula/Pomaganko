import { View, Pressable } from "react-native";
import { useTheme, Text, Card, Image } from "@rneui/themed";
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
  key: number;
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
  key,
  navigation,
  uri,
  title,
  price,
  organization,
  city,
}: OfferCard) => {
  const { theme } = useTheme();
  return (
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
            source={{ uri: uri }}
            containerStyle={{
              aspectRatio: 4 / 5,
              height: 100,
            }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 16 }}>{title}</Text>
            <Text
              style={{
                fontSize: 19,
                marginTop: 2,
                fontWeight: "bold",
              }}
            >
              {numberToStringPrice(price)}
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 15,
              }}
            >
              {organization}
            </Text>
            <Text
              style={{
                color: theme.colors.grey3,
              }}
            >
              {city}
            </Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

export default OfferListCard;
