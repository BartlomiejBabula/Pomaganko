import { useState } from "react";
import { Input, Text, useTheme, Icon } from "@rneui/themed";
import type { KeyboardType } from "react-native";
import { View } from "react-native";

type InputParams = {
  onChange: any;
  value: string;
  label: string;
  multiline?: boolean;
  error: boolean;
  errorMessage: string;
  placeholder?: string;
  keyboardType?: KeyboardType;
  price?: boolean;
};

const FormInput = ({
  onChange,
  value,
  label,
  multiline = false,
  error,
  errorMessage,
  placeholder,
  keyboardType,
  price = false,
}: InputParams) => {
  const [inputFocused, setInputFocused] = useState(false);
  const { theme } = useTheme();

  return (
    <Input
      onFocus={() => {
        setInputFocused(true);
      }}
      onBlur={() => {
        setInputFocused(false);
      }}
      placeholder={placeholder}
      onChangeText={onChange}
      value={value}
      label={label}
      multiline={multiline}
      keyboardType={keyboardType}
      numberOfLines={multiline ? 5 : 1}
      maxLength={price ? 7 : 360}
      rightIcon={
        <View style={{ flexDirection: "row" }}>
          {price && <Text style={{ marginRight: 15, fontSize: 17 }}>zł</Text>}
          {error ? (
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
      errorMessage={error ? errorMessage : ""}
      inputStyle={{
        textAlignVertical: multiline ? "top" : "auto",
      }}
      inputContainerStyle={{
        backgroundColor: theme.colors.grey5,
        borderColor: inputFocused ? theme.colors.primary : theme.colors.grey5,
        borderWidth: 2,
        borderBottomWidth: 2,
      }}
    />
  );
};

export default FormInput;
