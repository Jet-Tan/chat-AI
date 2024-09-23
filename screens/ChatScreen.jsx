import React from "react";
import { View, StyleSheet } from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import ChatComponent from "../components/ChatComponent";
import ChatTest from "../components/ChatTest";

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderComponent />
      <ChatComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
