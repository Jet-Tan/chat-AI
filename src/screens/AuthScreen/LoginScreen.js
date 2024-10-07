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
import { appColors } from "../../constants/appColors";
import { appInfo } from "../../constants/appInfos";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import LoadingOverlay from "../../components/LoadingOverlay";
import GoogleSignInComponent from "./components/GoogleSignInComponent";

const LoginScreen = () => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [refValue, setRefValue] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const slides = [
    require("../../assets/images/slide1.png"),
    require("../../assets/images/slide2.png"),
    require("../../assets/images/slide3.png"),
  ];

  const autoScroll = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(nextIndex);
    scrollViewRef.current.scrollTo({
      x: nextIndex * appInfo.sizes.WIDTH,
      animated: true,
    });
  };

  useEffect(() => {
    const interval = setInterval(autoScroll, 1500);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentIndex]);
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const regexPhone = /^\d{10,}$/;
  const handleLogin = () => {
    let phone = "";
    let email = "";

    if (regexEmail.test(userInput)) {
      email = userInput;
    } else if (regexPhone.test(userInput)) {
      phone = userInput;
    } else {
      Alert.alert(
        "Thông báo",
        "Vui lòng nhập vào email hoặc số điện thoại hợp lệ",
        [{ text: "Đóng" }]
      );
      return;
    }

    setLoading(true);

    const formData = new URLSearchParams();
    formData.append("tp", "account");
    formData.append("account_action", "loginUser");
    formData.append("login_type", "ep");
    formData.append("email", email);
    formData.append("phone", phone);

    axios
      .post(
        "https://account.riokupon.com/api/account.php",
        formData.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        const data = response.data;
        setLoading(false);
        if (data.errors) {
          if (data.errors.message === "register") {
            handleRegister();
          }

          Alert.alert("Thông báo", data.errors.message, [
            {
              text: "Đăng nhập bằng Facebook",
              onPress: () => {
                navigation.navigate("VerificationFB");
              },
            },
            { text: "Đóng", style: "cancel" },
          ]);
          return;
        }
        if (data.success) {
          if (phone) {
            navigation.navigate("Verification", { phone });
          } else {
            navigation.navigate("Verification", { email });
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Thông báo", "Đã xảy ra lỗi, vui lòng thử lại.", [
          { text: "Đóng" },
        ]);
      });
  };
  const handleRegister = async () => {
    let email = "",
      phone = "";
    if (regexEmail.test(userInput)) {
      email = userInput;
    } else if (regexPhone.test(userInput)) {
      phone = userInput;
    } else {
      showAlert("Vui lòng nhập vào email hoặc số điện thoại hợp lệ");
      return;
    }

    setLoading(true);
    const formData = new URLSearchParams();
    formData.append("tp", "account");
    formData.append("account_action", "loginUser");
    formData.append("login_type", "ep");
    formData.append("email", email);
    formData.append("phone", phone);
    try {
      const response = await axios.post(
        "https://account.riokupon.com/api/account.php",
        {
          tp: "account",
          account_action: "registerUser",
          register_type: "ep",
          email,
          phone,
        }
      );

      const data = response.data;
      setLoading(false);

      if (data.errors) {
        showAlert(data.errors.message);
      } else if (data.success) {
        await clearCache();
        showAlert(data.success.message);
        setTimeout(() => {
          // Chuyển đến trang giới thiệu sau khi đăng ký thành công
          // Ví dụ: navigation.navigate('IntroScreen');
        }, 1000);
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      setLoading(false);
    }
  };
  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: currentIndex === 0 ? "#fff8ee" : appColors.white,
          },
        ]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.select({ ios: 20, android: 20 })}
        >
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={(event) => {
              const slideIndex = Math.round(
                event.nativeEvent.contentOffset.x / appInfo.sizes.WIDTH
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

          <View style={styles.formContainer}>
            <View style={styles.formWrapper}>
              <View style={styles.formGroup}>
                <FontAwesome
                  name="user-circle-o"
                  size={26}
                  color={appColors.orange}
                  style={styles.icon}
                />
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
                  onPress={handleLogin}
                  accessibilityLabel="Bắt đầu"
                >
                  <Text style={styles.buttonText}>Bắt Đầu</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <GoogleSignInComponent />
            </View>
          </View>

          <LoadingOverlay visible={loading} />
        </KeyboardAvoidingView>
        <View style={styles.metaWrapper}>
          <Text style={styles.metaText}>
            Đã có tài khoản, đăng nhập bằng{"\n"}
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate("VerificationFB")}
            >
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
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselWrapper: {
    flex: 0.5,
  },
  slide: {
    width: appInfo.sizes.WIDTH,
    // height: appInfo.sizes.WIDTH * 1.1,
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
    bottom: -20,
    left: 16,
    right: 16,
    padding: 30,
    backgroundColor: appColors.white,
    borderRadius: 5,
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    color: appColors.gray,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 16,
    flex: 0.45,
  },
  formWrapper: {
    marginBottom: 16,
  },
  formGroup: {
    position: "relative",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    height: 60,
    borderColor: appColors.orange,
    justifyContent: "center",
    backgroundColor: appColors.white,
  },
  input: {
    height: 40,
    fontSize: 16,
    paddingLeft: 40,
  },
  icon: {
    position: "absolute",
    left: 10,
    top: 15,
  },
  metaWrapper: {
    paddingHorizontal: 16,
    flex: 0.2,
  },
  metaText: {
    fontSize: 16,
    color: appColors.gray,
    textAlign: "center",
  },
  linkText: {
    color: appColors.blue,
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    backgroundColor: appColors.orange,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: appColors.white,
    fontSize: 16,
    textAlign: "center",
  },
});

export default LoginScreen;
