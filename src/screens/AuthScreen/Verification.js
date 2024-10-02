import React, { useState, useRef } from "react";
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

const Verification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef([]);

  const handleInputChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleResendOTP = () => {
    if (countdown > 0) return;
    Alert.alert(
      "Gửi lại OTP",
      "Mã OTP mới đã được gửi đến điện thoại của bạn."
    );
    setCountdown(60);
  };

  const handleVerifyOTP = () => {
    let enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      Alert.alert("Lỗi", "Vui lòng nhập đủ 6 ký tự OTP.");
    } else {
      Alert.alert("Xác minh", "Mã OTP của bạn là: " + enteredOtp);
    }
  };

  const handleClearOTP = () => {
    setOtp(new Array(6).fill(""));
    inputRefs.current[0].focus();
  };

  React.useEffect(() => {
    if (countdown === 0) return;
    const timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Xác minh số điện thoại (Zalo)</Text>
        <Text style={styles.description}>
          Nhập mã OTP được gửi đến{" "}
          <Text style={styles.highlight}>+84 123456789</Text>
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              value={value}
              onChangeText={(text) => handleInputChange(text, index)}
              keyboardType="number-pad"
              maxLength={1}
              ref={(ref) => (inputRefs.current[index] = ref)}
              placeholder="-"
            />
          ))}

          <TouchableOpacity style={styles.clearButton} onPress={handleClearOTP}>
            <Text style={styles.clearText}>Xóa</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
          <Text style={styles.verifyText}>Xác minh & Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleResendOTP} disabled={countdown > 0}>
          <Text style={styles.resendText}>
            Không nhận được OTP?{" "}
            <Text style={styles.resendLink}>
              {countdown > 0 ? `Chờ ${countdown} giây` : "Gửi lại OTP"}
            </Text>
          </Text>
        </TouchableOpacity>
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
