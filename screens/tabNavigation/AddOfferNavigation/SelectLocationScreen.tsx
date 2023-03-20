import { useState } from "react";
import { Input, Icon, Text, Divider, Dialog, useTheme } from "@rneui/themed";
import { TouchableOpacity, View, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { SelectLocationScreenParams } from "../../../types";
import * as Location from "expo-location";
import { translate } from "../../../i18n";

const SelectLocationScreen = ({
  navigation,
  route,
}: SelectLocationScreenParams) => {
  const [inputValue, setInputValue] = useState(route.params.location);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme } = useTheme();
  let cities = useSelector((state: any) => state.location);

  const handleDelete = () => {
    setInputValue("");
  };

  const handleSelect = (location?: string) => {
    navigation.navigate("AddOfferModal", {
      location: location ? location : "",
    });
  };

  const getLocation = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError(translate.t("addOffer.selectLocationScreen.error"));
      return;
    }
    let latLong = await Location.getCurrentPositionAsync({});
    let location = await Location.reverseGeocodeAsync({
      longitude: latLong.coords.longitude,
      latitude: latLong.coords.latitude,
    });
    if (location[0].city) {
      setInputValue(location[0].city);
      navigation.navigate("AddOfferModal", { location: location[0].city });
    }
    setLoading(false);
  };

  return (
    <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
      <Input
        placeholder={translate.t("addOffer.selectLocationScreen.placeholder")}
        inputStyle={{ fontSize: 17 }}
        errorStyle={{ marginBottom: 0 }}
        value={inputValue}
        onChangeText={setInputValue}
        leftIcon={
          <Icon
            onPress={() => {
              navigation.goBack();
            }}
            name='arrow-left'
            size={26}
            color={theme.colors.secondary}
            type='material-community'
            containerStyle={{ marginLeft: 5 }}
          />
        }
        rightIcon={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {inputValue && (
              <Icon
                onPress={handleDelete}
                name='close'
                size={22}
                color={theme.colors.secondary}
                type='material-community'
                containerStyle={{ marginRight: 25 }}
              />
            )}
            <Icon
              name='magnify'
              size={30}
              color={theme.colors.primary}
              type='material-community'
              containerStyle={{ marginRight: 5 }}
            />
          </View>
        }
      />
      <ScrollView>
        {inputValue ? (
          cities
            ?.filter((city: any) =>
              city.city.match(new RegExp(inputValue, "i"))
            )
            .map((city: any, key: any) => (
              <TouchableOpacity
                onPress={() => {
                  handleSelect(city.city);
                }}
                key={key}
                style={{ height: 70 }}
              >
                <Text style={{ fontSize: 17 }}>{city.city}</Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: theme.colors.grey3,
                    marginTop: 1,
                    marginBottom: 12,
                  }}
                >
                  {city.community}, {city.provinces}
                </Text>
                <Divider />
              </TouchableOpacity>
            ))
        ) : !loading ? (
          <TouchableOpacity onPress={getLocation}>
            <Text
              style={{
                fontSize: 17,
                color: error ? theme.colors.error : theme.colors.secondary,
              }}
            >
              {error
                ? error
                : translate.t("addOffer.selectLocationScreen.currentLocation")}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: theme.colors.grey3,
                marginTop: 6,
                marginBottom: 12,
              }}
            >
              {translate.t("addOffer.selectLocationScreen.description")}
            </Text>
            <Divider />
          </TouchableOpacity>
        ) : (
          <Dialog.Loading />
        )}
      </ScrollView>
    </View>
  );
};

export default SelectLocationScreen;
