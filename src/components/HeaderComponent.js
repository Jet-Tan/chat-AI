import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { appColors } from "../constants/appColors";

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
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileImageContainer}>
          <Image
            source={{
              uri: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-005.jpg",
            }}
            style={styles.profileImage}
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
    alignItems: "center",
  },
  logo: {
    height: 50,
    width: 140,
  },
  profileImageContainer: {
    marginLeft: "auto",
    marginRight: 10,
  },
  menuButton: {
    marginLeft: 0,
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderColor: appColors.gray1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 75,
    resizeMode: "contain",
  },
});

export default HeaderComponent;
