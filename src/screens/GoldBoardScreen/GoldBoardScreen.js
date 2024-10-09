import { View, Text } from "react-native";
import React from "react";
import HeaderComponent from "../../components/HeaderComponent";
import { useNavigation } from "@react-navigation/native";

const GoldBoardScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <HeaderComponent openDrawer={() => navigation.openDrawer()} />
      <Text>GoldBoardScreen</Text>
    </View>
  );
};

export default GoldBoardScreen;
