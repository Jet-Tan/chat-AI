import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Linking } from "react-native"; // Để sử dụng Linking cho các liên kết
import Footer from "./components/FooterComponent";

const PolocyScreen = () => {
  return (
    <View style={styles.appContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: "https://riokupon.com/vn/assets/logo.png" }}
            style={styles.logo}
          />
          <Text style={styles.title}>Chính sách bảo mật</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.paragraph}>
            Đội ngũ nhân sự tại Riokupon luôn được định hướng về mục tiêu mang
            lại cho khách hàng những trải nghiệm mua sắm tốt nhất. Vì vậy, chúng
            tôi không ngừng cải thiện và thay đổi tích cực hơn về cả dịch vụ và
            hệ thống. Riokupon hiểu rằng mối quan tâm lớn nhất của mỗi khách
            hàng chính là sự an toàn của thông tin cá nhân mà họ đã cung cấp.
            Riokupon cam kết bảo mật tất cả thông tin cá nhân mà khách hàng đã
            cung cấp. Chúng tôi chỉ sử dụng tài nguyên này cho những mục đích đã
            thoả thuận và được khách hàng đồng ý.
          </Text>
          <Text style={styles.paragraph}>
            Riokupon chỉ thu thập những thông tin cá nhân cần thiết phục vụ cho
            các tiện ích mà bạn sử dụng. Riokupon cam kết không bán thông tin
            khách hàng trong bất kỳ trường hợp nào.
          </Text>
          <Text style={styles.paragraph}>
            Riokupon có thể chia sẻ thông tin của khách hàng với các đối tác của
            chúng tôi, chỉ nhằm mục đích mang đến cho bạn những lợi ích và thỏa
            thuận mua hàng tốt nhất. Tuy nhiên, chúng tôi vẫn hạn chế tối đa
            việc chia sẻ thông tin cá nhân này và giới hạn mọi dữ liệu được cung
            cấp ở mức độ tổng hợp.
          </Text>
          <Text style={styles.paragraph}>
            Riokupon đã thực hiện các chính sách và tính năng bảo mật khác nhau
            để đảm bảo mọi dữ liệu cá nhân liên quan đến khách hàng luôn được
            đảm bảo an toàn và bảo mật, và tuyệt đối không có dữ liệu nào bị
            truy cập trái phép.
          </Text>
          <Text style={styles.paragraph}>
            Bạn hãy yên tâm vì Riokupon rất xem trọng quyền riêng tư và tính bảo
            mật thông tin cá nhân. Chúng tôi cam kết tiếp nhận mọi phản hồi về
            vấn đề này.
          </Text>
          <Text style={styles.paragraph}>Đội ngũ nhân sự của Riokupon.</Text>
          <Text style={styles.heading}>NỘI DUNG CHÍNH SÁCH</Text>

          <Text style={styles.subHeading}>
            1. Phạm vi thu thập và sử dụng thông tin
          </Text>
          <Text style={styles.subSubHeading}>
            1.1. Phạm vi thu thập thông tin
          </Text>
          <Text style={styles.paragraph}>
            Dữ liệu cá nhân mà Riokupon có thể thu thập từ bạn sẽ phụ thuộc vào
            sản phẩm, dịch vụ và chương trình khuyến mãi mà bạn sử dụng hoặc đặt
            hàng. Riokupon sẽ thu thập dữ liệu cá nhân liên quan đến bạn khi
            bạn:
          </Text>
          <Text style={styles.paragraph}>
            - Đăng ký sử dụng các dịch vụ của Riokupon và/hoặc gửi biểu mẫu liên
            quan đến bất kỳ sản phẩm và dịch vụ của Riokupon.
          </Text>
          <Text style={styles.paragraph}>
            - Sử dụng một số dịch vụ của Riokupon (ví dụ như truy cập vào những
            trang web của chúng tôi và sử dụng các ứng dụng hoặc tiện ích mở
            rộng).
          </Text>
          <Text style={styles.paragraph}>
            - Liên hệ với Riokupon để được hỗ trợ.
          </Text>
          <Text style={styles.paragraph}>
            - Được các đối tác kinh doanh hoặc bên thứ ba giới thiệu với
            Riokupon.
          </Text>
          <Text style={styles.paragraph}>
            Thông tin cá nhân được thu thập có thể bao gồm các nội dung liên
            quan đến:
          </Text>
          <Text style={styles.paragraph}>
            - Danh tính của bạn bao gồm họ & tên, địa chỉ email, ngày sinh, số
            điện thoại, hình ảnh, tên đăng nhập thiết bị, địa chỉ giao thức
            Internet và các thông tin liên quan đến việc thanh toán.
          </Text>
          <Text style={styles.paragraph}>
            - Tương tác của bạn với Riokupon bao gồm tin nhắn Messenger giữa bạn
            với chúng tôi, email bạn đã gửi, và các bản lưu từ mọi liên hệ bạn
            đã có với chúng tôi.
          </Text>
          <Text style={styles.paragraph}>
            - Tài khoản của bạn bao gồm các chi tiết liên quan đến thông tin tài
            khoản Riokupon của bạn.
          </Text>
          <Text style={styles.paragraph}>
            - Việc sử dụng dịch vụ của chúng tôi bao gồm việc sử dụng “cookies”
            - Tệp văn bản nhỏ được chúng tôi thiết lập trên máy tính của bạn,
            cho phép chúng tôi cung cấp một số chức năng nhất định trên trang
            web của mình (ví dụ như có thể đăng nhập hoặc ghi nhớ các tùy chọn
            nhất định).
          </Text>
          <Text style={styles.paragraph}>
            Ngoài ra, Riokupon có thể thu thập dữ liệu cá nhân của khách hàng từ
            những nguồn hợp pháp khác.
          </Text>

          <Text style={styles.subSubHeading}>
            1.2. Phạm vi sử dụng thông tin
          </Text>
          <Text style={styles.paragraph}>
            Riokupon chỉ sử dụng hoặc tiết lộ thông tin cá nhân của khách hàng
            theo đúng mục đích thu thập, hoặc vì các mục đích khác khi đã có sự
            đồng ý của bạn dựa theo quy định của pháp luật Việt Nam.
          </Text>
          <Text style={styles.paragraph}>
            Riokupon cam kết không chia sẻ thông tin cá nhân của khách hàng với
            bất kỳ cá nhân/tổ chức nào bên ngoài với mục đích tiếp thị sản phẩm
            hoặc dịch vụ, nếu không có sự chấp thuận từ phía khách hàng.
          </Text>
          <Text style={styles.paragraph}>
            Riokupon cũng có thể phân tích thông tin này nhằm nắm bắt nhu cầu
            của khách hàng tốt hơn cũng như các loại sản phẩm, dịch vụ và các
            chương trình khuyến mãi mà khách hàng có thể quan tâm.
          </Text>
          <Text style={styles.paragraph}>
            Riokupon cần được đảm bảo thông tin cá nhân của bạn phải luôn chính
            xác và được cập nhật liên tục. Việc đó là cần thiết để có thể đạt
            được những mục đích sử dụng thông tin của chúng tôi.
          </Text>

          <Text style={styles.subHeading}>2. Thời gian lưu trữ thông tin</Text>
          <Text style={styles.paragraph}>
            Riokupon sẽ lưu trữ thông tin cá nhân của khách hàng cho đến khi
            những thông tin này không còn cần thiết để đáp ứng các mục đích thu
            thập của chúng tôi nữa.
          </Text>

          <Text style={styles.subHeading}>
            3. Những cá nhân, tổ chức có thể tiếp cận thông tin
          </Text>
          <Text style={styles.paragraph}>
            Riokupon cam kết sẽ không tiết lộ thông tin cá nhân của bạn cho bất
            kỳ bên thứ ba nào khác.
          </Text>
          <Text style={styles.paragraph}>
            Việc cung cấp thông tin cá nhân của bạn cho bên thứ ba chỉ được thực
            hiện trong những trường hợp thật sự cần thiết như sau:
          </Text>
          <Text style={styles.paragraph}>
            - Khi đối tác của Riokupon là bên cung cấp dịch vụ vận chuyển hàng
            hóa và Riokupon chỉ cung cấp những thông tin cần thiết cho hoạt động
            vận chuyển sản phẩm.
          </Text>
          <Text style={styles.paragraph}>
            - Khi có yêu cầu của các cơ quan Nhà nước có thẩm quyền.
          </Text>
          <Text style={styles.paragraph}>
            - Trong trường hợp mà Riokupon cần bảo vệ quyền và lợi ích chính
            đáng của mình trước pháp luật.
          </Text>
          <Text style={styles.paragraph}>
            - Tình huống khẩn cấp và cần thiết để bảo vệ quyền an toàn dữ liệu
            cá nhân của khách hàng.
          </Text>
          <Text style={styles.paragraph}>
            - Chuyển giao hoạt động kinh doanh (nếu có).
          </Text>

          <Text style={styles.subHeading}>
            4. Phương thức bảo vệ thông tin cá nhân
          </Text>
          <Text style={styles.paragraph}>
            Riokupon cam kết bảo vệ thông tin cá nhân của khách hàng bằng những
            phương thức phù hợp với mức độ quan trọng của từng loại thông tin,
            giúp ngăn chặn hành vi truy cập, công bố, sửa đổi hoặc sử dụng thông
            tin trái phép.
          </Text>
          <Text style={styles.paragraph}>
            Riokupon chịu mọi trách nhiệm đối với các thông tin cá nhân thuộc
            quyền sở hữu của chúng tôi, bao gồm các thông tin được chuyển đến
            các nhà cung cấp dịch vụ hiện đang thực hiện nhiệm vụ thay mặt chúng
            tôi. Khi chia sẻ thông tin cá nhân với các nhà cung cấp dịch vụ, họ
            có trách nhiệm bảo vệ thông tin bằng những biện pháp phù hợp với
            thực tiễn và Chính sách bảo mật của chúng tôi.
          </Text>

          <Text style={styles.subHeading}>5. Cam kết bảo mật</Text>
          <Text style={styles.paragraph}>
            Riokupon cam kết sẽ quản lý thông tin cá nhân và kiểm soát quy trình
            bảo mật chặt chẽ. Chúng tôi có đội ngũ nhân viên chịu trách nhiệm
            giám sát việc tuân thủ các nguyên tắc bảo mật nội bộ.
          </Text>
          <Text style={styles.paragraph}>
            Riokupon sẽ đảm bảo thông tin về Chính sách bảo mật và thực tiễn
            việc quản lý thông tin cá nhân để khách hàng dễ dàng truy cập.
          </Text>
          <Text style={styles.paragraph}>
            Dựa trên yêu cầu bằng văn bản của khách hàng, Riokupon sẽ cung cấp
            cho khách hàng quyền truy cập hợp lý vào thông tin cá nhân của khách
            hàng và bảng mô tả về việc sử dụng hoặc tiết lộ thông tin, như yêu
            cầu hoặc theo đúng quy định của pháp luật. Khách hàng cũng có thể
            xác minh tính chính xác và đầy đủ của thông tin và yêu cầu được sửa
            đổi hoặc xóa bỏ, nếu thích hợp hoặc được pháp luật cho phép.
          </Text>

          <Text style={styles.subHeading}>
            6. Giữ an toàn cho thông tin cá nhân khách hàng
          </Text>
          <Text style={styles.paragraph}>
            Thông tin cá nhân của bạn tại Riokupon sẽ được cam kết bảo mật tuyệt
            đối theo Chính sách bảo mật này và tuân theo quy định của pháp luật.
          </Text>
          <Text style={styles.paragraph}>
            Chỉ có nhân sự, người đại diện và các cá nhân liên quan của Riokupon
            mới có quyền truy cập vào những dữ liệu cá nhân của khách hàng trong
            giới hạn cho phép.
          </Text>
          <Text style={styles.paragraph}>
            Riokupon đảm bảo rằng thông tin cá nhân của khách hàng chỉ được lưu
            trữ trên các máy chủ với các biện pháp bảo vệ thích hợp để ngăn chặn
            các vi phạm an ninh.
          </Text>
          <Text style={styles.paragraph}>
            Riokupon đảm bảo thực hiện các quy trình xác minh nghiêm ngặt để
            ngăn chặn truy cập trái phép vào thông tin cá nhân mà khách hàng
            cung cấp.
          </Text>

          <Text style={styles.subHeading}>7. Quyền lợi của khách hàng</Text>
          <Text style={styles.paragraph}>
            Khách hàng có quyền truy cập vào dữ liệu cá nhân của mình mà
            Riokupon lưu trữ và yêu cầu sửa đổi nếu thông tin không chính xác
            hoặc chưa đầy đủ.
          </Text>
          <Text style={styles.paragraph}>
            Khách hàng có quyền yêu cầu Riokupon xóa thông tin cá nhân của họ
            trong những trường hợp thông tin không còn cần thiết cho mục đích
            thu thập hoặc việc lưu trữ thông tin này là trái pháp luật.
          </Text>
          <Text style={styles.paragraph}>
            Riokupon sẽ xem xét và phản hồi những yêu cầu của khách hàng trong
            thời gian hợp lý nhất có thể.
          </Text>

          <Text style={styles.heading}>Liên hệ</Text>
          <Text style={styles.paragraph}>
            Nếu bạn có bất kỳ câu hỏi nào về Chính sách bảo mật này, vui lòng
            liên hệ với chúng tôi qua email: support@riokupon.com
          </Text>

          <Text style={styles.paragraph}>
            Gọi điện đến hotline: 0819.577.577
          </Text>
          <Text style={styles.paragraph}>
            Gửi thư điện tử đến địa chỉ email: hotro@riokupon.com
          </Text>
          <Text style={styles.paragraph}>
            Cập nhật lần cuối ngày 17 tháng 4 năm 2024.
          </Text>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    height: 40,
    width: "auto",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  subSubHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default PolocyScreen;
