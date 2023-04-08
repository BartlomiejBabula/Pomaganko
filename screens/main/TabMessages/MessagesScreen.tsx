import { View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Divider, Text, useTheme, Card, Avatar } from "@rneui/themed";
import { MessagesScreenParams } from "../../../routes/types";
import { translate } from "../../../i18n/i18n";

const test = [
  { name: "Schronisko Reksio", title: "Karma dla kotów" },
  { name: "Jadłodalnia Brata Alberta", title: "Obiad" },
  { name: "Hospicjium Domowe", title: "Rachunek za prąd" },
  { name: "Schronisko Reksio", title: "Karma dla psów" },
  { name: "Dom Dziecka Bielsko", title: "Wyjazd nad morze" },
  { name: "Jadłodalnia Brata Alberta", title: "Obiad" },
  { name: "Hospicjium Domowe", title: "Rachunek za prąd" },
  { name: "Schronisko Reksio", title: "Karma dla psów" },
  { name: "Dom Dziecka Bielsko", title: "Wyjazd nad morze" },
];

const MessagesScreen = ({ navigation }: MessagesScreenParams) => {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: 100,
          paddingLeft: 30,
          paddingBottom: 15,
          backgroundColor: theme.colors.white,
        }}
      >
        <Text h3>{translate.t("messages.title")}</Text>
      </View>
      <Divider />
      <ScrollView>
        {test.map((message, key) => (
          <Card
            key={key}
            containerStyle={{
              marginHorizontal: 0,
              marginVertical: 10,
              padding: 5,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CharityProfile", {
                    name: message.name,
                  });
                }}
              >
                <Avatar
                  title={message.name.charAt(0)}
                  containerStyle={{
                    backgroundColor: theme.colors.secondary,
                    borderRadius: 4,
                    marginRight: 20,
                  }}
                  size={"medium"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: "100%" }}
                onPress={() => {
                  navigation.navigate("ChatModal", {
                    user: message.name,
                    topic: message.title,
                  });
                }}
              >
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 16,
                      marginBottom: 5,
                    }}
                  >
                    {message.name}
                  </Text>
                  <Text style={{ fontSize: 14, marginBottom: 5 }}>
                    {translate.t("messages.topic")}: {message.title}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MessagesScreen;
