import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "@rneui/themed";
import { SettingsScreenParams } from "../../../routes/types";
import { useDispatch } from "react-redux";
import { logOutAction } from "../../../actions/UserAction";

const SettingsScreen = ({ navigation }: SettingsScreenParams) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SettingsModal", {
            screen: "SettingsLocations",
          });
        }}
      >
        <Text h4>Język</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          dispatch(logOutAction());
        }}
      >
        <Text h4>Wyloguj</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
