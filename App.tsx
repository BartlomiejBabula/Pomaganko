import { StatusBar } from "expo-status-bar";
import Navigation from "./routes/Navigation";
import { ThemeProvider } from "@rneui/themed";
import { theme } from "./components/Theme";
import { Provider } from "react-redux";
import { store } from "./store/AppStore";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Navigation />
          <StatusBar style='auto' />
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
