import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native"; // Import DrawerActions

import HeaderComponent from "../../components/HeaderComponent";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <HeaderComponent openDrawer={() => navigation.openDrawer()} />
    </View>
  );
};

export default HomeScreen;
