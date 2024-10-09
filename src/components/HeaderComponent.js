// HeaderComponent.js
import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { appColors } from "../constants/appColors";
import { useNavigation } from "@react-navigation/native";

const HeaderComponent = ({ openDrawer }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        accessibilityLabel="Menu"
        onPress={openDrawer}
      >
        <FontAwesome5 name="bars" size={18} color={appColors.gray} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 50,
    width: "100%",
    backgroundColor: appColors.white,
    borderBottomWidth: 1,
    borderColor: appColors.gray1,
    justifyContent: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    height: 40,
    width: 120,
  },
  menuButton: {
    padding: 10,
    marginLeft: "auto",
    borderRadius: 20,
    borderColor: appColors.gray1,
    borderWidth: 2,
    // borderRadius: "50%",
  },
});

export default HeaderComponent;
