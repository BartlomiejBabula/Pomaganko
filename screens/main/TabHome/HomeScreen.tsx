import { SafeAreaView } from "react-native";
import { useTheme, Text } from "@rneui/themed";
import { HomeScreenParams } from "../../../routes/types";
import { RootReducerType } from "../../../reducers/types";
import { useSelector } from "react-redux";

const HomeScreen = ({ navigation }: HomeScreenParams) => {
  let user = useSelector((state: RootReducerType) => state.user);
  const { theme } = useTheme();
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>HomePage</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
