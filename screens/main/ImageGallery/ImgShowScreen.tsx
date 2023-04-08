import { Image, Icon, Button, useTheme } from "@rneui/themed";
import { View, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
import * as Linking from "expo-linking";
import { ImgScreenParams } from "../../../routes/types";
import Carousel from "react-native-reanimated-carousel";

const ImgShowScreen = ({ navigation, route }: ImgScreenParams) => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const { img } = route.params;
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
      <TouchableOpacity
        style={{ position: "absolute", left: 20, top: 40 }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name='window-close' size={24} type='material-community' />
      </TouchableOpacity>
      {img.length > 1 ? (
        <View style={{ marginTop: 25, flex: 1, justifyContent: "center" }}>
          <Carousel
            loop
            width={width}
            height={height / 1.5}
            data={img}
            scrollAnimationDuration={700}
            renderItem={({ index }) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{
                    uri: img[index].uri,
                  }}
                  containerStyle={{
                    aspectRatio: img[index].aspectRatio,
                  }}
                />
              </View>
            )}
          />
          <View style={{ paddingHorizontal: 40, marginTop: 40 }}>
            <Button
              onPress={() => {
                Linking.openURL("tel://533131191");
              }}
              raised={false}
              title={"533 131 191"}
              uppercase={true}
              type='outline'
              color={theme.colors.secondary}
              icon={
                <Icon
                  name='cellphone'
                  size={20}
                  color={theme.colors.primary}
                  type='material-community'
                  containerStyle={{ marginRight: 10 }}
                />
              }
              buttonStyle={{
                height: 50,
                marginTop: 20,
                borderWidth: 2,
                borderRadius: 6,
              }}
              titleStyle={{
                fontSize: 18,
              }}
            />
            <Button
              raised={false}
              title={"napisz wiadomość"}
              uppercase={true}
              color={theme.colors.primary}
              icon={
                <Icon
                  name='email-outline'
                  size={20}
                  color={theme.colors.white}
                  type='material-community'
                  containerStyle={{ marginRight: 7 }}
                />
              }
              buttonStyle={{
                height: 50,
                marginTop: 10,
                borderWidth: 2,
                borderRadius: 6,
              }}
              onPress={() => {
                navigation.navigate("ChatModal", {
                  user: "Jadłodalnia brata Alberta",
                  topic: "Bułka",
                });
              }}
            />
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Image
            source={{ uri: img[0].uri }}
            containerStyle={{
              aspectRatio: img[0].aspectRatio,
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ImgShowScreen;
