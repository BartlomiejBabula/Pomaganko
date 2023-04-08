import { useState, useEffect } from "react";
import { SafeAreaView, View, TouchableOpacity, ScrollView } from "react-native";
import { Text, Button, useTheme, Input, Divider, Icon } from "@rneui/themed";
import Animated, { Layout } from "react-native-reanimated";

import { useDispatch } from "react-redux";
import { RegisterScreenParams } from "../../../routes/types";
import ButtonSubmit from "../../../components/ButtonSubmit";

const RegisterScreen = ({ navigation }: RegisterScreenParams) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [loadingBttn, setLoadingBttn] = useState(false);
  const [focusInput, setFocusInput] = useState("");

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
      <View style={{ marginHorizontal: "5%", alignItems: "center" }}>
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
            marginTop: 40,
            marginBottom: 30,
            marginRight: "20%",
          }}
        >
          Wprowadź swoje dane w celu rejestracji, na wprowadzony adres email
          zostanie wysłany link aktywacyjny. Pamiętaj aby wybrać poprawną role
          użytkownika.
        </Text>
      </View>
      <ScrollView style={{ marginHorizontal: "5%" }}>
        <Input
          onFocus={() => {
            setFocusInput("email");
          }}
          onBlur={() => {
            setFocusInput("");
          }}
          placeholder='Email'
          keyboardType='visible-password'
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
        <Input
          onFocus={() => {
            setFocusInput("password");
          }}
          onBlur={() => {
            setFocusInput("");
          }}
          placeholder='Hasło'
          secureTextEntry={true}
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
        <Input
          onFocus={() => {
            setFocusInput("rePassword");
          }}
          onBlur={() => {
            setFocusInput("");
          }}
          placeholder='Powtórz hasło'
          secureTextEntry={true}
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
        <Input
          onFocus={() => {
            setFocusInput("rePassword");
          }}
          onBlur={() => {
            setFocusInput("");
          }}
          placeholder='Powtórz hasło'
          secureTextEntry={true}
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
        <Input
          onFocus={() => {
            setFocusInput("rePassword");
          }}
          onBlur={() => {
            setFocusInput("");
          }}
          placeholder='Powtórz hasło'
          secureTextEntry={true}
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
        <ButtonSubmit
          // onPress={handleSubmit(onSubmit)}
          title='Zarejestruj'
          uppercase
          loading={loadingBttn}
          containerStyle={{ marginBottom: 20 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
