import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "../screens/AuthScreen/LoginScreen";
import Verification from "../screens/AuthScreen/Verification";
import VerificationFB from "../screens/AuthScreen/VerificationFB";

import IntroScreen from "../screens/AuthScreen/IntroScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
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
