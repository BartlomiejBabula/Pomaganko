import { StatusBar } from "expo-status-bar";
import Navigation from "./components/Navigation";
import { ThemeProvider } from "@rneui/themed";
import { theme } from "./styles/Theme";
import { Provider } from "react-redux";
import { store } from "./store/AppStore";

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Navigation />
        <StatusBar style='auto' />
      </ThemeProvider>
    </Provider>
  );
}
