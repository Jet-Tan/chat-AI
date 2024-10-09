import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";
import React from "react";
import { appColors } from "../constants/appColors";

const DrawerCustom = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Ngọc Tấn
        </Text>
      </View>
      <View style={{ flex: 1, paddingVertical: 20 }}>
        <Text>Menu container</Text>
      </View>
      <View>
        <Text>Button</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingVertical: Platform.OS === "android" ? StatusBar.currentHeight : 48,
    backgroundColor: appColors.orange,
  },
});
export default DrawerCustom;
