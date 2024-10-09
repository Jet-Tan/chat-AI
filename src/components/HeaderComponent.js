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
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: appColors.white }}>
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
            <FontAwesome5 name="bars" size={14} color={appColors.gray} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 60,
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
