import { View, Text } from "react-native";
import React from "react";
import HeaderComponent from "../../components/HeaderComponent";
import { useNavigation } from "@react-navigation/native";

const GetRPScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <HeaderComponent openDrawer={() => navigation.openDrawer()} />
      <Text>GetRPScreen</Text>
    </View>
  );
};

export default GetRPScreen;
