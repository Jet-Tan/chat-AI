import React from "react";
import { Image } from "react-native";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { appColors } from "../constants/appColors";

const LoadingIndicator = ({ loadingText }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={{ height: 100, width: 200 }}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color={appColors.orange} />
      {loadingText && <Text style={styles.loadingText}>{loadingText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default LoadingIndicator;
