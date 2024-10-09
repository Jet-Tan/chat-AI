import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native"; // Import DrawerActions

import HeaderComponent from "../../components/HeaderComponent";
import { appColors } from "../../constants/appColors";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <HeaderComponent openDrawer={() => navigation.openDrawer()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.blue1,
  },
});
export default HomeScreen;
