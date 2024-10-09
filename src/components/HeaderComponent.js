// HeaderComponent.js
import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { appColors } from "../constants/appColors";

const HeaderComponent = ({ openDrawer }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

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
    width: 100,
  },
  menuButton: {
    padding: 10,
    marginLeft: "auto",
    borderRadius: 20,
    borderColor: appColors.gray1,
    borderWidth: 1,
  },
});

export default HeaderComponent;
