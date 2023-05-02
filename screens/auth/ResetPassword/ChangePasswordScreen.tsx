import { useState, useRef } from "react";
import { Icon, Text, useTheme, Input } from "@rneui/themed";
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { ChangePasswordParams } from "../../../routes/types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import ButtonSubmit from "../../../components/ButtonSubmit";
import type { Input as TypeInput } from "@rneui/base";

type FormData = {
  password: string;
  rePassword: string;
};

const schema: yup.ObjectSchema<FormData> = yup.object({
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
});

const ChangePasswordScreen = ({ navigation }: ChangePasswordParams) => {
  const [loading, setLoading] = useState(false);
  const [focusInput, setFocusInput] = useState("");
  const { theme } = useTheme();
  const input2 = useRef<TextInput & TypeInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      rePassword: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    navigation.navigate("Login");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          paddingVertical: 45,
          backgroundColor: theme.colors.white,
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            marginBottom: 35,
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
        <View style={{ marginHorizontal: "5%" }}>
          <View>
            <Text h2>Nowe Hasło</Text>
            <Text
              style={{
                color: theme.colors.grey3,
                fontSize: 14,
                marginTop: 30,
                marginBottom: 30,
                marginRight: "15%",
              }}
            >
              Wprowadź nowe hasło, pamiętaj powinno składać się z minimum 6
              znaków oraz zawierać dużą, małą literę oraz cyfrę
            </Text>
          </View>
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  returnKeyType={"next"}
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    input2.current?.focus();
                  }}
                  onFocus={() => {
                    setFocusInput("password");
                  }}
                  onBlur={() => {
                    setFocusInput("");
                  }}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={true}
                  label={"Nowe hasło"}
                  keyboardType='default'
                  placeholder={"Wprowadź nowe hasło"}
                  errorMessage={errors.password ? errors.password?.message : ""}
                  inputContainerStyle={{
                    backgroundColor: theme.colors.grey5,
                    borderColor:
                      focusInput === "password"
                        ? theme.colors.secondary
                        : theme.colors.grey5,
                    borderWidth: 2,
                    borderBottomWidth: 2,
                  }}
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
                  ref={input2}
                  onFocus={() => {
                    setFocusInput("rePassword");
                  }}
                  onBlur={() => {
                    setFocusInput("");
                  }}
                  secureTextEntry={true}
                  onChangeText={onChange}
                  value={value}
                  label={"Powtórz hasło"}
                  keyboardType='default'
                  placeholder={"Powtórz hasło"}
                  errorMessage={
                    errors.rePassword ? errors.rePassword?.message : ""
                  }
                  inputContainerStyle={{
                    backgroundColor: theme.colors.grey5,
                    borderColor:
                      focusInput === "rePassword"
                        ? theme.colors.secondary
                        : theme.colors.grey5,
                    borderWidth: 2,
                    borderBottomWidth: 2,
                  }}
                />
              )}
              name='rePassword'
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text
                style={{
                  color: theme.colors.grey3,
                  fontSize: 14,
                  textAlign: "center",
                  marginTop: 30,
                  marginBottom: 20,
                }}
              >
                Cofnij do ekranu logowania
              </Text>
            </TouchableOpacity>
            <ButtonSubmit
              onPress={handleSubmit(onSubmit)}
              title='Wyślij'
              loading={loading}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ChangePasswordScreen;
