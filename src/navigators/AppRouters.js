import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthNavigator from "./AuthNavigator";
import ChatNavigator from "./ChatNavigator";

import * as SecureStore from "expo-secure-store";
import LoadingIndicator from "../components/LoadingIndicator";
import { addAuth, authSelector } from "../redux/reducers/authReducer";

const AppRouters = () => {
  const [loading, setLoading] = useState(true);
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  console.log("dataaa", auth);
  // Hàm lấy us_id từ cookie
  const getUsIdFromCookies = async () => {
    try {
      const userCookie = await SecureStore.getItemAsync("user_cookie");
      console.log("check123", userCookie);

      if (userCookie) {
        userCookie && dispatch(addAuth(userCookie));
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

  return <>{!auth.us_id ? <ChatNavigator /> : <AuthNavigator />}</>;
};
export default AppRouters;
