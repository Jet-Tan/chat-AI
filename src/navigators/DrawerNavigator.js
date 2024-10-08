import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
      }}
      drawerContent={(props) => <DrawerCustom {...props} />}
    >
      <Drawer.Screen name="HomeNavigator" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
