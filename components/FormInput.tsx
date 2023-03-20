import { useState } from "react";
import { Input, Text, useTheme } from "@rneui/themed";
import type { KeyboardType } from "react-native";

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
        price && <Text style={{ marginRight: 10, fontSize: 17 }}>zł</Text>
      }
      errorMessage={error ? errorMessage : ""}
      inputStyle={{
        textAlignVertical: multiline ? "top" : "auto",
        paddingVertical: 12,
      }}
      inputContainerStyle={{
        borderColor: error
          ? theme.colors.error
          : inputFocused
          ? theme.colors.secondary
          : value
          ? theme.colors.primary
          : theme.colors.grey5,
        borderBottomWidth: 2,
      }}
    />
  );
};

export default FormInput;
