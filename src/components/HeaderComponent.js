// HeaderComponent.js
import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { appColors } from "../constants/appColors";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const HeaderComponent = ({ openDrawer }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        backgroundColor: appColors.white,
        borderBottomWidth: 1,
        borderColor: appColors.gray1,
        height: 100,
      }}
    >
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
          <View style={styles.circle}>
            <FontAwesome5 name="bars" size={18} color={appColors.gray} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  logo: {
    height: 40,
    width: 120,
  },
  menuButton: {
    marginLeft: "auto",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: appColors.gray1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
});

export default HeaderComponent;
