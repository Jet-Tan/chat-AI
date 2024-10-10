import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HeaderComponent from "../../components/HeaderComponent";
import ChatComponent from "./components/ChatComponent";
import { appColors } from "../../constants/appColors";
import { useNavigation } from "@react-navigation/native";

const ChatScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <HeaderComponent openDrawer={() => navigation.openDrawer()} />
      <View style={styles.chatWrapper}>
        <ChatComponent />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.orange,
  },
  chatWrapper: {
    flex: 1,
  },
});

export default ChatScreen;
