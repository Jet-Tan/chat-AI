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
  RefreshControl,
  FlatList,
} from "react-native";
import axios from "axios";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EventSource from "react-native-sse";
import Markdown from "react-native-markdown-display";
import LoadingDots from "../../../components/LoadingDots";
import moment from "moment";
import { appColors } from "../../../constants/appColors";

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
  const [refreshing, setRefreshing] = useState(false);
  const [abortController, setAbortController] = useState(null);
  const scrollViewRef = useRef(null);

  const currentDate = () => new Date().toLocaleString();
  const generateUniqueID = (prefix = "id_") => `${prefix}${Date.now()}`;

  const scrollChatBottom = useCallback(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, []);

  const disableChat = () => setIsWaitingForResponse(true);
  const enableChat = () => setIsWaitingForResponse(false);

  const sendUserChat = () => {
    const chat = message.trim();
    if (isWaitingForResponse || !chat) return;
    disableChat();
    getResponse(chat);
    setMessage("");
    scrollChatBottom();
  };
  const sendFollowUp = (message) => {
    if (isWaitingForResponse) return;
    disableChat();
    getResponse(message);
    scrollChatBottom();
  };

  const getResponse = async (prompt) => {
    if (isWaitingForResponse) return;

    const controller = new AbortController();
    setAbortController(controller);

    setShowTypingIndicator(true);

    setIsWaitingForResponse(true);
    disableChat();
    const randomID = generateUniqueID();
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
    const params = new FormData();
    params.append("array_chat", JSON.stringify(arrayMessages));
    params.append("user_id", USER_ID);
    params.append("thread_id", THREAD_ID);
    params.append("message", prompt);
    params.append("is_mod", "0");

    try {
      const response = await axios.post(CHAT_PHP_URL, params, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        signal: controller.signal, // Gửi tín hiệu hủy
      });

      streamChatCoze(response.data, randomID);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        console.error(`Error during long polling: ${error}`);
      }
      enableChat();
    } finally {
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
      let answerMessage = "";
      try {
        const jsonObjects = buffer.match(/{.*?}(?={|$)/g);

        if (jsonObjects) {
          jsonObjects.forEach((jsonStr) => {
            try {
              const parsedData = JSON.parse(jsonStr);

              if (parsedData.event === "done") {
                buffer = "";
                enableChat();
                return;
              }
              const messageIndex = parsedData.index;
              const messageContent = parsedData.message?.content || "";
              if (
                parsedData.message?.type === "answer" &&
                parsedData.message?.role === "assistant"
              ) {
                answerMessage += messageContent;
                console.log("Handling 'answer' type message:", answerMessage);
                setArrayChat((prev) => {
                  const existingMessageIndex = prev.findIndex(
                    (msg) =>
                      msg.index === messageIndex && msg.randomID === randomID
                  );

                  if (existingMessageIndex !== -1) {
                    const updatedChat = [...prev];
                    updatedChat[existingMessageIndex].message += messageContent;
                    return updatedChat;
                  } else {
                    const newMessage = {
                      name: PROMPTS_NAME,
                      message: messageContent,
                      isImg: false,
                      date: currentDate(),
                      is_reply: "1",
                      index: messageIndex,
                      randomID: randomID,
                    };
                    return [...prev, newMessage];
                  }
                });

                if (parsedData.is_finish) {
                  console.log("Completed answer message:", answerMessage);
                  buffer = "";
                  updateChat(answerMessage);

                  return;
                }
              }

              if (parsedData.message?.type === "follow_up") {
                console.log(
                  "Handling 'follow_up' type message:",
                  messageContent
                );
                setArrayChat((prev) => [
                  ...prev,
                  {
                    name: PROMPTS_NAME,
                    message: messageContent,
                    isImg: false,
                    is_reply: "0",
                    index: messageIndex,
                    date: currentDate(),
                    randomID: randomID,
                    type: "follow_up",
                  },
                ]);

                scrollChatBottom();
              }
            } catch (parseError) {
              console.error(
                "Error parsing individual JSON object:",
                parseError
              );
            }
          });
          console.log("check", arrayChat);
          buffer = "";
        }
      } catch (e) {
        console.warn("Buffer does not yet contain complete JSON data.");
      }
    } catch (err) {
      console.error("Error processing chatbot response:", err);
      enableChat();
    }
  };

  const updateChat = async (message) => {
    const cleanMessage = message.replace("Riokupon AI: ", "");
    try {
      const response = await axios.post(
        "https://api.riokupon.com/vn/cozeai/assistant.php?action=chat",
        {
          user_id: USER_ID,
          thread_id: THREAD_ID,
          message: cleanMessage,
          is_mod: 2,
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      if (response.status !== 200) {
        console.error("Failed to update chat:", response.status);
      }
    } catch (error) {
      console.error("Error updating chat:", error);
    }
  };

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

      const limitMessages = messagesArray.slice(0, 10);

      setMessages((prevMessages) => {
        const existingMessageIds = new Set(prevMessages.map((msg) => msg.id));

        const newMessages = limitMessages.filter(
          (msg) => !existingMessageIds.has(msg.id)
        );

        if (newMessages.length > 0) {
          // Vibration.vibrate(200);
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
  useEffect(() => {
    fetchChatData();
  }, []);

  useEffect(() => {
    scrollChatBottom();
  }, [arrayChat, messages, showTypingIndicator]);

  useEffect(() => {
    const timer = setTimeout(scrollChatBottom, 500);
    return () => clearTimeout(timer);
  }, [arrayChat, messages]);

  function parseCustomDateString(dateString) {
    const cleanedDateString = dateString.replace(/\u202F/g, " ");

    // Tách chuỗi ngày tháng để xác định định dạng
    const parts = cleanedDateString.split(/[,\s]+/); // Tách theo khoảng trắng và dấu phẩy
    const datePart = parts[0].split("/"); // Tách phần ngày tháng

    // Kiểm tra định dạng ngày và tháng
    if (datePart.length === 3) {
      const [day, month] = datePart;

      // Nếu phần đầu nhỏ hơn 13, thì đây là trường hợp đặc biệt cần xác định lại
      if (parseInt(day) <= 12) {
        return moment(cleanedDateString, "D/M/YYYY, HH:mm:ss", true).toDate();
      }
    }

    // Trường hợp mặc định, vẫn dùng định dạng thông thường nếu không khớp đặc biệt
    return moment(
      cleanedDateString,
      [
        "M/D/YYYY, h:mm:ss A", // Định dạng tháng/ngày/năm
        "M/D/YYYY, HH:mm:ss", // Định dạng tháng/ngày/năm với 24 giờ
        "D/M/YYYY, HH:mm:ss", // Định dạng ngày/tháng/năm với 24 giờ
        "D/M/YYYY, h:mm:ss A", // Định dạng ngày/tháng/năm
      ],
      true
    ).toDate();
  }

  const renderMessageItem = (message, isUserMessage = false) => {
    const isAgent = message.is_reply === "1";

    const messageDate = message.time_created
      ? new Date(message.time_created * 1000)
      : parseCustomDateString(message.date);

    if (isNaN(messageDate)) {
      console.error(
        `Invalid date format: ${message.date || message.time_created}`
      );
      return null;
    }

    const now = new Date();

    // Chuyển sang múi giờ cục bộ để so sánh ngày
    const isToday = moment(messageDate)
      .local()
      .isSame(moment(now).local(), "day");
    const isThisYear = moment(messageDate)
      .local()
      .isSame(moment(now).local(), "year");

    const timeHtm = moment(messageDate).local().format("HH:mm:ss");

    const dateHtm = isToday
      ? ""
      : isThisYear
      ? moment(messageDate).local().format("MM/DD") // Hiển thị tháng/ngày nếu cùng năm
      : moment(messageDate).local().format("YYYY/MM/DD"); // Hiển thị đầy đủ nếu khác năm

    const displayDate = isToday ? timeHtm : `${dateHtm} ${timeHtm}`.trim();

    const key = message.id
      ? message.id.toString()
      : generateUniqueID(`msg_${message.time_created}_${Math.random()}`);

    return (
      <TouchableOpacity
        key={key}
        style={isAgent ? styles.agent_content : styles.user_content}
        onPress={() =>
          message.type === "follow_up" && sendFollowUp(message.message)
        }
        activeOpacity={1}
      >
        <View style={styles.body}>
          {isAgent && (
            <Image
              source={require("../../../assets/images/icon.png")}
              style={styles.chat_logo}
            />
          )}
          <View style={{ width: "100%" }}>
            <View style={isAgent ? styles.agent_message : styles.user_message}>
              <Markdown
                style={{
                  body: { color: isAgent ? "#333" : "#fff", fontSize: 16 },
                }}
              >
                {message.message}
              </Markdown>
            </View>
            <View>
              <Text style={isAgent ? styles.timeHtm : styles.timeHtmUser}>
                {displayDate}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTypingIndicator = () => (
    <View style={styles.body}>
      <Image
        source={require("../../../assets/images/icon.png")}
        style={styles.chat_logo}
      />
      <View style={styles.dot_content}>
        <LoadingDots />
      </View>
    </View>
  );

  const handleTextChange = useCallback((text) => {
    setMessage(text);
  }, []);

  const resetChat = () => {
    setMessages([]);
    setArrayChat([]);
    setMessage("");
    setIsWaitingForResponse(false);
    setShowTypingIndicator(false);
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Hủy yêu cầu nếu đang có
    if (abortController) {
      abortController.abort();
    }

    resetChat();
    fetchChatData();

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [abortController]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.select({ ios: 100, android: 50 })}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onContentSizeChange={() => {
          scrollChatBottom();
        }}
        onLayout={() => scrollChatBottom()}
      >
        <View style={styles.live_chat}>
          <Text style={styles.live_chat_text}>
            Nội dung chỉ mang tính tham khảo, để được hỗ trợ chính xác nhất hãy
            gửi tin nhắn tại
          </Text>
          <Image
            source={require("../../../assets/images/icon.png")}
            style={styles.live_logo}
          />
          <Text style={styles.live_chat_status}>
            Riokupon AI đang trực tuyến
          </Text>
        </View>
        <View>
          {messages.map((msg) => renderMessageItem(msg))}
          {arrayChat.map((chat) => renderMessageItem(chat, true))}
          {showTypingIndicator && renderTypingIndicator()}
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tin nhắn của bạn"
          value={message}
          onChangeText={handleTextChange}
          editable={!isWaitingForResponse}
          onSubmitEditing={sendUserChat}
          blurOnSubmit={false}
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
    backgroundColor: appColors.blue1,
    flexDirection: "column",
  },
  live_chat: {
    backgroundColor: appColors.blue,
    paddingVertical: 20,
    borderBottomLeftRadius: 48,
    borderBottomRightRadius: 48,
    alignItems: "center",
  },
  live_chat_text: {
    color: appColors.white,
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
    color: appColors.white,
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
    backgroundColor: appColors.white,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    lineHeight: 20,
    alignSelf: "flex-start",
  },
  user_message: {
    backgroundColor: appColors.blue,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    lineHeight: 20,
    alignSelf: "flex-end",
  },
  dot_content: {
    alignItems: "flex-start",
    marginVertical: 10,
    borderRadius: 16,
    backgroundColor: appColors.white,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  timeHtm: {
    fontSize: 10,
    marginTop: 5,
    paddingLeft: 8,
    color: appColors.gray,
    textAlign: "left",
    fontWeight: "700",
  },
  timeHtmUser: {
    fontSize: 10,
    marginTop: 5,
    paddingRight: 8,
    color: appColors.gray,
    textAlign: "right",
    fontWeight: "700",
  },
  chat_logo: {
    width: 30,
    height: 30,
    marginRight: 8,
    borderRadius: 15,
    marginTop: 10,
    borderColor: appColors.white,
    borderWidth: 2,
  },
  scrollView: {
    paddingHorizontal: 8,
    paddingBottom: 50,
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: appColors.white,
    borderTopWidth: 1,
    borderTopColor: appColors.gray1,
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: appColors.gray2,
    borderRadius: 25,
    marginRight: 10,
  },
  sendButton: {
    fontSize: 28,
    color: appColors.blue,
  },
});

export default ChatComponent;
