import { SafeAreaView, View, ScrollView, TouchableOpacity } from "react-native";
import { useTheme, Icon, Text, Button, Divider } from "@rneui/themed";
import { SearchFilterScreenParams } from "../../../types";

const SearchFilterScreen = ({ navigation }: SearchFilterScreenParams) => {
  const { theme } = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.colors.white,
          paddingTop: 35,
          paddingBottom: 15,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon
            name='window-close'
            size={26}
            type='material-community'
            onPress={() => {
              navigation.goBack();
            }}
            containerStyle={{ marginLeft: 10, marginRight: 15, marginTop: 2 }}
          />
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Filtry</Text>
        </View>
        <TouchableOpacity style={{ marginRight: 10 }}>
          <Text style={{ color: theme.colors.primary }}>Wyczyść</Text>
        </TouchableOpacity>
      </View>
      <Divider />
      <ScrollView style={{ minHeight: "40%" }}></ScrollView>
      <Button
        raised={false}
        title={"pokaż wyniki"}
        uppercase={true}
        color={theme.colors.secondary}
        buttonStyle={{ height: 60 }}
        titleStyle={{ color: theme.colors.grey5, letterSpacing: 1 }}
      />
    </SafeAreaView>
  );
};

export default SearchFilterScreen;
