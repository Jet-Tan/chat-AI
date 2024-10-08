import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { appColors } from "../../../constants/appColors";

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerContent}>
        {/* Logo và bản quyền */}
        <View style={styles.textCenter}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              style={styles.logo}
              source={require("../../../assets/images/logoPage.png")}
            />
          </TouchableOpacity>
          <Text style={styles.copyright}>
            © 2022 Bản quyền thuộc riokupon.com
          </Text>
          <TouchableOpacity
            onPress={() => {}}
            title="DMCA.com Protection Status"
          >
            <Image
              style={styles.dmcaBadge}
              source={{
                uri: "https://images.dmca.com/Badges/dmca_protected_sml_120am.png?ID=fa78e68e-ff49-44e4-8fdf-c79612417db2",
              }}
            />
          </TouchableOpacity>
        </View>

        {/* Mục Riokupon.com */}
        <Section
          title={<Text style={{ color: appColors.blue2 }}>Riokupon.com</Text>}
        >
          {[
            "Mã giảm giá Shopee",
            "Mã giảm giá Lazada",
            "Thời trang",
            "Tiêu dùng",
            "Đời sống",
            "Công nghệ",
          ].map((item) => (
            <ListItem
              key={item}
              title={item}
              containerStyle={{ backgroundColor: appColors.blue2 }}
            />
          ))}
        </Section>

        {/* Mục Thông tin */}
        <Section
          title={<Text style={{ color: appColors.blue2 }}>Thông tin</Text>}
        >
          {[
            "Giới thiệu",
            "Liên hệ",
            "Chính sách Bảo mật",
            "Điều khoản dịch vụ",
            "Câu hỏi thường gặp",
          ].map((item) => (
            <ListItem
              key={item}
              title={item}
              containerStyle={{ backgroundColor: appColors.blue2 }}
            />
          ))}
        </Section>

        {/* Mục DIMACO CO.,LTD */}
        <View style={styles.col}>
          <Text style={styles.heading}>DIMACO CO.,LTD</Text>
          <TouchableOpacity onPress={() => {}} title="DIMACO Website">
            <Text style={styles.dimacoLink}>
              CÔNG TY TNHH THIẾT KẾ QUẢN LÝ VÀ QUẢNG CÁO DIMACO
            </Text>
          </TouchableOpacity>
          {contactInfo.map(({ icon, text }) => (
            <ContactInfo key={text} icon={icon} text={text} />
          ))}
        </View>

        {/* Thông báo */}
        <Text style={styles.disclaimer}>
          Riokupon.com không trực tiếp bán hàng
        </Text>
        <Text style={styles.disclaimer}>
          Dữ liệu trên được cập nhật và thống kê từ nhiều nguồn trên mạng dữ
          liệu, chúng tôi không chịu trách nhiệm về tính xác thực.
        </Text>
      </View>

      <View style={styles.fbGroup}>
        <Text style={styles.paragraphFB}>
          Tham gia nhóm hỗ trợ trên Facebook để nhận cập nhật mới nhất tại:{" "}
          <Text
            style={styles.link}
            onPress={() =>
              openLink("https://www.facebook.com/groups/844088853268069")
            }
          >
            Group Riokupon trên Facebook
          </Text>
        </Text>

        {/* Đoạn văn bản thứ hai */}
        <Text style={styles.paragraphFB}>
          Thấy chất lượng không quên <Text style={styles.boldText}>#LIKE</Text>{" "}
          và <Text style={styles.boldText}>#Share</Text> để ủng hộ Riokupon
        </Text>

        {/* Nút Chia sẻ trên Facebook */}
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            openLink(
              "https://www.facebook.com/dialog/share?app_id=164925878934153&display=popup&href=https%3A%2F%2Friokupon.com%2Fvn%2Fterms&quote=%C4%90i%E1%BB%81u+kho%E1%BA%A3n+d%E1%BB%8Bch+v%E1%BB%A5+-+Riokupon.com"
            )
          }
        >
          <Text style={styles.buttonText}>Chia sẻ Facebook</Text>
        </TouchableOpacity>
        <Text style={styles.paragraphFB}>
          V 1.0.0 Copyright © 2022. Riokupon.com{" "}
        </Text>
      </View>
    </View>
  );
};

// Danh sách thông tin liên hệ
const contactInfo = [
  {
    icon: <FontAwesome name="phone" size={16} color={appColors.blue2} />,
    text: "0819.577.577",
  },
  {
    icon: <FontAwesome name="envelope" size={16} color={appColors.blue2} />,
    text: (
      <Text style={{ textDecorationLine: "underline", color: appColors.blue2 }}>
        info@dimaco.vn
      </Text>
    ),
  },
  {
    icon: <FontAwesome name="map-marker" size={16} color={appColors.blue2} />,
    text: "18/4 Tran Van Hoang Street, Ward 9, Tan Binh District, HCMC",
  },
];

// Component cho phần thông tin liên hệ
const ContactInfo = ({ icon, text }) => (
  <View style={styles.contactInfo}>
    <View style={styles.iconContainer}>{icon}</View>
    <View style={styles.textContainer}>
      <Text style={{ color: appColors.blue2 }}>{text}</Text>
    </View>
  </View>
);
// Component cho mỗi mục danh sách
const ListItem = ({ title }) => (
  <TouchableOpacity style={styles.listItem} onPress={() => {}}>
    <FontAwesome name="angle-right" size={16} color={appColors.blue2} solid />
    <Text style={styles.listText}>{title}</Text>
  </TouchableOpacity>
);

// Component cho từng phần
const Section = ({ title, children }) => (
  <View style={styles.col}>
    <Text style={styles.heading}>{title}</Text>
    <View style={styles.list}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
  },
  footerContent: {
    padding: 16,
    backgroundColor: appColors.gray2,
    borderTopWidth: 1,
    borderColor: appColors.gray1,
  },
  textCenter: {
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    maxWidth: 180,
    height: 50,
    resizeMode: "contain",
  },
  copyright: {
    color: "#343a40",
    marginVertical: 8,
  },
  dmcaBadge: {
    width: 120,
    height: 40,
    resizeMode: "contain",
  },
  col: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: appColors.blue2,
  },
  list: {},
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  listText: {
    marginLeft: 8,
    color: "#343a40",
  },
  dimacoLink: {
    fontSize: 16,
    color: appColors.blue2,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  iconContainer: {
    width: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  disclaimer: {
    textAlign: "center",
    color: "red",
  },

  fbGroup: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#071938",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  paragraphFB: {
    color: appColors.white,
    fontSize: 16,
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  button: {
    paddingVertical: 10,
    backgroundColor: "#007bff",
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  link: {
    color: "#04a28a",
  },
});

export default Footer;
