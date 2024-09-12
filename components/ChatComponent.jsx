import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  Vibration,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import EventSource from "react-native-sse";
import { MaterialIcons } from "@expo/vector-icons";

const CHAT_PHP_url =
  "https://api.riokupon.com/vn/cozeai/assistant.php?action=chat";
const prompts_name = "Riokupon AI";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [arrayChat, setArrayChat] = useState([]);
  const [message, setMessage] = useState("");
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const scrollViewRef = useRef(null);

  const currentDate = () => new Date().toLocaleString();

  const generateUniqueID = (prefix = "id_") => `${prefix}${Date.now()}`;

  const disableChat = () => setIsWaitingForResponse(true);
  const enableChat = () => setIsWaitingForResponse(false);

  const scrollChatBottom = useCallback(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, []);

  const sendUserChat = () => {
    if (message.trim()) {
      const chat = message.trim();
      setMessage("");
      disableChat();
      const newChat = {
        name: "User",
        message: chat,
        isImg: false,
        date: currentDate(),
      };
      setArrayChat((prev) => [...prev, newChat]);
      scrollChatBottom();
      getResponse(chat);
    }
  };

  const getResponse = async (prompt) => {
    if (isWaitingForResponse) return;

    disableChat();

    const arrayMessages = arrayChat.map((chat) => ({
      role: chat.name === "User" ? "user" : "assistant",
      content: chat.message,
    }));

    const params = new URLSearchParams();
    params.append("array_chat", JSON.stringify(arrayMessages));
    params.append("user_id", "279573");
    params.append("thread_id", "thread_lYgV8ip1IDPJk0jYsggtEJsD");
    params.append("message", prompt);
    params.append("is_mod", "0");

    try {
      const response = await axios.post(CHAT_PHP_url, params.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log("Response from API:", response.data);

      streamChatCoze(response.data);
    } catch (e) {
      console.error(`Error creating SSE: ${e}`);
      enableChat();
    }
  };

  const streamChatCoze = (data) => {
    let fullPrompt = "";

    try {
      const tokens = JSON.parse(JSON.stringify(data));
      const messageContent = tokens.message?.content || "";
      fullPrompt += messageContent;

      // Cập nhật trực tiếp phản hồi của chatbot vào arrayChat
      setArrayChat((prev) => {
        const assistantMessage = {
          name: prompts_name,
          message: fullPrompt,
          isImg: false,
          date: currentDate(),
        };
        return [...prev, assistantMessage];
      });

      scrollChatBottom();

      if (tokens.is_finish) {
        enableChat();
      }
    } catch (err) {
      console.error("JSON parsing error:", err);
      enableChat();
    }
  };

  useEffect(() => {
    const fetchChatData = async () => {
      const timestamp = Math.floor(Date.now() / 1000);
      const apiUrl = `https://api.riokupon.com/vn/openai/assistant.php?action=get_messages&user_id=279573&time=${timestamp}`;

      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        const messagesArray = Array.isArray(data) ? data : data.data || [];
        messagesArray.sort((a, b) =>
          a.time_created === b.time_created
            ? a.id - b.id
            : a.time_created - b.time_created
        );
        const limitMessages = messagesArray.slice(0, 50);

        setMessages((prevMessages) => {
          const existingMessageIds = new Set(prevMessages.map((msg) => msg.id));
          const newMessages = limitMessages.filter(
            (msg) => !existingMessageIds.has(msg.id)
          );
          if (newMessages.length > 0) {
            Vibration.vibrate(200);
          }

          return [...prevMessages, ...newMessages];
        });
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchChatData();
  }, []);

  useEffect(() => {
    scrollChatBottom();
  }, [arrayChat, messages]);

  const renderMessageItem = (message, isUserMessage = false) => {
    const isAgent = message.is_reply === "1";
    const messageDate = new Date(message.time_created * 1000 || new Date());
    const now = new Date();
    const isToday = messageDate.toDateString() === now.toDateString();
    const isThisYear = messageDate.getFullYear() === now.getFullYear();
    const timeHtm = messageDate.toLocaleTimeString();

    let dateHtm = "";
    if (!isToday) {
      dateHtm = isThisYear
        ? messageDate.toLocaleDateString(undefined, {
            month: "2-digit",
            day: "2-digit",
          })
        : messageDate.toLocaleDateString();
    }

    const key = message.id ? message.id.toString() : generateUniqueID();
    return (
      <View
        key={key}
        style={isAgent ? styles.agent_content : styles.user_content}
      >
        <View style={styles.body}>
          {isAgent && (
            <Image
              source={require("../assets/images/icon.png")}
              style={styles.chat_logo}
            />
          )}
          <View>
            <Text style={isAgent ? styles.agent_message : styles.user_message}>
              {message.message}
            </Text>
            <Text style={isAgent ? styles.timeHtm : styles.timeHtmUser}>
              {dateHtm && `${dateHtm} `} {timeHtm}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.select({ ios: 50, android: 30 })}
    >
      <ScrollView ref={scrollViewRef} style={styles.scrollView}>
        <View style={styles.live_chat}>
          <Text style={styles.live_chat_text}>
            Nội dung chỉ mang tính tham khảo, để được hỗ trợ chính xác nhất hãy
            gửi tin nhắn tại
          </Text>
          <Image
            source={require("../assets/images/icon.png")}
            style={styles.live_logo}
          />
          <Text style={styles.live_chat_status}>
            Riokupon AI đang trực tuyến
          </Text>
        </View>
        {messages.map((message) => renderMessageItem(message))}
        {arrayChat.map((chat, index) => renderMessageItem(chat, true))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tin nhắn của bạn"
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={sendUserChat}
          editable={!isWaitingForResponse}
        />
        <TouchableOpacity
          onPress={sendUserChat}
          disabled={isWaitingForResponse}
        >
          <MaterialIcons name="send" style={styles.sendButton} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9eeff",
    flexDirection: "column",
  },
  live_chat: {
    backgroundColor: "#0a7cff",
    paddingVertical: 20,
    borderBottomLeftRadius: 48,
    borderBottomRightRadius: 48,
    alignItems: "center",
  },
  live_chat_text: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  live_logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  live_chat_status: {
    color: "#fff",
    textAlign: "center",
  },
  agent_content: {
    alignItems: "flex-start",
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  user_content: {
    alignItems: "flex-end",
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  body: {
    flexDirection: "row",
    maxWidth: "80%",
    alignItems: "center",
  },
  agent_message: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    fontSize: 15,
    lineHeight: 20,
  },
  user_message: {
    backgroundColor: "#0a7cff",
    borderRadius: 16,
    padding: 12,
    fontSize: 15,
    lineHeight: 20,
    color: "#fff",
  },
  timeHtm: {
    fontSize: 10,
    paddingLeft: 8,
    color: "#ccc",
  },
  timeHtmUser: {
    fontSize: 10,
    paddingLeft: 8,
    color: "#999",
  },
  chat_logo: {
    width: 25,
    height: 25,
    marginRight: 8,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 8,
    paddingBottom: 50,
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e9e9e9",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 25,
    marginRight: 10,
  },
  sendButton: {
    fontSize: 28,
    color: "#0a7cff",
  },
});

export default ChatComponent;
