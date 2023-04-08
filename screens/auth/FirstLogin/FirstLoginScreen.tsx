import { useEffect } from "react";
import { SafeAreaView, ScrollView, View, Pressable } from "react-native";
import { Text, useTheme, Button, Icon, Input, Avatar } from "@rneui/themed";
import { FirstLoginScreenParams } from "../../../routes/types";
import { RootReducerType } from "../../../reducers/types";
import { useForm, Controller } from "react-hook-form";
import FormInput from "../../../components/FormInput";
import { translate } from "../../../i18n/i18n";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileAction } from "../../../actions/UserAction";

const schema: yup.ObjectSchema<FormData> = yup.object({
  email: yup
    .string()
    .email(translate.t("addOffer.input.email.errors.email"))
    .required(translate.t("addOffer.input.email.errors.required"))
    .min(8, translate.t("addOffer.input.email.errors.min"))
    .max(32, translate.t("addOffer.input.email.errors.max")),
  avatar: yup.string(),
  name: yup
    .string()
    .required("Imię jest wymagane")
    .min(2, "Minimalna długość znaków 2")
    .max(28, "Maksymalna długość znaków 28"),
  phone: yup
    .string()
    // regexr.com/6anqd
    .matches(/[5-9]{1}[0-9]{2}[0-9]{3}[0-9]{3}/, {
      message: "Niepoprawny numer telefonu",
      excludeEmptyString: true,
    }),
  location: yup.string(),
});

type FormData = {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  location?: string;
};

const FirstLoginScreen = ({ navigation, route }: FirstLoginScreenParams) => {
  const dispatch = useDispatch();
  let user = useSelector((state: RootReducerType) => state.user);
  const location = route.params?.location;
  const { theme } = useTheme();

  useEffect(() => {
    setValue("location", location);
  }, [location]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name ? user.name : "",
      email: user?.email ? user.email : "",
      avatar: user?.avatar ? user?.avatar : "",
      phone: "",
      location: location ? location : "",
    },
  });

  const onSubmit = (data: FormData) => {
    let updateUser = { ...data, isLogged: true };
    console.log(updateUser);
    dispatch(updateProfileAction(updateUser));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.white,
        paddingTop: 30,
      }}
    >
      <ScrollView style={{ paddingHorizontal: "5%", paddingTop: 20 }}>
        <Avatar
          title={user.name?.charAt(0)}
          source={{
            uri: user.avatar,
          }}
          containerStyle={{
            backgroundColor: theme.colors.secondary,
            borderWidth: 3,
            borderColor: theme.colors.white,
            alignSelf: "center",
          }}
          rounded
          size={"xlarge"}
        />
        <Text h4 style={{ marginTop: 30, marginBottom: 15 }}>
          Uzupełnij swoje dane
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              onChange={onChange}
              value={value}
              label={"Imię"}
              placeholder={"Wpisz swoje imię"}
              error={errors.name ? true : false}
              errorMessage={errors.name?.message || ""}
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
            <FormInput
              onChange={onChange}
              value={value}
              label={"Email"}
              placeholder={"Wpisz adress email"}
              error={errors.email ? true : false}
              errorMessage={errors.email?.message || ""}
            />
          )}
          name='email'
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Pressable
              onPress={() => {
                navigation.navigate("SelectLocation", {
                  location,
                  backLocation: "FirstLogin",
                });
              }}
            >
              <Input
                label={"Lokalizacja"}
                placeholder={translate.t(
                  "addOffer.input.localization.placeholder"
                )}
                disabled={true}
                disabledInputStyle={{ opacity: 1 }}
                value={value}
                errorMessage={!value ? errors.location?.message : ""}
                rightIcon={
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon
                      name='chevron-right'
                      size={32}
                      color={theme.colors.black}
                      type='material-community'
                      containerStyle={{ marginRight: 5 }}
                    />
                    {errors.location?.message && !value ? (
                      <Icon
                        containerStyle={{ marginRight: 10 }}
                        name='alert-circle-outline'
                        size={24}
                        color={theme.colors.error}
                        type='material-community'
                      />
                    ) : (
                      value && (
                        <Icon
                          containerStyle={{ marginRight: 10 }}
                          name='check-circle-outline'
                          size={24}
                          color={theme.colors.success}
                          type='material-community'
                        />
                      )
                    )}
                  </View>
                }
              />
            </Pressable>
          )}
          name='location'
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormInput
              onChange={onChange}
              value={value ? value : ""}
              keyboardType='phone-pad'
              label={"Numer telefonu"}
              placeholder={"Wpisz kontaktowy numer telefonu"}
              error={errors.phone && value !== "" ? true : false}
              errorMessage={errors.phone?.message || ""}
            />
          )}
          name='phone'
        />
        <Button
          title={"Wyślij"}
          uppercase
          onPress={handleSubmit(onSubmit)}
          raised={false}
          color={theme.colors.secondary}
          buttonStyle={{
            paddingVertical: 17,
            borderRadius: 15,
          }}
          containerStyle={{ marginTop: 20, marginBottom: 35 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FirstLoginScreen;
