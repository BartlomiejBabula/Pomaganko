import { createTheme } from "@rneui/themed";

export const theme = createTheme({
  lightColors: {
    primary: "#a2d2ff",
    secondary: "#233c53",
    grey5: "#f6f6f6",
    grey3: "grey",
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
      style: { color: "#233c53" },
    }),

    SearchBar: () => ({
      lightTheme: true,
      round: true,
      placeholderTextColor: "#768593",
      containerStyle: {
        width: "70%",
        backgroundColor: "transparent",
        borderTopWidth: 0,
        borderBottomWidth: 0,
        padding: 0,
      },
      inputContainerStyle: {
        height: 42,
        backgroundColor: "#F5F5F5",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 1,
      },
      inputStyle: {
        fontSize: 16,
      },
      searchIcon: { size: 22 },
      cursorColor: "#2a4865",
    }),

    Input: () => ({
      placeholderTextColor: "#768593",
      autoCapitalize: "none",
      autoCorrect: false,
      cursorColor: "#2a4865",
      containerStyle: {
        paddingHorizontal: 0,
        marginTop: 5,
      },
      errorStyle: { marginTop: 6, marginLeft: 6, color: "#ff5555" },
      labelStyle: {
        fontSize: 15,
        marginBottom: 10,
        color: "#2a4865",
        fontWeight: "normal",
      },
      inputStyle: {
        fontSize: 16,
        paddingHorizontal: 16,
        color: "#2a4865",
        paddingVertical: 12,
      },
      inputContainerStyle: {
        borderRadius: 4,
        backgroundColor: theme.lightColors?.grey5,
        borderBottomWidth: 0,
      },
    }),
  },
});
