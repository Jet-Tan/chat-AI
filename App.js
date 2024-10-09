import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import CustomToast from "./src/components/CustomToast";
import { StatusBar } from "react-native";
import { appColors } from "./src/constants/appColors";
import TabNavigator from "./src/navigators/TabNavigator";
import AppRouters from "./src/navigators/AppRouters";
import MainNavigator from "./src/navigators/MainNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar backgroundColor={appColors.white} barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1, marginBottom: -35 }}>
          <NavigationContainer>
            <MainNavigator />
            <CustomToast />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
