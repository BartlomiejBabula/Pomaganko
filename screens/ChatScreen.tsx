import {
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Keyboard,
} from "react-native";
import { useRef, useEffect, useState } from "react";
import { Text, Avatar, useTheme, Icon, Divider } from "@rneui/themed";
import { ChatScreenParams } from "../types";
import ChatInput from "../components/ChatInput";
import { translate } from "../i18n";

const testMessages = [
  {
    sender: "User",
    message:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi dignissimos natus laudantium. Ipsam laboriosam quisquam quae quas nisi recusandae beatae necessitatibus, atque laborum neque vitae, cupiditate ex perferendis tenetur fuga. ",
  },
  { sender: "User", message: "dsjdhsakds" },
  { sender: "Sender", message: "dsjdhsakds" },
  { sender: "User", message: "dsjdhsakds" },
  {
    sender: "Sender",
    message:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi dignissimos natus laudantium. Ipsam laboriosam quisquam quae quas nisi recusandae beatae necessitatibus, atque laborum neque vitae, cupiditate ex perferendis tenetur fuga. ",
  },
  { sender: "User", message: "dsjdhsakds" },
  { sender: "Sender", message: "dsjdhsakds" },
  { sender: "User", message: "dsjdhsakds" },
  { sender: "User", message: "dsjdhsakds" },
  { sender: "Sender", message: "Dzięki" },
  { sender: "User", message: "Proszę o dane" },
  { sender: "Sender", message: "Wysyłałem przelew" },
  { sender: "User", message: "Dzięki" },
  { sender: "Sender", message: "Dozobaczenia" },
];

const ChatScreen = ({ navigation, route }: ChatScreenParams) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const { params } = route;
  const { theme } = useTheme();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
      <View
        style={{
          paddingTop: 35,
          paddingHorizontal: 15,
          paddingBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
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
          />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              marginBottom: 4,
            }}
          >
            {params.user}
          </Text>
          <Text style={{ fontSize: 14 }}>
            {translate.t("messages.topic")}: {params.topic}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CharityProfile", {
              name: params.user,
            });
          }}
        >
          <Avatar
            title={params.user.charAt(0)}
            containerStyle={{
              backgroundColor: theme.colors.secondary,
              borderRadius: 4,
            }}
            size={"medium"}
          />
        </TouchableOpacity>
      </View>
      <Divider />
      <ScrollView
        style={{ paddingTop: 10 }}
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef.current?.scrollToEnd({ animated: false });
        }}
      >
        {testMessages.map((message, key) => (
          <View
            key={key}
            style={{
              paddingHorizontal: 10,
              paddingBottom: key + 1 === testMessages.length ? 15 : 5,
              flexDirection: "row",
              justifyContent:
                message.sender === "User" ? "flex-end" : "flex-start",
            }}
          >
            <Text
              style={{
                maxWidth: "80%",
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor:
                  message.sender === "User"
                    ? theme.colors.secondary
                    : theme.colors.grey4,
                borderRadius: 15,
                borderBottomRightRadius: message.sender === "User" ? 3 : 15,
                borderBottomLeftRadius: message.sender === "User" ? 15 : 3,
                fontSize: 15,
                color:
                  message.sender === "User"
                    ? theme.colors.white
                    : theme.colors.black,
              }}
            >
              {message.message}
            </Text>
          </View>
        ))}
      </ScrollView>
      <ChatInput
        scrollViewRef={scrollViewRef}
        isKeyboardVisible={isKeyboardVisible}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
