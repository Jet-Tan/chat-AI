import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import AppRouters from "./src/navigators/AppRouters";
import CustomToast from "./src/components/CustomToast";
import TermsOfUse from "./src/screens/TermScreen/TermsOfUse";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <TermsOfUse />
          <CustomToast />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
