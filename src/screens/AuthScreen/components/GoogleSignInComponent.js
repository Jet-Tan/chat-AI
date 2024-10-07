import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { appColors } from "../../../constants/appColors";
import { FontAwesome } from "@expo/vector-icons";
// Kích hoạt hoàn thành phiên
WebBrowser.maybeCompleteAuthSession();

const GoogleSignInComponent = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "647136100868-mnsu829dhnjosko9l3jtbqi7010khor2.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      handleSignedInUser(id_token);
    } else {
      handleSignedOutUser();
    }
  }, [response]);

  const handleSignedInUser = async (idToken) => {
    try {
      // Thực hiện AJAX call đến server của bạn
      const userdata = { idToken: idToken };

      const response = await fetch("/api/account.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tp: "account",
          account_action: "loginUser",
          login_type: "fit",
          userdata: userdata,
        }),
      });

      const result = await response.json();
      if (result.success) {
        Alert.alert("Success", result.success.message);
        // Thực hiện chuyển hướng hoặc hành động khác
      } else if (result.errors) {
        Alert.alert("Error", result.errors.message);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Thử lại bằng phương thức đăng nhập khác hoặc liên hệ Chatbot Riokupon để được hỗ trợ."
      );
    }
  };

  const handleSignedOutUser = () => {
    // Có thể thực hiện các hành động khác khi người dùng đăng xuất
  };

  const signInWithGoogle = async () => {
    try {
      promptAsync();
    } catch (error) {
      Alert.alert("Error", "Lỗi khi đăng nhập bằng Google");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={signInWithGoogle}
        disabled={!request}
      >
        <Text style={styles.buttonText}>
          <FontAwesome name="google" size={20} color={appColors.orange} /> Đăng
          nhập bằng Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: appColors.white,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    height: 40,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
  },
});

export default GoogleSignInComponent;
