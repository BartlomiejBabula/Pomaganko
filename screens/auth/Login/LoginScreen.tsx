import { useState, useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { Text, Button, useTheme, Input, Divider } from "@rneui/themed";
import Animated, { Layout } from "react-native-reanimated";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { LoginScreenParams } from "../../../routes/types";
import { useDispatch } from "react-redux";
import { logInAction } from "../../../actions/UserAction";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { translate } from "../../../i18n/i18n";
import { useIsFocused } from "@react-navigation/native";
import Header from "./AnimatedHeader";
import Footer from "./Footer";
import ButtonGroup from "./ButtonGroup";

type FormData = {
  email: string;
  password: string;
};

WebBrowser.maybeCompleteAuthSession();

const schema: yup.ObjectSchema<FormData> = yup.object({
  email: yup
    .string()
    .email(translate.t("addOffer.input.email.errors.email"))
    .required(translate.t("addOffer.input.email.errors.required"))
    .min(8, translate.t("addOffer.input.email.errors.min"))
    .max(32, translate.t("addOffer.input.email.errors.max")),
  password: yup
    .string()
    .matches(
      /^.*(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Hasło musi posiadać dużą, małą literę oraz cyfrę"
    )
    .min(6, "Hasło jest zbyt krótkie")
    .required("Hasło jest wymagane"),
});

const LoginScreen = ({ navigation }: LoginScreenParams) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [loadingBttn, setLoadingBttn] = useState(false);
  const [loadingFb, setLoadingFb] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [token, setToken] = useState("");
  const [focusInput, setFocusInput] = useState("");
  const isFocused = useIsFocused();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "591167228486-ucnu5grkm9lh8vpo43j2kkupumaolu75.apps.googleusercontent.com",
    expoClientId:
      "591167228486-ucnu5grkm9lh8vpo43j2kkupumaolu75.apps.googleusercontent.com",
    // iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    // responseType: "id_token",
  });

  const [requestFB, responseFB, promptAsyncFB] = Facebook.useAuthRequest({
    clientId: "715016463752049",
  });

  const handleFBUser = async () => {
    setLoadingFb(true);
    const result = await promptAsyncFB();
    if (result.type !== "success") {
      setLoadingFb(false);
      alert("Uh oh, something went wrong");
      return;
    }
  };

  const handleGoogleUser = async () => {
    setLoadingGoogle(true);
    const result = await promptAsync();
    console.log(JSON.stringify(result, null, 4));
    if (result.type !== "success") {
      setLoadingGoogle(false);
      alert("Uh oh, something went wrong");
      return;
    }
  };

  const handleUserLogging = async (data: FormData) => {
    console.log(data, "działa");
    let newuUser = {
      name: "Testowy",
      avatar: "",
      email: "test@test.com",
      isLogged: true,
    };
    dispatch(logInAction(newuUser));
  };

  const handleNaviToRegister = () => {
    navigation.navigate("Register");
  };

  useEffect(() => {
    if (response?.type === "success" && response.authentication !== null) {
      setToken(response.authentication.accessToken);
      (async () => {
        const response = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const user = await response.json();
        if (user.email) {
          let newuUser = {
            name: user.name,
            avatar: user.picture,
            email: user.email,
            isLogged: false,
          };
          dispatch(logInAction(newuUser));
          setLoadingGoogle(false);
          navigation.reset({
            index: 0,
            routes: [{ name: "FirstLogin" }],
          });
        }
      })();
    } else if (
      responseFB?.type === "success" &&
      responseFB.authentication !== null
    ) {
      setToken(responseFB.authentication?.accessToken);
      (async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${responseFB.authentication?.accessToken}&fields=id,name,email,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();
        let newuUser = {
          name: userInfo.name,
          avatar: userInfo.picture.data.url,
          email: userInfo.email,
          isLogged: false,
        };
        dispatch(logInAction(newuUser));
        setLoadingFb(false);
        navigation.reset({
          index: 0,
          routes: [{ name: "FirstLogin" }],
        });
      })();
    }
  }, [response, token, responseFB]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isFocused) {
      reset();
    }
  }, [isFocused]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.secondary,
      }}
    >
      <Header />
      <Animated.View
        layout={Layout.duration(150)}
        style={{
          flex: 2,
          width: "100%",
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          backgroundColor: theme.colors.white,
          alignItems: "center",
        }}
      >
        <Text
          h4
          style={{
            textAlign: "left",
            width: "100%",
            paddingLeft: "10%",
            paddingTop: 20,
          }}
        >
          Zaloguj
        </Text>
        <View style={{ width: "85%", paddingTop: 25 }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                onFocus={() => {
                  setFocusInput("email");
                }}
                onBlur={() => {
                  setFocusInput("");
                }}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email ? errors.email?.message : ""}
                placeholder='Email'
                // keyboardType='visible-password'
                autoCorrect={false}
                inputContainerStyle={{
                  backgroundColor: theme.colors.grey5,
                  borderColor:
                    focusInput === "email"
                      ? theme.colors.primary
                      : theme.colors.grey5,
                  borderWidth: 2,
                  borderBottomWidth: 2,
                }}
                containerStyle={{ marginTop: 0 }}
              />
            )}
            name='email'
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                onFocus={() => {
                  setFocusInput("password");
                }}
                onBlur={() => {
                  setFocusInput("");
                }}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password ? errors.password?.message : ""}
                placeholder='Hasło'
                secureTextEntry={true}
                textContentType='password'
                inputContainerStyle={{
                  backgroundColor: theme.colors.grey5,
                  borderColor:
                    focusInput === "password"
                      ? theme.colors.primary
                      : theme.colors.grey5,
                  borderWidth: 2,
                  borderBottomWidth: 2,
                }}
              />
            )}
            name='password'
          />
        </View>
        <Button
          onPress={() => {
            navigation.navigate("ResetPassword");
          }}
          title='Nie pamiętasz hasła?'
          type='clear'
          containerStyle={{
            marginTop: 10,
            alignSelf: "flex-end",
            paddingRight: "5%",
            marginBottom: 40,
          }}
        />
        <ButtonGroup
          handleGoogleUser={handleGoogleUser}
          handleFBUser={handleFBUser}
          loadingBttn={loadingBttn}
          loadingGoogle={loadingGoogle}
          loadingFb={loadingFb}
          onSubmit={handleSubmit(handleUserLogging)}
        />
        <Divider style={{ width: "90%", marginBottom: 10 }} width={1} />
        <Footer handleNaviToRegister={handleNaviToRegister} />
      </Animated.View>
    </SafeAreaView>
  );
};

export default LoginScreen;
