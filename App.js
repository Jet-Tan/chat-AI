import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import AppRouters from "./src/navigators/AppRouters";
import CustomToast from "./src/components/CustomToast";
import { StatusBar } from "react-native";
import { appColors } from "./src/constants/appColors";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar backgroundColor={appColors.white} barStyle="dark-content" />
        <NavigationContainer>
          <AppRouters />
          <CustomToast />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
