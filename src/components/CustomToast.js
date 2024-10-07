import React, { forwardRef } from "react";
import Toast from "react-native-toast-message";

const CustomToast = forwardRef((props, ref) => {
  return <Toast ref={ref} />;
});

export const showToast = (type, text1, text2) => {
  Toast.show({
    type,
    text1,
    text2,
    position: "top",
    visibilityTime: 4000,
  });
};

export default CustomToast;
