import { View, Text, StyleSheet } from "react-native";
import React from "react";
import HeaderComponent from "../../components/HeaderComponent";
import { useNavigation } from "@react-navigation/native";
import { appColors } from "../../constants/appColors";

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <HeaderComponent openDrawer={() => navigation.openDrawer()} />
      <View style={styles.content}>
        <Text style={styles.title}>ProfileScreen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.blue1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center", // Căn giữa theo chiều ngang
  },
  title: {
    fontSize: 18,
    color: "#333",
  },
});

export default ProfileScreen;
