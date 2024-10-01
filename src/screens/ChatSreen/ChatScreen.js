import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HeaderComponent from "../../components/HeaderComponent";
import ChatComponent from "./components/ChatComponent";

const ChatScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent />
      <View style={styles.chatWrapper}>
        <ChatComponent />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatWrapper: {
    flex: 1,
  },
});

export default ChatScreen;
