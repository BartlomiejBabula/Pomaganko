import { useState } from "react";
import { Input, Icon, Text, Divider, Dialog, useTheme } from "@rneui/themed";
import { TouchableOpacity, View, ScrollView, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { SelectLocationScreenParams } from "../../../routes/types";
import * as Location from "expo-location";
import { translate } from "../../../i18n/i18n";

const SelectLocationScreen = ({
  navigation,
  route,
}: SelectLocationScreenParams) => {
  const [inputValue, setInputValue] = useState(route.params.location);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme } = useTheme();
  let cities = useSelector((state: any) => state.location);
  let backLocation = route.params.backLocation;

  const handleDelete = () => {
    setInputValue("");
  };

  const handleSelect = (location?: string) => {
    navigation.navigate(backLocation, {
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
      navigation.navigate(backLocation, { location: location[0].city });
    }
    setLoading(false);
  };

  return (
    <SafeAreaView
      style={{
        paddingVertical: 40,
        backgroundColor: theme.colors.white,
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon
            name='arrow-left'
            size={26}
            color={theme.colors.black}
            type='material-community'
            containerStyle={{ marginRight: 10 }}
          />
        </TouchableOpacity>
        <Input
          placeholder={translate.t("addOffer.selectLocationScreen.placeholder")}
          inputStyle={{ fontSize: 15 }}
          errorStyle={{ marginBottom: 0, height: 0 }}
          containerStyle={{ height: 45 }}
          inputContainerStyle={{
            backgroundColor: "transparent",
            height: 42,
            width: "85%",
          }}
          value={inputValue}
          onChangeText={setInputValue}
          rightIcon={
            inputValue !== "" && (
              <Icon
                onPress={handleDelete}
                name='close'
                size={22}
                color={theme.colors.black}
                type='material-community'
              />
            )
          }
        />
      </View>
      <Divider style={{ marginBottom: 15 }} />
      <ScrollView style={{ paddingHorizontal: 10 }}>
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
                <Text style={{ fontSize: 15 }}>{city.city}</Text>
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
                fontSize: 15,
                color: error ? theme.colors.error : theme.colors.black,
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
                marginTop: 1,
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
    </SafeAreaView>
  );
};

export default SelectLocationScreen;
