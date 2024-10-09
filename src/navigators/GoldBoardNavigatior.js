import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import GoldBoardScreen from "../screens/GoldBoardScreen/GoldBoardScreen";

const GoldBoardNaigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="GoldBoardScreen" component={GoldBoardScreen} />
    </Stack.Navigator>
  );
};

export default GoldBoardNaigator;
