import { useState } from "react";
import { Icon, Text, useTheme, Input } from "@rneui/themed";
import { TouchableOpacity, View, SafeAreaView } from "react-native";
import { ResetPasswordParams } from "../../../routes/types";
import * as yup from "yup";
import { translate } from "../../../i18n/i18n";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import ButtonSubmit from "../../../components/ButtonSubmit";

type FormData = {
  email: string;
};

const schema: yup.ObjectSchema<FormData> = yup.object({
  email: yup
    .string()
    .email(translate.t("addOffer.input.email.errors.email"))
    .required(translate.t("addOffer.input.email.errors.required"))
    .min(8, translate.t("addOffer.input.email.errors.min"))
    .max(32, translate.t("addOffer.input.email.errors.max")),
});

const ResetPasswordScreen = ({ navigation }: ResetPasswordParams) => {
  const [loading, setLoading] = useState(false);
  const [focusInput, setFocusInput] = useState(false);
  const { theme } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: FormData) => {
    setLoading(true);
    setLoading(false);
    navigation.navigate("Verification");
  };

  return (
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
        <Text h2>Odzyskiwanie</Text>
        <Text h2>Hasła</Text>
        <Text
          style={{
            color: theme.colors.grey3,
            fontSize: 14,
            marginTop: 50,
            marginBottom: 30,
            marginRight: "17%",
          }}
        >
          Wprowadź adres e-mail powiązany z twoim kontem, a my wyślemy ci
          wiadomość z kodem do resetowania hasła
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              onFocus={() => {
                setFocusInput(true);
              }}
              onBlur={() => {
                setFocusInput(false);
              }}
              onChangeText={onChange}
              value={value}
              label={translate.t("addOffer.input.email.title")}
              keyboardType='email-address'
              placeholder={translate.t("addOffer.input.email.placeholder")}
              errorMessage={errors.email ? errors.email?.message : ""}
              inputContainerStyle={{
                backgroundColor: theme.colors.grey5,
                borderColor: focusInput
                  ? theme.colors.secondary
                  : theme.colors.grey5,
                borderWidth: 2,
                borderBottomWidth: 2,
              }}
            />
          )}
          name='email'
        />
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text
            style={{
              color: theme.colors.grey3,
              fontSize: 14,
              textAlign: "center",
              marginTop: 20,
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
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
