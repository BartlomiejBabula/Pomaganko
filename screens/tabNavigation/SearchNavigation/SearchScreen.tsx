import { ScrollView, View, SafeAreaView, TouchableOpacity } from "react-native";
import { Input, useTheme, Divider, Icon, Text, Card } from "@rneui/themed";
import { SearchScreenParams } from "../../../types";
import { translate } from "../../../i18n";

const TestItemList = [
  { title: "Testowa Organizacja", city: "Bielsko-Biała" },
  { title: "Testowa Organizacja", city: "Bielsko-Biała" },
  { title: "Testowa Organizacja", city: "Bielsko-Biała" },
  { title: "Testowa Organizacja", city: "Bielsko-Biała" },
  { title: "Testowa Organizacja", city: "Bielsko-Biała" },
];

const SearchScreen = ({ navigation }: SearchScreenParams) => {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: 30,
          backgroundColor: theme.colors.white,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 5,
        }}
      >
        <Input
          placeholder={translate.t("searchScreen.searchInputPlaceholder")}
          errorStyle={{ height: 0, marginBottom: 0 }}
          labelStyle={{ height: 0 }}
          containerStyle={{ width: "75%", marginLeft: 10 }}
          inputContainerStyle={{
            height: 42,
          }}
          rightIcon={
            <Icon
              name='magnify'
              size={22}
              color={theme.colors.black}
              type='material-community'
              containerStyle={{ marginRight: 5 }}
            />
          }
        />
        <TouchableOpacity
          style={{
            marginRight: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("SearchFilter");
          }}
        >
          <Text style={{ color: theme.colors.primary }}>Filtry</Text>
          <Icon
            name='chevron-down'
            size={24}
            style={{ marginLeft: 1, paddingTop: 2 }}
            color={theme.colors.primary}
            type='material-community'
          />
        </TouchableOpacity>
      </View>
      <Divider />
      <ScrollView style={{ paddingTop: 5 }}>
        {TestItemList?.map((organization, key) => (
          <Card
            key={key}
            containerStyle={{ marginHorizontal: 0, marginVertical: 10 }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CharityProfile", {
                  name: organization.title,
                });
              }}
            >
              <Card.Title>{organization.title}</Card.Title>
              <Card.Divider />
              <View style={{ height: 100 }}>
                <Text>{organization.city}</Text>
              </View>
            </TouchableOpacity>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
