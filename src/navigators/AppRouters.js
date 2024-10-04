import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ChatNavigator from "./ChatNavigator";
import AuthNavigator from "./AuthNavigator";

import { authSelector, addAuth } from "../redux/reducers/authReducer";
import axios from "axios"; // Import axios
import LoadingIndicator from "../components/LoadingIndicator";
import * as SecureStore from "expo-secure-store";

const AppRouters = () => {
  const [loading, setLoading] = useState(true);
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const [cookie, setCookie] = useState("");

  // Hàm lấy us_id từ cookie
  const getUsIdFromCookies = async () => {
    try {
      const userCookie = await SecureStore.getItemAsync("user_cookie");

      if (userCookie) {
        const cookies = JSON.parse(userCookie);
        const usIdMatch = cookies.find((cookie) => cookie.startsWith("us_id="));
        if (usIdMatch) {
          const usId = usIdMatch.split("=")[1].split(";")[0];
          console.log("Giá trị us_id:", usId);
          setCookie(usId);
        }
      } else {
        console.log("Không có cookie nào được lưu.");
      }
    } catch (error) {
      console.error("Lỗi khi truy xuất us_id:", error);
      Alert.alert(
        "Lỗi",
        "Có vấn đề xảy ra khi kiểm tra thông tin đăng nhập. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsIdFromCookies();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return <>{cookie ? <ChatNavigator /> : <AuthNavigator />}</>;
};
export default AppRouters;
