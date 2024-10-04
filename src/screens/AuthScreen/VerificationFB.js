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
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { appColors } from "../../constants/appColors";
import { appInfo } from "../../constants/appInfos";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { addAuth, authSelector } from "../../redux/reducers/authReducer";
import LoadingOverlay from "../../components/LoadingOverlay";
const VerificationFB = () => {
  const [userToken, setUserToken] = useState("");
  const [isClipboardChecked, setIsClipboardChecked] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const [loading, setLoading] = useState(false);
  const openMessenger = () => {
    Linking.openURL("https://www.facebook.com/riokupon");
  };
  const openLink = () => {
    Linking.openURL(
      "https://riokupon.com/vn/blog/cach-dang-nhap-dang-ky-account-riokupon-bang-tai-khoan-facebook/2567"
    );
  };
  const checkClipboard = async () => {
    try {
      const pastedData = await Clipboard.getStringAsync();
      if (pastedData && pastedData.length >= 30) {
        setUserToken(pastedData);
        setIsClipboardChecked(true);
        submitLogin(pastedData);
      }
    } catch (error) {
      console.error("Lỗi khi đọc clipboard:", error);
    }
  };

  const submitLogin = async (token) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("tp", "account");
    formData.append("account_action", "loginUser");
    formData.append("login_type", "token");
    formData.append("token", token);

    try {
      const response = await axios.post(
        "https://account.riokupon.com/api/account.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      if (response.data.errors) {
        Alert.alert("Lỗi", response.data.errors.message);
      } else if (response.data.success) {
        const setCookieHeader = response.headers["set-cookie"];
        if (setCookieHeader) {
          const usIdMatch = setCookieHeader.toString().match(/us_id=([^;]+);/);
          const usIdValue = usIdMatch ? usIdMatch[1] : null;
          dispatch(addAuth(usIdValue));
          if (usIdValue) {
            await SecureStore.setItemAsync("user_cookie", usIdValue);
            console.log("Cookie đã được lưu vào SecureStore:", usIdValue);
          }
        }
      } else {
        throw new Error("Có lỗi xảy ra, vui lòng liên hệ Riokupon");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      Alert.alert("Lỗi", "Không thể xác thực mã đăng nhập");
    }
  };
  const clearUserCookie = async () => {
    try {
      const res = await SecureStore.deleteItemAsync("user_cookie");
      res && dispatch(addAuth(res));
      console.log("Cookie đã được xóa khỏi SecureStore.", res);
    } catch (error) {
      console.error("Lỗi khi xóa cookie:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <Text style={styles.title}>Đăng nhập tài khoản Riokupon</Text>
          <Text style={{ fontSize: 16 }}>
            Sử dụng tài khoản Facebook/Messenger để đăng nhập
          </Text>
          <Text style={styles.termsText}>
            Soạn tin nhắn login gửi{" "}
            <Text style={styles.linkText} onPress={openMessenger}>
              Messenger Riokupon
            </Text>{" "}
            để nhận mã tài khoản
          </Text>
          <TouchableOpacity onPress={clearUserCookie}>
            <Text>xoá</Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <Text>Mã tài khoản:</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={userToken}
                onChangeText={setUserToken}
                placeholder="Nhập mã đăng nhập tại đây"
                secureTextEntry={true}
                disabled={!userToken}
              />
              <TouchableOpacity
                onPress={checkClipboard}
                style={styles.pasteButton}
              >
                <Text>
                  Dán <FontAwesome name="clipboard" size={14} />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={openLink} style={{ alignSelf: "center" }}>
            <Text style={styles.linkText}>
              <FontAwesome name="facebook-f" size={16} color={appColors.blue} />{" "}
              hướng dẫn nhận mã tài khoản
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => submitLogin(userToken)}
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
        <LoadingOverlay visible={loading} />
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
    backgroundColor: appColors.white,
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
    alignItems: "center",
    marginVertical: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  pasteButton: {
    padding: 10,
    backgroundColor: appColors.gray2,
    marginRight: 5,
  },
  buttonLogin: {
    backgroundColor: appColors.yellow,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: appColors.white,
    fontSize: 16,
  },
  altLoginText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
  },
  linkText: {
    color: appColors.blue,
  },
  termsText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
  },
});

export default VerificationFB;
