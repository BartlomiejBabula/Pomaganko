import { useState } from "react";
import { View, SafeAreaView, Dimensions, ScrollView } from "react-native";
import { Text, Image, useTheme } from "@rneui/themed";
import { OfferModalParams } from "../types";
import Carousel from "react-native-reanimated-carousel";

const todoList = [
  { id: "1", text: "Learn JavaScript" },
  { id: "2", text: "Learn React" },
  { id: "3", text: "Learn TypeScript" },
];

//IN PROGRESS

const OfferScreen = ({ navigation }: OfferModalParams) => {
  const { theme } = useTheme();
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 30,
        backgroundColor: theme.colors.white,
      }}
    >
      <ScrollView style={{ position: "relative" }}>
        <Carousel
          loop
          width={width}
          height={height / 2.5}
          // autoPlay={true}
          data={todoList}
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
        <View style={{ height: 1000 }}>
          <Text>Test</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OfferScreen;
