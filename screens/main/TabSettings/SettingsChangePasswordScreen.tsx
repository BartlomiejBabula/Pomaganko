import { useState, useRef, useEffect } from "react";
import { Icon, Text, useTheme, Input } from "@rneui/themed";
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import { SettingsChangePasswordScreenParams } from "../../../routes/types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import ButtonSubmit from "../../../components/ButtonSubmit";
import type { Input as TypeInput } from "@rneui/base";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Layout,
} from "react-native-reanimated";

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

const SettingsChangePasswordScreen = ({
  navigation,
}: SettingsChangePasswordScreenParams) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [focusInput, setFocusInput] = useState("");
  const input2 = useRef<TextInput & TypeInput>(null);
  const animatedMargin = useSharedValue(35);

  const animatedMarginBotton = useAnimatedStyle(() => {
    return {
      marginBottom: animatedMargin.value,
    };
  });
  const animatedMarginTop = useAnimatedStyle(() => {
    return {
      marginTop: animatedMargin.value,
    };
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  if (isKeyboardVisible)
    animatedMargin.value = withTiming(5, { duration: 100 });
  else animatedMargin.value = withTiming(35, { duration: 100 });

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
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          paddingTop: 45,
          flex: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <Animated.View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
              },
              animatedMarginBotton,
            ]}
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
          </Animated.View>
          <View style={{ marginHorizontal: "7%" }}>
            <Text h2>Zmień</Text>
            <Text h2>Hasło</Text>
            <Text
              style={{
                color: theme.colors.grey3,
                fontSize: 14,
                marginTop: 10,
                marginRight: "15%",
              }}
            >
              Wprowadź nowe hasło, pamiętaj powinno składać się z minimum 6
              znaków oraz zawierać dużą, małą literę oraz cyfrę
            </Text>
          </View>
        </View>
        <Animated.View
          layout={Layout.duration(150)}
          style={{
            backgroundColor: theme.colors.white,
            flex: 2,
            paddingVertical: 30,
            paddingHorizontal: "5%",
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            marginHorizontal: "2%",
          }}
        >
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
          <Animated.View style={animatedMarginTop}>
            <ButtonSubmit
              onPress={handleSubmit(onSubmit)}
              title='Zmień'
              loading={loading}
            />
          </Animated.View>
        </Animated.View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SettingsChangePasswordScreen;
