import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
} from "react-native";
import Markdown from "react-native-markdown-display";
import { SSE } from "react-native-sse";

const ChatTest = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isChatDisabled, setIsChatDisabled] = useState(false);
  const scrollViewRef = useRef();

  const CHAT_PHP_URL =
    "https://api.riokupon.com/vn/cozeai/assistant.php?action=chat";

  const generateUniqueID = () => `id_${Date.now()}`;

  const currentDate = () => {
    const timestamp = new Date();
    return timestamp.toLocaleString();
  };

  const scrollChatBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const disableChat = () => setIsChatDisabled(true);
  const enableChat = () => setIsChatDisabled(false);

  const textToHtml = (str) => {
    // Sử dụng Markdown để chuyển đổi
    return str.replace(/\n/g, "<br>").replace(/%3D\\/g, "%3D");
  };

  const sendUserChat = () => {
    scrollChatBottom();
    getResponse(message);
    setMessage("");
    disableChat();
  };

  const getResponse = async (prompt) => {
    console.log("check 123", prompt);
    chatMessages.push({
      name: "User",
      message: prompt,
      isImg: false,
      date: currentDate(),
    });
    console.log("data 123", chatMessages);
    const array_messages = chatMessages.map((msg) => ({
      role: msg.training
        ? "system"
        : msg.name === "User"
        ? "user"
        : "assistant",
      content: msg.message,
    }));

    console.log("ch12", array_messages);
    console.log("ch12", array_messages);
    const params = {
      array_chat: JSON.stringify(array_messages),
      user_id: "279573",
      thread_id: "thread_lYgV8ip1IDPJk0jYsggtEJsD",
      message: prompt,
      is_mod: "0",
    };

    // Chuyển đổi object thành query string
    const queryString = new URLSearchParams(params).toString();

    try {
      const response = await fetch(CHAT_PHP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: queryString,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Bước 2: Thiết lập kết nối SSE
      const source = new SSE(CHAT_PHP_URL, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      streamChatCoze(source);
      source.stream();
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };
  const streamChatCoze = (source) => {
    console.log("tan", source);
    let fullPrompt = "";
    let partPrompt = "";

    source.addEventListener("message", (e) => {
      const data = e.data;
      let tokens = {};

      try {
        tokens = JSON.parse(data);
      } catch (err) {
        console.log("Error parsing JSON", err);
        return;
      }

      const message = tokens?.message || {};

      // Kiểm tra nếu là phản hồi của assistant
      if (message.role === "assistant" && message.type === "answer") {
        if (message.content) {
          fullPrompt += message.content;
          partPrompt = message.content;
        }

        // Cập nhật phản hồi vào trạng thái chat
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { name: "Assistant", message: partPrompt, date: currentDate() },
        ]);
      }

      // Nếu phản hồi hoàn tất
      if (message.role === "assistant" && tokens.is_finish) {
        enableChat();
      }

      scrollChatBottom(); // Cuộn đến cuối
    });

    // Xử lý lỗi SSE
    source.addEventListener("error", (e) => {
      console.error("SSE error:", e);
      enableChat(); // Bật lại chat nếu xảy ra lỗi
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef} style={styles.chatWrapper}>
        {chatMessages.map((msg, index) => (
          <View key={index} style={styles.messageContainer}>
            <Text>{msg.name}: </Text>
            <Markdown>{textToHtml(msg.message)}</Markdown>
            <Text>{msg.date}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Enter your message"
        editable={!isChatDisabled}
      />
      <Button title="Send" onPress={sendUserChat} disabled={isChatDisabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  chatWrapper: { flex: 1, marginBottom: 10 },
  messageContainer: { marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 },
});

export default ChatTest;
