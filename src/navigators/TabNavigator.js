import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform, Text } from "react-native"; // Import Text from react-native
import HomeNavigator from "./HomeNavigator";
import GetRPNavigator from "./GetRPNavigator";
import ChatNavigator from "./ChatNavigator";
import GoldBoardNavigator from "./GoldBoardNavigatior"; // Đã sửa lỗi chính tả
import { appColors } from "../constants/appColors";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import ProfileNavigator from "./ProfileNavigator";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: appColors.orange,
          // justifyContent: "center",
          // alignItems: "center",
          height: Platform.OS === "ios" ? 80 : 50,
        },
        tabBarIcon: ({ focused }) => {
          let icon;
          const color = focused ? appColors.gray : appColors.white;

          switch (route.name) {
            case "Trang chủ":
              icon = <FontAwesome5 name="home" size={20} color={color} />;
              break;
            case "Nhận RP":
              icon = <FontAwesome5 name="plus" size={20} color={color} />;
              break;
            case "Chat":
              icon = (
                <Ionicons name="chatbubble-ellipses" size={20} color={color} />
              );
              break;
            case "Bảng vàng":
              icon = <FontAwesome5 name="chart-bar" size={20} color={color} />;
              break;
            case "Cá nhân":
              icon = <Ionicons name="heart" size={20} color={color} />;
              break;
            default:
              icon = null;
          }

          return icon; // Trả về icon đã chọn
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarLabel: ({ focused }) => {
          const color = focused ? appColors.gray : appColors.white; // Màu chữ

          return (
            <Text style={{ color: color, fontSize: 12 }}>{route.name}</Text>
          );
        },
      })}
    >
      <Tab.Screen name="Trang chủ" component={HomeNavigator} />
      <Tab.Screen name="Nhận RP" component={GetRPNavigator} />
      <Tab.Screen name="Chat" component={ChatNavigator} />
      <Tab.Screen name="Bảng vàng" component={GoldBoardNavigator} />
      <Tab.Screen name="Cá nhân" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
