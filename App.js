import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import CustomToast from "./src/components/CustomToast";
import { StatusBar } from "react-native";
import { appColors } from "./src/constants/appColors";
import AppRouters from "./src/navigators/AppRouters";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={appColors.white} barStyle="dark-content" />
      <NavigationContainer>
        <AppRouters />
        <CustomToast />
      </NavigationContainer>
    </Provider>
  );
}
