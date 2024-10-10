import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import CustomToast from "./src/components/CustomToast";
import { appColors } from "./src/constants/appColors";
import AppRouters from "./src/navigators/AppRouters";
import store from "./src/redux/store";

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
