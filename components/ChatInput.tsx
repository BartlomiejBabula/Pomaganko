import { useState, useEffect } from "react";
import { Input, Icon, useTheme } from "@rneui/themed";
import { TouchableOpacity, View } from "react-native";
import Animated, { Layout } from "react-native-reanimated";
import type { ScrollView } from "react-native";
import React from "react";
import { translate } from "../i18n/i18n";

type ChatInputParams = {
  scrollViewRef: React.RefObject<ScrollView>;
  isKeyboardVisible: boolean;
};

const ChatInput = ({ scrollViewRef, isKeyboardVisible }: ChatInputParams) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [animatedHeight, setAnimatedHeight] = useState<number>(42);
  const { theme } = useTheme();

  useEffect(() => {
    if (isKeyboardVisible) {
      setAnimatedHeight(65);
    } else {
      setAnimatedHeight(42);
    }
  }, [isKeyboardVisible]);

  return (
    <Animated.View layout={Layout.duration(100)}>
      <Input
        placeholder={translate.t("messages.inputPlaceholder")}
        onContentSizeChange={() => {
          scrollViewRef.current?.scrollToEnd({ animated: false });
        }}
        value={inputValue}
        onChangeText={setInputValue}
        multiline={true}
        containerStyle={{
          width: "90%",
          alignSelf: "center",
        }}
        inputContainerStyle={{
          maxHeight: !isKeyboardVisible && inputValue === "" ? 42 : 140,
        }}
        inputStyle={{
          textAlignVertical: "top",
          minHeight: animatedHeight,
        }}
        leftIcon={
          !isKeyboardVisible &&
          inputValue === "" && (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ marginLeft: 20 }}
                onPress={() => {
                  console.log("IMAGE");
                }}
              >
                <Icon
                  name='image'
                  size={22}
                  color={theme.colors.grey3}
                  type='material-community'
                />
              </TouchableOpacity>
            </View>
          )
        }
        rightIcon={
          <TouchableOpacity
            disabled={!inputValue ? true : false}
            style={{ marginRight: 10 }}
            onPress={() => {
              console.log("SEND");
            }}
          >
            <Icon
              name='send'
              size={22}
              disabledStyle={{ backgroundColor: "#f1f1f1" }}
              color={inputValue ? theme.colors.secondary : theme.colors.grey3}
              type='material-community'
            />
          </TouchableOpacity>
        }
        labelStyle={{ margin: 0, height: 0 }}
        errorStyle={{ margin: 0, height: 0 }}
      />
    </Animated.View>
  );
};

export default ChatInput;
