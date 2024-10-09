import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import GetRPScreen from "../screens/GetRPScreen/GetRPScreen";

const GetRPNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="GetRPScreen" component={GetRPScreen} />
    </Stack.Navigator>
  );
};

export default GetRPNavigator;
