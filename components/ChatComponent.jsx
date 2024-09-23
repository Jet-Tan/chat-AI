import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Vibration,
  StyleSheet,
} from "react-native";
import axios from "axios";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EventSource from "react-native-sse";
import Markdown from "react-native-markdown-display";
import LoadingDots from "./LoadingDots";
const CHAT_PHP_URL =
  "https://api.riokupon.com/vn/cozeai/assistant.php?action=chat";
const USER_ID = "279573";
const THREAD_ID = "thread_lYgV8ip1IDPJk0jYsggtEJsD";
const PROMPTS_NAME = "Riokupon AI";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [arrayChat, setArrayChat] = useState([]);
  const [message, setMessage] = useState("");
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);

  const scrollViewRef = useRef(null);

  const currentDate = () => new Date().toLocaleString();
  const generateUniqueID = (prefix = "id_") => `${prefix}${Date.now()}`;

  const scrollChatBottom = useCallback(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, []);

  const disableChat = () => setIsWaitingForResponse(true);
  const enableChat = () => setIsWaitingForResponse(false);

  const sendUserChat = () => {
    if (isWaitingForResponse || !message.trim()) return;

    const chat = message.trim();
    setMessage("");
    disableChat();
    scrollChatBottom();
    getResponse(chat);
  };

  const getResponse = async (prompt) => {
    if (isWaitingForResponse) return;

    setShowTypingIndicator(true);
    setIsWaitingForResponse(true);
    disableChat();
    const randomID = generateUniqueID();
    console.log("chec", randomID);
    arrayChat.push({
      name: "User",
      message: prompt,
      isImg: false,
      date: currentDate(),
    });

    const arrayMessages = arrayChat.map((msg) => ({
      role: msg.training
        ? "system"
        : msg.name === "User"
        ? "user"
        : "assistant",
      content: msg.message,
    }));
    console.log("checl", arrayMessages);
    const params = new URLSearchParams();
    params.append("array_chat", JSON.stringify(arrayMessages));
    params.append("user_id", "279573");
    params.append("thread_id", "thread_lYgV8ip1IDPJk0jYsggtEJsD");
    params.append("message", prompt);
    params.append("is_mod", "0");

    console.log("dataaa", params);
    try {
      const response = await axios.post(CHAT_PHP_URL, params.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      streamChatCoze(response.data, randomID);
      scrollChatBottom();
    } catch (error) {
      console.error(`Error sending message: ${error}`);
      enableChat();
    } finally {
      // Tắt hiển thị dấu 3 chấm khi phản hồi hoàn tất
      setShowTypingIndicator(false);
      setIsWaitingForResponse(false);
    }
  };

  let buffer = "";

  const streamChatCoze = (data, randomID) => {
    try {
      if (!data) {
        console.warn("Received empty or undefined data in streamChatCoze");
        return;
      }

      const lines = data
        .split("\n")
        .map((line) => line.replace(/^data:\s*/, ""));

      buffer += lines.join("");
      console.log("Current buffer:", buffer);

      try {
        const jsonObjects = buffer.match(/{.*?}(?={|$)/g);

        if (jsonObjects) {
          jsonObjects.forEach((jsonStr) => {
            try {
              const parsedData = JSON.parse(jsonStr);
              if (parsedData.event === "done") {
                console.log("All responses are completed.");
                const combinedMessages = arrayChat
                  .map((chat) => chat.message)
                  .join("\n");

                updateChat(combinedMessages);
                buffer = "";
                enableChat();
                return;
              }
              console.log("Parsed Data:", parsedData.message?.type);

              if (
                parsedData.message?.type === "answer" ||
                parsedData.message?.type === "follow_up"
              ) {
                const messageContent = parsedData.message?.content || "";
                const messageIndex = parsedData.index; // Use a unique index for grouping
                console.log(
                  "Message Content:",
                  messageContent,
                  "Index:",
                  messageIndex
                );

                const type = parsedData.message?.type === "answer" ? "1" : "0";

                setArrayChat((prev) => {
                  // Check if there's an existing message with the same index and random ID
                  const existingMessageIndex = prev.findIndex(
                    (msg) =>
                      msg.index === messageIndex && msg.randomID === randomID
                  );

                  if (existingMessageIndex !== -1) {
                    // Update the content of the existing message
                    const updatedChat = [...prev];
                    updatedChat[existingMessageIndex] = {
                      ...updatedChat[existingMessageIndex],
                      message:
                        updatedChat[existingMessageIndex].message +
                        messageContent, // Append to existing message
                    };
                    return updatedChat;
                  } else {
                    // Create a new message
                    return [
                      ...prev,
                      {
                        name: PROMPTS_NAME,
                        message: messageContent,
                        isImg: false,
                        date: currentDate(),
                        is_reply: type,
                        index: messageIndex,
                        randomID: randomID,
                      },
                    ];
                  }
                });

                // Scroll to the bottom of the chat
                scrollChatBottom();

                if (parsedData.is_finish) {
                  console.log("Message finished:", messageContent);
                  buffer = "";
                  console.log("ch", arrayChat);

                  enableChat();
                }
              } else {
                console.log("Different type");
              }
            } catch (parseError) {
              console.error(
                "Error parsing individual JSON object:",
                parseError
              );
            }
          });

          // Clear buffer after processing JSON objects
          buffer = "";
          console.log("data", arrayChat);
        }
      } catch (e) {
        console.warn("Buffer does not yet contain complete JSON data.");
      }
    } catch (err) {
      console.error("Error processing chatbot response:", err);
      enableChat(); // Ensure chat is enabled again if an error occurs
    }
  };
  const updateChat = async (message) => {
    // Loại bỏ chuỗi "Riokupon AI: " khỏi message
    // const cleanMessage = message.replace("Riokupon AI: ", "");
    console.log("1231232123", message);
    try {
      const response = await axios.post(
        "https://api.riokupon.com/vn/cozeai/assistant.php?action=chat",
        {
          user_id: "279573",
          thread_id: "thread_lYgV8ip1IDPJk0jYsggtEJsD",
          message: message,
          is_mod: 2,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Chat updated successfully:", response.data);
      } else {
        console.error("Failed to update chat:", response.status);
      }
    } catch (error) {
      console.error("Error updating chat:", error);
    }
  };

  useEffect(() => {
    const fetchChatData = async () => {
      const timestamp = Math.floor(Date.now() / 1000);
      const apiUrl = `https://api.riokupon.com/vn/openai/assistant.php?action=get_messages&user_id=${USER_ID}&time=${timestamp}`;

      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        const messagesArray = Array.isArray(data) ? data : data.data || [];

        messagesArray.sort((a, b) =>
          a.time_created === b.time_created
            ? a.id - b.id
            : b.time_created - a.time_created
        );

        const limitMessages = messagesArray.slice(0, 30);

        setMessages((prevMessages) => {
          const existingMessageIds = new Set(prevMessages.map((msg) => msg.id));

          const newMessages = limitMessages.filter(
            (msg) => !existingMessageIds.has(msg.id)
          );

          if (newMessages.length > 0) {
            Vibration.vibrate(200);
          }

          return [...prevMessages, ...newMessages].sort((a, b) =>
            a.time_created === b.time_created
              ? a.id - b.id
              : a.time_created - b.time_created
          );
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
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollChatBottom();
    }, 500);
    return () => clearTimeout(timer);
  }, [arrayChat, messages]);

  // const renderers = {
  //   image: ({ src }) => (
  //     <Image
  //       source={{ uri: src }}
  //       style={{ width: 200, height: 200 }}
  //       resizeMode="contain"
  //     />
  //   ),
  //   link: ({ children, href }) => (
  //     <TouchableOpacity onPress={() => Linking.openURL(href)}>
  //       <Text style={{ color: "blue", textDecorationLine: "underline" }}>
  //         {children}
  //       </Text>
  //     </TouchableOpacity>
  //   ),
  // };

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

    const key = message.id
      ? message.id.toString()
      : generateUniqueID(`msg_${message.time_created}_${Math.random()}`);

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
            <View style={isAgent ? styles.agent_message : styles.user_message}>
              <Markdown
                style={{
                  body: { color: isAgent ? "#333" : "#fff", fontSize: 16 },
                }}
              >
                {message.message}
              </Markdown>
            </View>

            <Text style={isAgent ? styles.timeHtm : styles.timeHtmUser}>
              {dateHtm && `${dateHtm} `} {timeHtm}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const renderTypingIndicator = () => (
    <View style={styles.body}>
      <Image
        source={require("../assets/images/icon.png")}
        style={styles.chat_logo}
      />
      <View style={styles.dot_content}>
        <LoadingDots />
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.select({ ios: 50, android: 50 })}
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
        {messages.map((msg) => renderMessageItem(msg))}
        {arrayChat.map((chat) => renderMessageItem(chat, true))}
        {showTypingIndicator && renderTypingIndicator()}
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
  },
  user_content: {
    alignItems: "flex-end",
    marginVertical: 10,
  },
  body: {
    flexDirection: "row",
    maxWidth: "80%",
  },
  agent_message: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    lineHeight: 20,
  },
  user_message: {
    backgroundColor: "#0a7cff",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    lineHeight: 20,
  },
  dot_content: {
    alignItems: "flex-start",
    marginVertical: 10,
    borderRadius: 16,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  timeHtm: {
    fontSize: 10,
    marginTop: 5,
    paddingLeft: 8,
    color: "#333",
    textAlign: "left",
    fontWeight: "700",
  },
  timeHtmUser: {
    fontSize: 10,
    marginTop: 5,
    paddingRight: 8,
    color: "#333",
    textAlign: "right",
    fontWeight: "700",
  },
  chat_logo: {
    width: 30,
    height: 30,
    marginRight: 8,
    borderRadius: 15,
    marginTop: 10,
    borderColor: "#fff",
    borderWidth: 2,
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
