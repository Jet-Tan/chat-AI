import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Logo và bản quyền */}
        <View style={styles.textCenter}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              style={styles.logo}
              source={require("./path_to_your_image/logo.png")} // Thay đường dẫn tương ứng
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
        <Section title="Riokupon.com">
          {[
            "Mã giảm giá Shopee",
            "Mã giảm giá Lazada",
            "Thời trang",
            "Tiêu dùng",
            "Đời sống",
            "Công nghệ",
          ].map((item) => (
            <ListItem key={item} title={item} />
          ))}
        </Section>

        {/* Mục Thông tin */}
        <Section title="Thông tin">
          {[
            "Giới thiệu",
            "Liên hệ",
            "Chính sách Bảo mật",
            "Điều khoản dịch vụ",
            "Câu hỏi thường gặp",
          ].map((item) => (
            <ListItem key={item} title={item} />
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
      </ScrollView>
    </View>
  );
};

// Danh sách thông tin liên hệ
const contactInfo = [
  { icon: <FontAwesome name="phone" size={16} />, text: "0819.577.577" },
  { icon: <FontAwesome name="envelope" size={16} />, text: "info@dimaco.vn" },
  {
    icon: <FontAwesome name="map-marker" size={16} />,
    text: "18/4 Tran Van Hoang Street, Ward 9, Tan Binh District, HCMC",
  },
];

// Component cho phần thông tin liên hệ
const ContactInfo = ({ icon, text }) => (
  <View style={styles.contactInfo}>
    {icon}
    <Text> {text}</Text>
  </View>
);

// Component cho mỗi mục danh sách
const ListItem = ({ title }) => (
  <TouchableOpacity style={styles.listItem} onPress={() => {}}>
    <FontAwesome name="angle-right" size={16} />
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
  footer: {
    backgroundColor: "#f8f9fa", 
    paddingVertical: 16,
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    flexDirection: "column",
  },
  textCenter: {
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    maxWidth: 180,
    height: "auto",
  },
  copyright: {
    color: "#343a40",
    marginVertical: 8,
  },
  dmcaBadge: {
    width: 120,
    height: "auto",
  },
  col: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  list: {
    marginLeft: 8,
  },
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
    color: "#007bff",
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  disclaimer: {
    textAlign: "center",
    color: "red",
  },
});

export default Footer;
