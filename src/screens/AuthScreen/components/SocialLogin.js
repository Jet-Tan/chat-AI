// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import React, { useState } from "react";
// import { Button, Text, View } from "react-native";
// import { useDispatch } from "react-redux";

// // Cấu hình Google Signin
// GoogleSignin.configure({
//   webClientId:
//     "51183564123-pf81s6h2gnkmudbcnhe2j6ke2eapt6l1.apps.googleusercontent.com",
//   iosClientId:
//     "51183564123-ftijaqo23c9thm2kfe9ssgqq6p92ru72.apps.googleusercontent.com",
// });

// const SocialLogin = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const dispatch = useDispatch();

//   // Hàm đăng nhập với Google
//   const handleLoginWithGoogle = async () => {
//     setIsLoading(true);
//     try {
//       await GoogleSignin.hasPlayServices({
//         showPlayServicesUpdateDialog: true,
//       });
//       const userInfo = await GoogleSignin.signIn();
//       const user = userInfo.user;

//       // Giả sử bạn có một API authenticationAPI để xử lý xác thực
//       const res = await authenticationAPI.HandleAuthentication(
//         `/google-signin`,
//         user,
//         "post"
//       );

//       dispatch(addAuth(res.data));

//       await AsyncStorage.setItem("auth", JSON.stringify(res.data));
//       console.log("Login success:", res.data);
//     } catch (error) {
//       console.log("Google Signin Error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ textAlign: "center", fontSize: 16, marginVertical: 20 }}>
//         OR
//       </Text>

//       <Button
//         title="Login with Google"
//         onPress={handleLoginWithGoogle}
//         disabled={isLoading}
//       />
//     </View>
//   );
// };

// export default SocialLogin;
