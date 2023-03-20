import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Avatar, Text, Icon, Divider, Switch } from "@rneui/themed";
import { ProfileScreenParams } from "../../types";
import { theme } from "../../styles/Theme";

const ProfileScreen = ({ navigation }: ProfileScreenParams) => {
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
