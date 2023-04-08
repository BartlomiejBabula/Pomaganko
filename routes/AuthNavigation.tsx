import SelectLocationScreen from "../screens/main/SelectLocation/SelectLocationScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginStackParamList } from "./types";
import FirstLoginScreen from "../screens/auth/FirstLogin/FirstLoginScreen";
import RegisterScreen from "../screens/auth/Register/RegisterScreen";
import ResetPasswordScreen from "../screens/auth/ResetPassword/ResetPasswordScreen";
import VerificationResetPasswordScreen from "../screens/auth/ResetPassword/VerificationResetPasswordScreen";
import ChangePasswordScreen from "../screens/auth/ResetPassword/ChangePasswordScreen";
import LoginScreen from "../screens/auth/Login/LoginScreen";

const AuthStack = createNativeStackNavigator<LoginStackParamList>();

export const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen
      name='Login'
      component={LoginScreen}
      options={{ animation: "slide_from_right" }}
    />
    <AuthStack.Screen
      name='Register'
      component={RegisterScreen}
      options={{ animation: "slide_from_right" }}
    />
    <AuthStack.Screen
      name='ResetPassword'
      component={ResetPasswordScreen}
      options={{ animation: "slide_from_right" }}
    />
    <AuthStack.Screen
      name='Verification'
      component={VerificationResetPasswordScreen}
      options={{ animation: "slide_from_right" }}
    />
    <AuthStack.Screen
      name='ChangePassword'
      component={ChangePasswordScreen}
      options={{ animation: "slide_from_right" }}
    />
    <AuthStack.Screen
      initialParams={{ location: "" }}
      name='FirstLogin'
      component={FirstLoginScreen}
      options={{ animation: "slide_from_right" }}
    />
    <AuthStack.Screen
      initialParams={{ location: "" }}
      name='SelectLocation'
      component={SelectLocationScreen}
      options={{ animation: "slide_from_right" }}
    />
  </AuthStack.Navigator>
);
