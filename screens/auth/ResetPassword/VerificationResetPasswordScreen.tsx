import { useState, useRef } from "react";
import { Input, Icon, Text, useTheme } from "@rneui/themed";
import { TouchableOpacity, View, SafeAreaView, TextInput } from "react-native";
import { VerificationResetPasswordParams } from "../../../routes/types";
import { useForm, Controller } from "react-hook-form";
import type { Input as TypeInput } from "@rneui/base";
import ButtonSubmit from "../../../components/ButtonSubmit";

type FormData = {
  PIN1: string;
  PIN2: string;
  PIN3: string;
  PIN4: string;
  PIN5: string;
};

type inputListElementParams = {
  name: "PIN1" | "PIN2" | "PIN3" | "PIN4" | "PIN5";
  ref: any;
};

const VerificationResetPasswordScreen = ({
  navigation,
}: VerificationResetPasswordParams) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { theme } = useTheme();

  const inputList: inputListElementParams[] = [
    { name: "PIN1", ref: useRef<TextInput & TypeInput>(null) },
    { name: "PIN2", ref: useRef<TextInput & TypeInput>(null) },
    { name: "PIN3", ref: useRef<TextInput & TypeInput>(null) },
    { name: "PIN4", ref: useRef<TextInput & TypeInput>(null) },
    { name: "PIN5", ref: useRef<TextInput & TypeInput>(null) },
  ];

  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      PIN1: "",
      PIN2: "",
      PIN3: "",
      PIN4: "",
      PIN5: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    setError(true);
    navigation.navigate("ChangePassword");
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
        <Text h2>Weryfikacja</Text>
        <Text h2>Email</Text>
        <Text
          style={{
            color: theme.colors.grey3,
            fontSize: 14,
            marginTop: 70,
            marginBottom: 30,
            marginRight: "17%",
          }}
        >
          Wprowadź przesłany mailem kod:
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {inputList.map((input, i) => (
            <Controller
              key={i}
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  ref={input.ref}
                  onPressIn={() => {
                    resetField(input.name);
                  }}
                  onChangeText={onChange}
                  onChange={(e) => {
                    //  if (e.nativeEvent.text.length >= 1) pin2.current?.focus();
                    if (e.nativeEvent.text.length >= 1 && i < 4)
                      inputList[i + 1].ref.current?.focus();
                    if (e.nativeEvent.text.length === 0 && i > 0)
                      inputList[i - 1].ref.current?.focus();
                  }}
                  value={value}
                  maxLength={1}
                  inputStyle={{ fontSize: 26, textAlign: "center" }}
                  keyboardType='number-pad'
                  containerStyle={{ width: 50 }}
                />
              )}
              name={input.name}
            />
          ))}
        </View>
        <Text
          style={{
            textAlign: "center",
            marginBottom: 30,
            color: theme.colors.error,
            fontSize: 13,
          }}
        >
          {error && "Wprowadzony numer jest błędny"}
        </Text>
        <TouchableOpacity
          onPress={() => {
            console.log("SENT");
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
            Wyślij email ponownie
          </Text>
        </TouchableOpacity>
        <ButtonSubmit
          onPress={handleSubmit(onSubmit)}
          title='Weryfikuj'
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default VerificationResetPasswordScreen;
