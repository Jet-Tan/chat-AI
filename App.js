import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ChatScreen from "./src/screens/ChatSreen/ChatScreen";
import LoginScreen from "./src/screens/AuthScreen/LoginScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <LoginScreen />
    </SafeAreaProvider>
  );
}
