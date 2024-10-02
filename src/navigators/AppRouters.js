// AppRouters.js
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ChatNavigator from "./ChatNavigator";
import AuthNavigator from "./AuthNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authSelector, addAuth } from "../redux/reducers/authReducer"; // Đảm bảo bạn import đúng action `addAuth`
import firebase from "firebase/compat/app";
import "firebase/compat/auth"; // Import các module cần thiết của Firebase

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

// Initialize Firebase only once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AppRouters = () => {
  const [loading, setLoading] = useState(true); // Trạng thái tải
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  // Kiểm tra đăng nhập từ AsyncStorage
  const checkLogin = async () => {
    try {
      const res = await AsyncStorage.getItem("auth"); // Trực tiếp sử dụng AsyncStorage
      if (res) {
        dispatch(addAuth(JSON.parse(res)));
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ AsyncStorage:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <>{auth.accesstoken ? <ChatNavigator /> : <AuthNavigator />}</>;
};

export default AppRouters;
