import { useState, useRef, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Icon, Text, useTheme, Input, Avatar } from "@rneui/themed";
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import { SettingsProfileScreenParams } from "../../../routes/types";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "../../../reducers/types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProfileAction } from "../../../actions/UserAction";
import { useForm, Controller } from "react-hook-form";
import ButtonSubmit from "../../../components/ButtonSubmit";
import type { Input as TypeInput } from "@rneui/base";
import { translate } from "../../../i18n/i18n";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Layout,
} from "react-native-reanimated";

type FormData = {
  name: string;
  surname: string;
  phone?: string;
  avatar?: string;
};

const schema: yup.ObjectSchema<FormData> = yup.object({
  surname: yup
    .string()
    .required("Nazwisko jest wymagane")
    .min(2, "Minimalna długość znaków 2")
    .max(28, "Maksymalna długość znaków 28"),
  name: yup
    .string()
    .required("Imię jest wymagane")
    .min(2, "Minimalna długość znaków 2")
    .max(28, "Maksymalna długość znaków 28"),
  phone: yup
    .string()
    .required(translate.t("addOffer.input.phone.errors.required"))
    .min(9, translate.t("addOffer.input.phone.errors.min"))
    .max(9, translate.t("addOffer.input.phone.errors.max")),
  avatar: yup.string(),
});

const SettingsProfileScreen = ({ navigation }: SettingsProfileScreenParams) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  let user = useSelector((state: RootReducerType) => state.user);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusInput, setFocusInput] = useState("");
  const input2 = useRef<TextInput & TypeInput>(null);
  const input3 = useRef<TextInput & TypeInput>(null);
  const animatedMargin = useSharedValue(35);
  const [image, setImage] = useState<string>();

  const animatedMarginBotton = useAnimatedStyle(() => {
    return {
      marginBottom: animatedMargin.value / 2,
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
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: user.name ? user.name : "",
      surname: user.surname ? user.surname : "",
      phone: user.phone ? user.phone : "",
      avatar: image ? image : user.avatar ? user.avatar : "",
    },
  });

  const onSubmit = (data: FormData) => {
    let updateUser = { ...data };
    dispatch(updateProfileAction(updateUser));
    console.log(updateUser);
  };

  const handleAddPicture = async () => {
    let result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setValue("avatar", result.assets[0].uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          paddingTop: 30,
          flex: 1,
        }}
      >
        {!isKeyboardVisible && (
          <View style={{ flex: 1, marginTop: 15 }}>
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
              <Text h2>Profil</Text>
              <Text h2>Użytkownika</Text>
              <Text
                style={{
                  color: theme.colors.grey3,
                  fontSize: 14,
                  marginTop: 10,
                  marginRight: "15%",
                }}
              >
                Informacje o twoim koncie.
              </Text>
            </View>
          </View>
        )}
        <Animated.View
          layout={Layout.duration(150)}
          style={{
            backgroundColor: theme.colors.white,
            flex: 3,
            paddingVertical: 10,
            paddingHorizontal: "5%",
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            marginHorizontal: "2%",
          }}
        >
          {!isKeyboardVisible && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <Avatar
                title={user.name?.charAt(0)}
                source={
                  image
                    ? { uri: image }
                    : user.avatar
                    ? { uri: user.avatar }
                    : require("../../../assets/no_profile.png")
                }
                containerStyle={{
                  backgroundColor: theme.colors.secondary,
                  marginVertical: 15,
                }}
                rounded
                size={"large"}
              />
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 20,
                }}
                onPress={handleAddPicture}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 17,
                    paddingBottom: 2,
                    marginRight: 5,
                    color: theme.colors.primary,
                  }}
                >
                  Zmień
                </Text>
                <Icon
                  name='camera'
                  size={24}
                  color={theme.colors.primary}
                  type='material-community'
                />
              </TouchableOpacity>
            </View>
          )}
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
                  setFocusInput("name");
                }}
                onBlur={() => {
                  setFocusInput("");
                }}
                onChangeText={onChange}
                value={value}
                label={"Imię"}
                keyboardType='default'
                placeholder={"Wprowadź swoje imię"}
                errorMessage={errors.name ? errors.name?.message : ""}
                inputContainerStyle={{
                  backgroundColor: theme.colors.grey5,
                  borderColor:
                    focusInput === "name"
                      ? theme.colors.secondary
                      : theme.colors.grey5,
                  borderWidth: 2,
                  borderBottomWidth: 2,
                }}
              />
            )}
            name='name'
          />

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
                  input3.current?.focus();
                }}
                ref={input2}
                onFocus={() => {
                  setFocusInput("surname");
                }}
                onBlur={() => {
                  setFocusInput("");
                }}
                onChangeText={onChange}
                value={value}
                label={"Nazwisko"}
                keyboardType='default'
                placeholder={"Wprowadź swoje nazwisko"}
                errorMessage={errors.surname ? errors.surname?.message : ""}
                inputContainerStyle={{
                  backgroundColor: theme.colors.grey5,
                  borderColor:
                    focusInput === "surname"
                      ? theme.colors.secondary
                      : theme.colors.grey5,
                  borderWidth: 2,
                  borderBottomWidth: 2,
                }}
              />
            )}
            name='surname'
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
                  setFocusInput("phone");
                }}
                onBlur={() => {
                  setFocusInput("");
                }}
                onChangeText={onChange}
                value={value}
                label={"Telefon"}
                keyboardType='default'
                placeholder={"Wprowadź swój numer telefonu"}
                errorMessage={errors.phone ? errors.phone?.message : ""}
                inputContainerStyle={{
                  backgroundColor: theme.colors.grey5,
                  borderColor:
                    focusInput === "phone"
                      ? theme.colors.secondary
                      : theme.colors.grey5,
                  borderWidth: 2,
                  borderBottomWidth: 2,
                }}
              />
            )}
            name='phone'
          />
          <Animated.View style={animatedMarginTop}>
            <ButtonSubmit
              onPress={handleSubmit(onSubmit)}
              title='Zapisz'
              loading={loading}
            />
          </Animated.View>
        </Animated.View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SettingsProfileScreen;
