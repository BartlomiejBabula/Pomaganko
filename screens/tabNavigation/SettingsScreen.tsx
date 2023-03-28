import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Button, Text, Icon, Divider, Switch } from "@rneui/themed";
import { SettingsScreenParams } from "../../types";

const SettingsScreen = ({ navigation }: SettingsScreenParams) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SettingsModal", {
            screen: "SettingsLocations",
          });
        }}
      >
        <Text>Language</Text>
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
