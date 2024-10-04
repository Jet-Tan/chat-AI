import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { appInfo } from "../../constants/appInfos";
import { appColors } from "../../constants/appColors";
import { useNavigation } from "@react-navigation/native";

const IntroScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://img.riokupon.com/upload/images/2024/04/04/56c31b0335bcf6427711b2c0a4e466a6.png",
        }}
        style={styles.introWrapper}
        resizeMode="cover"
      ></ImageBackground>

      <TouchableOpacity
        style={styles.getStartedBtn}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.getStartedText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    alignItems: "center",
  },
  introWrapper: {
    width: "100%",
    height: appInfo.sizes.HEIGHT * 0.8, // Chiều cao của ảnh nền
  },
  getStartedBtn: {
    width: "90%",
    backgroundColor: appColors.orange,
    borderRadius: 5,
    paddingVertical: 15,
    marginTop: 50,
  },
  getStartedText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default IntroScreen;
