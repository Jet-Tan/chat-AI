import { View, Text, StyleSheet } from "react-native";
import React from "react";
import HeaderComponent from "../../components/HeaderComponent";
import { useNavigation } from "@react-navigation/native";
import { appColors } from "../../constants/appColors";

const GetRPScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <HeaderComponent openDrawer={() => navigation.openDrawer()} />
      <Text>GetRPScreen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.blue1,
  },
});
export default GetRPScreen;
