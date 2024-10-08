import React from "react";
import { View, Modal, ActivityIndicator, StyleSheet } from "react-native";
import { appColors } from "../constants/appColors";

const LoadingModal = ({ visible }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={appColors.orange} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Nền trong suốt với độ mờ
  },
  loadingContainer: {
    padding: 20,
    borderRadius: 10,
  },
});

export default LoadingModal;
