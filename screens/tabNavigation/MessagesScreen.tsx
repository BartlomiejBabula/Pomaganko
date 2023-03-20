import { StyleSheet, View, Text } from "react-native";

const MessagesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MessagesScreen</Text>
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
