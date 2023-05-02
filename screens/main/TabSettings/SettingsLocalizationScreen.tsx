import { View, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";
import { useState, useRef } from "react";
import { Text, useTheme, Icon } from "@rneui/themed";
import { SettingsLocalizationScreenParams } from "../../../routes/types";
import MapView, { Circle } from "react-native-maps";
import { Slider } from "@rneui/themed";
import ButtonSubmit from "../../../components/ButtonSubmit";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileGeoLocationAction } from "../../../actions/UserAction";
import { RootReducerType } from "../../../reducers/types";

type geoLocation = {
  latitude: number;
  longitude: number;
};

const SettingsLocalizationScreen = ({
  navigation,
}: SettingsLocalizationScreenParams) => {
  const geoLocation = useSelector(
    (state: RootReducerType) => state.user.geoLocation
  );
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [loadingBttn, setLoadingBttn] = useState<boolean>(false);
  const [radius, setRadius] = useState<number>(
    geoLocation?.radius !== undefined ? geoLocation.radius : 50
  );
  const [location, setLocation] = useState<geoLocation>({
    latitude:
      geoLocation?.latitude !== undefined ? geoLocation.latitude : 52.237049,
    longitude:
      geoLocation?.longitude !== undefined ? geoLocation.longitude : 21.017532,
  });

  const handleSetGeoLocation = () => {
    setLoadingBttn(true);
    dispatch(updateProfileGeoLocationAction({ ...location, radius }));
    setTimeout(() => {
      setLoadingBttn(false);
      navigation.goBack();
    }, 2500);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
      <View
        style={{
          marginTop: 45,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          marginBottom: 25,
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
            containerStyle={{ marginRight: 25 }}
          />
        </TouchableOpacity>
        <Text h4> Wybierz lokalizacje</Text>
      </View>
      <View style={{ position: "relative", width: width, height: height / 2 }}>
        <Icon
          name='target'
          size={24}
          color={theme.colors.secondary}
          type='material-community'
          containerStyle={{
            position: "absolute",
            top: height / 4 - 9,
            left: width / 2 - 13,
            zIndex: 2,
          }}
        />
        <MapView.Animated
          ref={mapRef}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 1,
            longitudeDelta: 0.5,
          }}
          style={{ width: "100%", height: "100%" }}
          maxZoomLevel={14}
          minZoomLevel={6}
          // mapType={Platform.OS == "android" ? "none" : "standard"}
          // zoomEnabled={false}
          // followsUserLocation={true}
          // showsUserLocation={true}
          onRegionChange={(region) => {
            setLocation({
              latitude: region.latitude,
              longitude: region.longitude,
            });
          }}
          onRegionChangeComplete={(region) => {
            setLocation({
              latitude: region.latitude,
              longitude: region.longitude,
            });
          }}
        >
          <Circle
            strokeColor={"rgba(162,210,255,1)"}
            fillColor={"rgba(162,210,255,0.5)"}
            strokeWidth={5}
            radius={radius * 1000}
            center={location}
          />
        </MapView.Animated>
      </View>
      <Text
        h4
        style={{
          paddingLeft: 15,
          marginTop: 25,
        }}
      >
        Zasięg
      </Text>
      <Text
        style={{
          paddingHorizontal: 15,
          marginTop: 10,
          color: theme.colors.grey3,
        }}
      >
        Wyświetlane będą ogłoszenia z wybranej lokalizacji oraz wybranym zasięgu
      </Text>
      <View
        style={{
          paddingVertical: 20,
          marginHorizontal: 10,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Slider
          style={{ width: "70%" }}
          value={radius}
          onValueChange={setRadius}
          maximumValue={100}
          minimumValue={1}
          step={1}
          allowTouchTrack
          minimumTrackTintColor={theme.colors.primary}
          trackStyle={{ height: 5, backgroundColor: "transparent" }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: "transparent" }}
          thumbProps={{
            children: (
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: theme.colors.primary,
                  top: 0,
                  borderRadius: 15,
                }}
              />
            ),
          }}
        />
        <Text
          style={{
            width: "25%",
            paddingLeft: 20,
            fontWeight: "bold",
            fontSize: 18,
            color: theme.colors.grey3,
          }}
        >
          {radius} km
        </Text>
      </View>
      <ButtonSubmit
        loading={loadingBttn}
        title='Zatwierdź'
        containerStyle={{ marginHorizontal: 15, marginTop: 25 }}
        onPress={handleSetGeoLocation}
      />
    </SafeAreaView>
  );
};

export default SettingsLocalizationScreen;
