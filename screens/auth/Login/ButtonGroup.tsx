import { View } from "react-native";
import { SocialIcon, useTheme } from "@rneui/themed";
import ButtonSubmit from "../../../components/ButtonSubmit";

type ButtomGroupParams = {
  onSubmit: Function;
  handleGoogleUser: Function;
  handleFBUser: Function;
  loadingBttn: boolean;
  loadingGoogle: boolean;
  loadingFb: boolean;
};
const ButtonGroup = ({
  handleGoogleUser,
  handleFBUser,
  loadingBttn,
  loadingGoogle,
  loadingFb,
  onSubmit,
}: ButtomGroupParams) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "85%",
        alignItems: "center",
        marginBottom: 30,
      }}
    >
      <ButtonSubmit
        onPress={() => onSubmit()}
        title='Zaloguj'
        uppercase
        loading={loadingBttn}
        disabled={loadingBttn}
      />
      <View style={{ flexDirection: "row" }}>
        <SocialIcon
          underlayColor={theme.colors.white}
          onPress={() => {
            handleGoogleUser();
          }}
          type='google'
          loading={loadingGoogle}
          disabled={loadingGoogle}
        />
        <SocialIcon
          underlayColor={theme.colors.white}
          onPress={() => {
            handleFBUser();
          }}
          type='facebook'
          disabled={loadingFb}
          loading={loadingFb}
        />
      </View>
    </View>
  );
};

export default ButtonGroup;
