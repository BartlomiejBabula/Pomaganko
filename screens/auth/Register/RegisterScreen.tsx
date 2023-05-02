import { useState, useEffect, useRef } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Text, useTheme, Input, Icon, CheckBox } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { RegisterScreenParams } from "../../../routes/types";
import ButtonSubmit from "../../../components/ButtonSubmit";
import SwitchButton from "../../../components/SwitchButton";
import Animated, { Layout } from "react-native-reanimated";
import type { Input as TypeInput } from "@rneui/base";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { translate } from "../../../i18n/i18n";
import * as yup from "yup";

type FormData = {
  role: "Wspierający" | "Organizacja";
  email: string;
  password: string;
  rePassword: string;
  acceptCb: boolean;
};

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
  rePassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Błędnie powtórzone hasło")
    .required("Powtórz hasło"),
  acceptCb: yup
    .bool()
    .required()
    .oneOf([true], "Musisz zaakceptować regulamin"),
  role: yup
    .mixed<FormData["role"]>()
    .required()
    .oneOf(["Wspierający", "Organizacja"]),
});

const RegisterScreen = ({ navigation }: RegisterScreenParams) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [loadingBttn, setLoadingBttn] = useState(false);
  const [focusInput, setFocusInput] = useState("");
  const input2 = useRef<TextInput & TypeInput>(null);
  const input3 = useRef<TextInput & TypeInput>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      role: "Wspierający",
      email: "",
      password: "",
      rePassword: "",
      acceptCb: false,
    },
  });

  const onSubmit = (e: FormData) => {
    setLoadingBttn(true);
    console.log(e);
    setLoadingBttn(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            top: 0,
            left: 0,
            paddingTop: 35,
            paddingBottom: 10,
            paddingHorizontal: "5%",
            width: "100%",
            zIndex: 1,
            backgroundColor: theme.colors.white,
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
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animated.View
            layout={Layout.duration(100)}
            style={{
              paddingVertical: 45,
              backgroundColor: theme.colors.white,
              flex: 1,
              paddingHorizontal: "5%",
              justifyContent: "center",
            }}
          >
            <Animated.View layout={Layout.duration(100)}>
              <Text h2 style={{ textAlign: "left", width: "100%" }}>
                Rejestracja
              </Text>
              <Text h2 style={{ textAlign: "left", width: "100%" }}>
                Użytkownika
              </Text>
              <Text
                style={{
                  color: theme.colors.grey3,
                  fontSize: 14,
                  marginTop: 30,
                  marginBottom: 30,
                  marginRight: "20%",
                }}
              >
                Wprowadź swoje dane w celu rejestracji, na wprowadzony adres
                email zostanie wysłany link aktywacyjny.
              </Text>
              <Controller
                control={control}
                render={() => (
                  <SwitchButton
                    option1='Wspierający'
                    option2='Organizacja'
                    switchHeight={50}
                    getValue={(value: number) => {
                      if (value == 1) setValue("role", "Wspierający");
                      if (value == 2) setValue("role", "Organizacja");
                    }}
                  />
                )}
                name='role'
              />
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
                    textContentType='emailAddress'
                    keyboardType='email-address'
                    placeholder='Email'
                    returnKeyType={"next"}
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      input2.current?.focus();
                    }}
                    autoCorrect={false}
                    inputContainerStyle={{
                      backgroundColor: theme.colors.grey5,
                      borderColor:
                        focusInput === "email"
                          ? theme.colors.secondary
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
                    ref={input2}
                    onFocus={() => {
                      setFocusInput("password");
                    }}
                    onBlur={() => {
                      setFocusInput("");
                    }}
                    onChangeText={onChange}
                    value={value}
                    placeholder='Hasło'
                    returnKeyType={"next"}
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      input3.current?.focus();
                    }}
                    secureTextEntry={true}
                    errorMessage={
                      errors.password ? errors.password?.message : ""
                    }
                    textContentType='password'
                    inputContainerStyle={{
                      backgroundColor: theme.colors.grey5,
                      borderColor:
                        focusInput === "password"
                          ? theme.colors.secondary
                          : theme.colors.grey5,
                      borderWidth: 2,
                      borderBottomWidth: 2,
                    }}
                    containerStyle={{ marginTop: 0 }}
                  />
                )}
                name='password'
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    ref={input3}
                    onFocus={() => {
                      setFocusInput("rePassword");
                    }}
                    onBlur={() => {
                      setFocusInput("");
                    }}
                    onChangeText={onChange}
                    value={value}
                    placeholder='Powtórz hasło'
                    secureTextEntry={true}
                    errorMessage={
                      errors.rePassword ? errors.rePassword?.message : ""
                    }
                    textContentType='password'
                    inputContainerStyle={{
                      backgroundColor: theme.colors.grey5,
                      borderColor:
                        focusInput === "rePassword"
                          ? theme.colors.secondary
                          : theme.colors.grey5,
                      borderWidth: 2,
                      borderBottomWidth: 2,
                    }}
                    containerStyle={{ marginTop: 0 }}
                  />
                )}
                name='rePassword'
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <CheckBox
                    containerStyle={{ paddingBottom: 0 }}
                    uncheckedColor={
                      errors.acceptCb ? theme.colors.error : theme.colors.grey3
                    }
                    checked={value}
                    title='Zaakceptuj regulamin'
                    checkedTitle='Akceptuje regulamin'
                    onPress={() => {
                      onChange(!value);
                    }}
                  />
                )}
                name='acceptCb'
              />
              <ButtonSubmit
                onPress={handleSubmit(onSubmit)}
                title='Zarejestruj'
                uppercase
                loading={loadingBttn}
                containerStyle={{ marginTop: 20 }}
              />
            </Animated.View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
