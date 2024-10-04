import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { appColors } from "../../constants/appColors";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { addAuth } from "../../redux/reducers/authReducer";
import { useDispatch } from "react-redux";
const Verification = ({ route, navigation }) => {
  const { email, phone } = route.params;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [count, setCount] = useState(60);
  const [isDisabled, setIsDisabled] = useState(false);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          setIsDisabled(false);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Chuyển focus tới ô tiếp theo nếu nhập đủ 1 ký tự
    if (text.length === 1 && index < otp.length - 1) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 100);
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      Alert.alert("Thông báo", "Vui lòng nhập đủ 6 ký tự OTP");
      return;
    }
    const formData = new URLSearchParams();
    formData.append("tp", "account");
    formData.append("account_action", "loginUser");
    formData.append("login_type", "epv");
    formData.append("email", email || ""); // Nếu email null thì gửi chuỗi rỗng
    formData.append("phone", phone || ""); // Nếu phone null thì gửi chuỗi rỗng
    formData.append("otp", otpValue);

    try {
      const response = await axios.post(
        "https://account.riokupon.com/api/account.php",
        formData.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("check", response);
      if (response.data.errors) {
        Alert.alert("Thông báo", response.data.errors.message);
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
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Thông báo", "Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const resendOtp = async () => {
    setIsDisabled(true);
    try {
      const response = await axios.post(
        "https://account.riokupon.com/api/account.php",
        {
          tp: "account",
          account_action: "loginUser",
          login_type: "ep",
          email: email || undefined,
          phone: phone || undefined,
        }
      );

      if (response.data.errors) {
        Alert.alert("Thông báo", response.data.errors.message);
      } else if (response.data.success) {
        Alert.alert("Thông báo", "Mã OTP đã được gửi lại!");
        setCount(60); // Reset lại thời gian đếm
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Thông báo", "Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };
  const handleClearOTP = () => {
    setOtp(new Array(6).fill(""));
    inputRefs.current[0].focus();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Xác minh {phone ? "Số điện thoại (Zalo)" : "Email"}
        </Text>
        <Text style={styles.description}>
          Nhập mã OTP được gửi đến{" "}
          <Text style={styles.highlight}>{phone ? phone : email}</Text>
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              value={value}
              onChangeText={(text) => handleOtpChange(text, index)}
              keyboardType="number-pad"
              maxLength={1}
              ref={(el) => (inputRefs.current[index] = el)}
              placeholder="-"
            />
          ))}

          <TouchableOpacity style={styles.clearButton} onPress={handleClearOTP}>
            <Text style={styles.clearText}>Xóa</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.verifyButton} onPress={handleSubmit}>
          <Text style={styles.verifyText}>Xác minh & Đăng nhập</Text>
        </TouchableOpacity>

        <Text style={styles.resendText}>
          Không nhận được OTP?{" "}
          <TouchableOpacity onPress={resendOtp} disabled={count > 0}>
            <Text style={styles.resendLink}>
              {count > 0 ? `Chờ ${count} giây` : "Gửi lại OTP"}
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: appColors.blue1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  highlight: {
    fontWeight: "bold",
    color: appColors.gray,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: appColors.gray1,
    borderRadius: 5,
    width: 45,
    height: 50,
    textAlign: "center",
    marginHorizontal: 5,
    fontSize: 18,
    backgroundColor: appColors.gray2,
  },
  verifyButton: {
    backgroundColor: "#FFC107",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  verifyText: {
    color: appColors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  clearButton: {
    backgroundColor: appColors.orange,
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  clearText: {
    color: appColors.white,
    fontSize: 16,
  },
  resendText: {
    fontSize: 16,
    color: appColors.gray,
  },
  resendLink: {
    color: appColors.blue,
    fontWeight: "bold",
  },
});

export default Verification;
