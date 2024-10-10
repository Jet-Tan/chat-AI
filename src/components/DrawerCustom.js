import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { appColors } from "../constants/appColors";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

const DrawerCustom = ({ navigation }) => {
  const size = 20;
  const color = appColors.white;
  const profileMenu = [
    {
      key: "MyProfile",
      title: "Thông tin tài khoản",
      icon: <FontAwesome5 name="user" size={size} color={color} />,
    },
    {
      key: "GetGP",
      title: "Nhận điểm RP",
      icon: <FontAwesome5 name="plus" size={size} color={color} />,
    },
    {
      key: "PointsHistory",
      title: "Lịch sử tích điểm",
      icon: <FontAwesome5 name="history" size={size} color={color} />,
    },
    {
      key: "Redeem",
      title: "Đổi thưởng",
      icon: <FontAwesome5 name="gift" size={size} color={color} />,
    },
    {
      key: "Clause",
      title: "Điều khoản",
      icon: <FontAwesome5 name="file-contract" size={size} color={color} />,
    },
    {
      key: "Support",
      title: "Hỗ trợ",
      icon: <Ionicons name="help-circle-outline" size={size} color={color} />,
    },
    {
      key: "Questions",
      title: "Câu hỏi thường gặp",
      icon: <FontAwesome5 name="question-circle" size={size} color={color} />,
    },
    {
      key: "Setting",
      title: "Cài đặt",
      icon: <MaterialIcons name="settings" size={size} color={color} />,
    },
    {
      key: "SignOut",
      title: "Đăng xuất",
      icon: <FontAwesome5 name="sign-out-alt" size={size} color={color} />,
    },
  ];
  handleSignOut = async () => {
    console.log("check");
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-005.jpg",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>Ngọc Tấn</Text>
        <Text style={styles.userPoints}>1000 RP</Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={profileMenu}
        style={styles.menuList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={
              item.key === "SignOut"
                ? () => handleSignOut()
                : () => {
                    console.log(item.key);
                    navigation.closeDrawer();
                  }
            }
          >
            {item.icon}
            <Text style={styles.menuTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    paddingVertical: Platform.OS === "android" ? StatusBar.currentHeight : 50,
    backgroundColor: appColors.orange,
  },
  profileHeader: {
    alignItems: "center",
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 75,
    resizeMode: "contain",
  },
  userName: {
    fontSize: 30,
    fontWeight: "600",
    color: appColors.white,
    marginVertical: 10,
  },
  userPoints: {
    fontSize: 16,
    fontWeight: "600",
    color: appColors.white,
  },
  menuList: {
    flex: 1,
    paddingVertical: 20,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 12,
  },
  menuTitle: {
    paddingLeft: 12,
    fontSize: 16,
    color: appColors.white,
  },
});

export default DrawerCustom;
