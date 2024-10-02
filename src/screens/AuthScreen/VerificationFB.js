import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Linking,
  TouchableWithoutFeedback,
  Pressable,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard"; // Thay thế Clipboard từ react-native
import { appColors } from "../../constants/appColors";
import { appInfo } from "../../constants/appInfos";

const VerificationFB = () => {
  const [token, setToken] = useState("");
  const navigation = useNavigation();
  const openMessenger = () => {
    // Liên kết đến trang Messenger của Facebook
    const messengerUrl = "https://www.facebook.com/riokupon"; // URL đến Messenger

    Linking.canOpenURL(messengerUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(messengerUrl);
        } else {
          Alert.alert("Không thể mở Messenger", "Vui lòng kiểm tra lại URL.");
        }
      })
      .catch((err) => console.error("Đã xảy ra lỗi", err));
  };

  const readClipboard = async () => {
    const clipboardContent = await Clipboard.getStringAsync();
    if (clipboardContent && clipboardContent.length >= 30) {
      setToken(clipboardContent);
      handleLogin(clipboardContent);
    } else {
      Alert.alert("Thông báo", "Nội dung trong clipboard không hợp lệ.");
    }
  };

  // Hàm xử lý đăng nhập
  const handleLogin = (inputToken) => {
    if (inputToken.length >= 30) {
      Alert.alert("Đăng nhập thành công", `Token: ${inputToken}`);
    } else {
      Alert.alert("Lỗi", "Mã đăng nhập không hợp lệ. Vui lòng thử lại.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <Text style={styles.title}>Đăng nhập tài khoản Riokupon</Text>
          <Text style={styles.termsText}>
            Sử dụng tài khoản Facebook/Messenger để đăng nhập
          </Text>
          <Text style={styles.termsText}>
            Soạn tin nhắn login gửi{" "}
            <Text style={styles.linkText} onPress={openMessenger}>
              Messenger Riokupon
            </Text>{" "}
            để nhận mã tài khoản
          </Text>

          <View style={styles.inputContainer}>
            <Text>Mã tài khoản:</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={token}
                onChangeText={setToken}
                placeholder="Nhập mã đăng nhập tại đây"
                secureTextEntry={true}
              />
              <TouchableOpacity
                onPress={readClipboard}
                style={styles.pasteButton}
              >
                <Text style={{ color: "blue" }}>Dán</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.linkText}>hướng dẫn nhận mã tài khoản</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLogin(token)}
            style={styles.buttonLogin}
          >
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>

          <Text style={styles.altLoginText}>
            Đăng nhập bằng{" "}
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              Email/Số điện thoại
            </Text>
          </Text>

          <Text style={styles.termsText}>
            Khi nhấn bắt đầu đồng nghĩa với việc bạn chấp nhận{" "}
            <Text style={styles.linkText}>điều khoản sử dụng</Text> và{" "}
            <Text style={styles.linkText}>chính sách bảo mật</Text> của Riokupon
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: appColors.blue1,
  },
  loginBox: {
    width: appInfo.sizes.WIDTH,
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginVertical: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    borderColor: appColors.gray1,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 10,
  },
  pasteButton: {
    padding: 10,
  },
  buttonLogin: {
    backgroundColor: appColors.blue,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  altLoginText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
  },
  linkText: {
    color: "blue",
  },
  termsText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
  },
});

export default VerificationFB;
