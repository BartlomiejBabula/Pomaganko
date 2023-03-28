import { createTheme } from "@rneui/themed";

export const theme = createTheme({
  lightColors: {
    primary: "#a2d2ff",
    secondary: "#284b63",
    grey3: "#777",
    grey4: "#f1f1f1",
    grey5: "#f7f7f7",
    success: "#a2d2ff",
  },
  darkColors: {
    primary: "#121212",
  },
  mode: "light",

  components: {
    Button: {
      raised: true,
    },

    Icon: () => ({
      containerStyle: {
        borderRadius: 28,
      },
    }),

    Text: () => ({
      h4Style: { fontWeight: "700", fontSize: 20 },
    }),

    Input: () => ({
      placeholderTextColor: "#768593",
      autoCapitalize: "none",
      autoCorrect: false,
      cursorColor: theme.lightColors?.secondary,
      containerStyle: {
        paddingHorizontal: 0,
        marginTop: 5,
      },
      errorStyle: {
        fontSize: 12,
        marginTop: 3,
        marginLeft: 6,
        color: theme.lightColors?.error,
      },
      labelStyle: {
        fontSize: 13,
        marginLeft: 5,
        marginBottom: 5,
        fontWeight: "normal",
      },
      inputStyle: {
        fontSize: 15,
        paddingHorizontal: 16,
        paddingVertical: 12,
      },
      inputContainerStyle: {
        borderRadius: 15,
        backgroundColor: theme.lightColors?.grey4,
        borderBottomWidth: 0,
      },
    }),

    Divider: () => ({
      color: theme.lightColors?.grey4,
    }),
  },
});
