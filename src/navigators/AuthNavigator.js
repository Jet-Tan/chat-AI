import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "../screens/AuthScreen/LoginScreen";
import Verification from "../screens/AuthScreen/Verification";
import VerificationFB from "../screens/AuthScreen/VerificationFB";

import IntroScreen from "../screens/AuthScreen/IntroScreen";

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        gestureEnabled: true,
        transitionSpec: {
          open: { animation: "timing", config: { duration: 300 } },
          close: { animation: "timing", config: { duration: 300 } },
        },
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="IntroScreen" component={IntroScreen} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="VerificationFB" component={VerificationFB} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
