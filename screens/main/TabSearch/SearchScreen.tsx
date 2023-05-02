import { ScrollView, View, SafeAreaView, TouchableOpacity } from "react-native";
import { Input, useTheme, Divider, Icon, Text } from "@rneui/themed";
import { SearchScreenParams } from "../../../routes/types";
import { translate } from "../../../i18n/i18n";
import OfferListCard from "../../../components/OfferListCard";
import { TestItemList } from "../../../components/TestItemList";

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
      <ScrollView>
        {TestItemList?.map((offer, i) => (
          <View key={i}>
            <OfferListCard
              navigation={navigation}
              uri={offer.image}
              title={offer.title}
              city={offer.city}
              organization={offer.organization}
              price={offer.price}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
