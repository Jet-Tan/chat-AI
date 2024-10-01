import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableNativeFeedback,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import Swiper from "react-native-swiper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [refValue, setRefValue] = useState("");
  // const navigation = useNavigation();
  const slides = [
    require("../../assets/images/slide1.png"),
    require("../../assets/images/slide2.png"),
    require("../../assets/images/slide3.png"),
  ];

  // Function to auto-scroll to the next slide
  const autoScroll = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(nextIndex);
    scrollViewRef.current.scrollTo({
      x: nextIndex * width,
      animated: true,
    });
  };

  useEffect(() => {
    const interval = setInterval(autoScroll, 1500);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentIndex]);

  // Xử lý khi nhấn vào nút "Bắt Đầu"
  const handleLogin = async () => {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const regexPhone = /^\d{10,}$/;
    let email = "",
      phone = "";

    if (regexEmail.test(userInput)) {
      email = userInput;
    } else if (regexPhone.test(userInput)) {
      phone = userInput;
    } else {
      Alert.alert(
        "Thông báo",
        "Vui lòng nhập vào email hoặc số điện thoại hợp lệ"
      );
      return;
    }

    // Gọi API đăng ký hoặc đăng nhập
    try {
      const response = await axios.post(
        "https://account.riokupon.com/api/account.php",
        {
          tp: "account",
          account_action: "loginUser",
          login_type: "ep",
          email: email,
          phone: phone,
        }
      );
      console.log("check", response);
      if (response.data.errors) {
        // Nếu có lỗi, hiển thị thông báo lỗi
        Alert.alert("Lỗi", response.data.errors.message);
      } else if (response.data.success) {
        Alert.alert("Thành công", response.data.success.message);
        // Điều hướng người dùng sang trang xác minh
        if (phone) {
          // Ví dụ: điều hướng với React Navigation
          // navigation.navigate('VerifyScreen', { phone });
        } else {
          // navigation.navigate('VerifyScreen', { email });
        }
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể kết nối tới máy chủ.");
    }
  };

  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={[
          styles.container,
          { backgroundColor: currentIndex === 0 ? "#fff8ee" : "#fff" },
        ]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={(event) => {
            const slideIndex = Math.round(
              event.nativeEvent.contentOffset.x / width
            );
            setCurrentIndex(slideIndex);
          }}
          style={styles.carouselWrapper}
        >
          {slides.map((slide, index) => (
            <View style={styles.slide} key={index}>
              {index === 0 && (
                <LinearGradient
                  colors={["#ffdb59", "#ff954e"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradient}
                />
              )}
              <ImageBackground
                source={slide}
                style={styles.image}
                imageStyle={{ resizeMode: "contain" }}
              >
                {index === 0 && (
                  <View style={styles.slideContent}>
                    <Text style={styles.title}>
                      Chào mừng bạn đến với{"\n"}Riokupon Vietnam
                    </Text>
                    <Text style={styles.subtitle}>
                      Ứng dụng mua sắm hoàn tiền thật 100%{"\n"}
                      Uy tín - An toàn
                    </Text>
                  </View>
                )}
              </ImageBackground>
            </View>
          ))}
        </ScrollView>

        {/* Form Container nằm ngay dưới phần Slide */}
        <View style={styles.formContainer}>
          <View style={styles.formWrapper}>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.input}
                placeholder="Nhập số điện thoại (Zalo) hoặc Email"
                keyboardType="default"
                accessibilityLabel="Nhập số điện thoại hoặc email"
                onChangeText={(text) => setUserInput(text)}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {}}
                accessibilityLabel="Bắt đầu"
              >
                <Text style={styles.buttonText}>Bắt Đầu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Phần văn bản mô tả điều khoản */}
        <View style={styles.metaWrapper}>
          <Text style={styles.metaText}>
            Đã có tài khoản, đăng nhập bằng{" "}
            <Text style={styles.linkText} onPress={() => {}}>
              Facebook Messenger
            </Text>
          </Text>
          <Text style={styles.metaText}>
            Khi nhấn bắt đầu đồng nghĩa với việc bạn chấp nhận{"\n"}
            <Text style={styles.linkText} onPress={() => {}}>
              điều khoản sử dụng{" "}
            </Text>
            và{" "}
            <Text style={styles.linkText} onPress={() => {}}>
              chính sách bảo mật{" "}
            </Text>
            của Riokupon
          </Text>
        </View>
      </KeyboardAvoidingView>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  carouselWrapper: {
    flex: 0.5,
  },
  slide: {
    width: width,
    height: width * 1.1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    marginTop: 40,
    width: "100%",
    height: "90%",
    borderRadius: 5,
    flex: 1,
  },
  slideContent: {
    position: "absolute",
    bottom: -70,
    left: 16,
    right: 16,
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject, // Bao phủ toàn bộ slide
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 16,
    flex: 0.4, // Chiếm 30% màn hình
  },
  formWrapper: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderColor: "#EE4D2D",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    color: "#333",
  },
  metaWrapper: {
    paddingHorizontal: 16,
    flex: 0.3,
  },
  metaText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  linkText: {
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    backgroundColor: "#EE4D2D",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default LoginScreen;
