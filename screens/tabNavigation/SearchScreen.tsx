import { StyleSheet, View } from "react-native";
import { Avatar } from "@rneui/themed";
import { SearchBar } from "@rneui/themed";
import { theme } from "../../styles/Theme";
import { SearchScreenParams } from "../../types";

const SearchScreen = ({ navigation }: SearchScreenParams) => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Avatar
          rounded
          title={"B"}
          size={44}
          overlayContainerStyle={{
            backgroundColor: theme.lightColors?.primary,
          }}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        />
        <SearchBar placeholder='Wyszukaj organizacje.' />
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
