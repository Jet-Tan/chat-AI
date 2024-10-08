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

const TermsOfUse = () => {
  return (
    <View style={styles.appContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: "https://riokupon.com/vn/assets/logo.png" }}
            style={styles.logo}
          />
          <Text style={styles.title}>Điều khoản sử dụng Riokupon</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>
            1. Quy định chung về việc sử dụng Riokupon
          </Text>
          <Text style={styles.paragraph}>
            Riokupon được phát triển và vận hành bởi Công ty TNHH Thiết Kế Quản
            Lý Và Quảng Cáo Dimaco. Chúng tôi cung cấp mã giảm giá, chương trình
            hoàn tiền và nhiều hình thức tặng thưởng khác cho người khi họ tham
            gia mua sắm qua Riokupon. Người dùng đăng ký tài khoản Riokupon và
            sử dụng các dịch vụ do Riokupon cung cấp phải tuân theo các Điều
            kiện & Điều khoản này.
          </Text>
          <Text style={styles.paragraph}>
            Điều kiện & Điều khoản này cấu thành một Thỏa Thuận pháp lý ràng
            buộc giữa từng cá nhân tham gia và sử dụng dịch vụ Riokupon. Bằng
            việc tham gia và sử dụng bất kỳ dịch vụ nào tại Riokupon, đồng nghĩa
            với việc bạn đã đọc, đã hiểu và đồng ý bị ràng buộc bởi Thỏa Thuận
            này.
          </Text>
          <Text style={styles.paragraph}>
            Riokupon có thể điều chỉnh Thỏa Thuận này theo thời gian, và việc
            tiếp tục duy trì tài khoản tại Riokupon và sử dụng một trong các
            dịch vụ của chúng tôi nghĩa là bạn đã chấp thuận những điều chỉnh
            (nếu có) và sẽ tuân thủ theo điều khoản đó.
          </Text>
          <Text style={styles.sectionTitle}>2. Quyền sử dụng dịch vụ</Text>
          <Text style={styles.paragraph}>
            Quyền truy cập và sử dụng các dịch vụ tại Riokupon chỉ phục vụ duy
            nhất cho cá nhân bạn. Căn cứ vào Thỏa Thuận này, Riokupon cho phép
            bạn có thể hủy ngang, không độc quyền và không thể chuyển nhượng tài
            khoản. Riokupon vẫn sẽ bảo lưu các quyền trên của bạn khi hệ thống
            có thay đổi hoặc nâng cấp.
          </Text>
          <Text style={styles.sectionTitle}>3. Tài khoản Riokupon</Text>
          <Text style={styles.paragraph}>
            Riokupon chỉ chấp nhận mỗi cá nhân sử dụng một tài khoản duy nhất.
            Cụ thể:
          </Text>
          <Text style={styles.paragraph}>
            - Mỗi số điện thoại di động chỉ có thể kết nối với một tài khoản
            Riokupon;
          </Text>
          <Text style={styles.paragraph}>
            - Mỗi tài khoản thanh toán (ví dụ tài khoản ngân hàng, tài khoản
            Momo) chỉ có thể kết nối với một tài khoản Riokupon.
          </Text>
          <Text style={styles.paragraph}>
            Hệ thống sẽ đình chỉ tài khoản và đóng quỹ điểm tích lũy của bạn nếu
            phát hiện bạn có hành vi bất thường hoặc có dấu hiệu gian lận nhằm
            trục lợi từ các chương trình do Riokupon triển khai.
          </Text>
          <Text style={styles.sectionTitle}>4. Điều kiện về hoàn tiền</Text>
          <Text style={styles.paragraph}>
            Riokupon cung cấp nhiều dịch vụ hỗ trợ mua sắm online, trong đó có
            chương trình mua sắm nhận hoàn tiền. Điều kiện bắt buộc để người
            dùng có thể nhận hoàn tiền tại Riokupon là đăng ký và duy trì tài
            khoản cá nhân tại Riokupon.
          </Text>
          <Text style={styles.paragraph}>
            Riokupon khuyến khích bạn kiểm tra số tiền hoàn (dự kiến) của sản
            phẩm trước khi mua sắm để nắm rõ các thông tin:
          </Text>
          <Text style={styles.paragraph}>
            - Ngành hàng, sản phẩm bạn muốn mua có nằm trong chính sách nhận
            hoàn tiền không?
          </Text>
          <Text style={styles.paragraph}>
            - Số tiền hoàn dự kiến mà bạn có thể nhận được khi mua sắm sản phẩm
            này qua Riokupon.
          </Text>
          <Text style={styles.paragraph}>
            Bạn cũng nên tham khảo chính sách hoàn tiền từ Nhà bán hàng và sàn
            thương mại điện tử (TMĐT) để nắm rõ thông tin:
          </Text>
          <Text style={styles.paragraph}>
            - Tỷ lệ hoàn tiền được áp dụng đối với ngành hàng, sản phẩm mà bạn
            muốn mua sắm.
          </Text>
          <Text style={styles.paragraph}>
            - Những điều nên và không nên làm trong quá trình mua sắm để đảm bảo
            đơn hàng được ghi nhận hoàn tiền.
          </Text>
          <Text style={styles.paragraph}>
            Chúng tôi không đảm bảo hoàn tiền cho tất cả các giao dịch bạn mua
            sắm qua Riokupon, vì điều này phụ thuộc vào chính sách từ sàn TMĐT
            và nhà bán hàng. Chúng tôi chỉ có thể đưa ra cho bạn một vài lưu ý
            nhằm hạn chế tình trạng đơn hàng của bạn không được ghi nhận hoàn
            tiền:
          </Text>
          <Text style={styles.paragraph}>
            - Truy cập vào ứng dụng Riokupon và gửi link sản phẩm trước khi mua
            sắm.
          </Text>
          <Text style={styles.paragraph}>
            - Chỉ đặt 01 đơn hàng duy nhất trong 01 thao tác gửi link mua sắm.
          </Text>
          <Text style={styles.paragraph}>
            - Chỉ sử dụng các voucher hợp lệ từ Riokupon, nhà bán hàng và sàn
            TMĐT.
          </Text>
          <Text style={styles.paragraph}>
            - Không truy cập vào bất kỳ đường dẫn, website, hình ảnh quảng
            cáo,... nào sau khi được điều hướng mua sắm qua sàn từ Riokupon.
          </Text>
          <Text style={styles.paragraph}>
            - Hãy đảm bảo tất cả các thao tác của bạn từ khi bắt đầu đến khi kết
            thúc mua sắm đều phải được thực hiện trên cùng một thiết bị. Nếu bạn
            cần thay đổi thiết bị trong quá trình mua sắm, hãy thao tác lại từ
            đầu.
          </Text>
          <Text style={styles.paragraph}>
            - Khi mua sắm các sản phẩm có gắn tag live, tag video sẽ không được
            nhận hoàn tiền từ Riokupon.
          </Text>
          <Text style={styles.paragraph}>
            Tuy nhiên, đơn hàng của bạn vẫn có thể nằm trong danh sách đơn hàng
            không được ghi nhận hoàn tiền (chiếm tỷ lệ 5%) bởi nhiều yếu tố khác
            như:
          </Text>
          <Text style={styles.paragraph}>
            - Đơn hàng bị sàn TMĐT cho là không hợp lệ với chương trình hoặc có
            biểu hiện gian lận.
          </Text>
          <Text style={styles.paragraph}>
            - Thao tác mua sắm của bạn không đảm bảo thời gian quy định.
          </Text>
          <Text style={styles.sectionTitle}>5. Các chính sách từ đối tác</Text>
          <Text style={styles.paragraph}>
            Khi bạn mua sắm trên các sàn TMĐT (dù có hay không thông qua
            Riokupon), đều phải tuân theo các Chính sách, Điều kiện & Điều khoản
            hiện hành của sàn TMĐT. Riokupon không phải là đại diện của bất kỳ
            đối tác nào, nghĩa là các đối tác ấy hoạt động độc lập và không
            thuộc quyền kiểm soát của chúng tôi. Theo đó, việc bạn tham gia các
            chương trình ưu đãi hoặc khuyến mãi của đối tác thì đó chính là sự
            tham gia giữa cá nhân bạn và đối tác liên quan mà thôi.
          </Text>
          <Text style={styles.paragraph}>
            Riokupon không có nghĩa vụ và không chịu bất cứ trách nhiệm nào về
            các chương trình khuyến mãi, thay đổi chính sách hoàn tiền bắt nguồn
            từ phía đối tác và có ảnh hưởng đến khách hàng của Riokupon.
          </Text>
          <Text style={styles.paragraph}>
            Riokupon cũng không chịu trách nhiệm đối với bất kỳ nội dung, sản
            phẩm hoặc dịch vụ nào do phía đối tác cung cấp.
          </Text>
          <Text style={styles.sectionTitle}>
            6. Quy định về hoàn tiền tại Riokupon
          </Text>
          <Text style={styles.paragraph}>
            Số tiền hoàn bạn nhận được khi mua sắm tại Riokupon là không cố
            định. Giá trị hoàn tiền phụ thuộc vào tổng giá trị đơn hàng, chính
            sách từ nhà bán hàng và chính sách từ sàn TMĐT. Bạn có thể tham khảo
            giá trị tiền hoàn dự kiến trước khi bạn mua sắm.
          </Text>
          <Text style={styles.paragraph}>
            Để đổi số tiền hoàn này thành tiền mặt, bạn phải đảm bảo duy trì một
            tài khoản đang hoạt động tại Riokupon. Đồng thời, bạn cũng phải cung
            cấp các thông tin cần thiết để hệ thống xử lý việc đổi tiền (Ví dụ:
            số tài khoản ngân hàng hợp lệ hoặc tài khoản Momo).
          </Text>
          <Text style={styles.sectionTitle}>
            7. Bản chất của việc hoàn tiền
          </Text>
          <Text style={styles.paragraph}>
            Bạn không có quyền sở hữu đối với bất kỳ khoản tiền hoặc tài sản nào
            do Riokupon nắm giữ, bao gồm số tích điểm hiện có trong quỹ chính
            tài khoản Riokupon của bạn. Các quyền và lợi ích của bạn chỉ giới
            hạn trong việc nhận hoàn trả cá nhân hoặc theo hợp đồng đối với các
            khoản giảm giá, ưu đãi, phần thưởng hoặc các khoản tiền khác mà đối
            tác của chúng tôi hoặc chúng tôi đã cam kết với bạn.
          </Text>

          <Text style={styles.sectionTitle}>8. Bảo vệ dữ liệu cá nhân</Text>
          <Text style={styles.paragraph}>
            Dữ liệu cá nhân được thu thập và bảo vệ căn cứ theo Chính Sách Bảo
            Mật của Riokupon và được hợp nhất tại đây.
          </Text>

          <Text style={styles.sectionTitle}>9. Gian lận</Text>
          <Text style={styles.paragraph}>
            Riokupon sẽ đình chỉ hoặc khoá tài khoản của bạn nếu chúng tôi phát
            hiện bạn có biểu hiện gian lận hoặc không trung thực. Nếu bạn hoặc
            người thay mặt bạn có bất kỳ sự gian lận, không trung thực hoặc lạm
            dụng liên quan đến việc sử dụng các dịch vụ hoặc tài khoản tại
            Riokupon; hoặc cung cấp thông tin sai lệch đến Riokupon đều bị chấm
            dứt tài khoản và tịch thu toàn bộ số điểm thưởng mà bạn đã tích lũy
            được trong tài khoản.
          </Text>

          <Text style={styles.sectionTitle}>10. Quyền của bên thứ ba</Text>
          <Text style={styles.paragraph}>
            Một người không phải là một bên của Thỏa Thuận này không có quyền
            thực thi bất kỳ điều khoản nào trong Thỏa Thuận này.
          </Text>

          <Text style={styles.sectionTitle}>11. Trao đổi</Text>
          <Text style={styles.paragraph}>
            Bằng việc trở thành người dùng của Riokupon, bạn đồng ý nhận các
            trao đổi, thông báo liên quan đến tài khoản và người dùng (ví dụ các
            thông báo về đơn hàng của bạn được nhận hoàn tiền, thông báo
            Riokupon đã xử lý đổi thưởng thành công vào tài khoản của bạn,...)
            cũng như những email liên quan đến các sự kiện khuyến mãi, chương
            trình mới từ Riokupon.
          </Text>
          <Text style={styles.paragraph}>
            Chúng tôi có thể trao đổi với bạn về tài khoản của bạn bằng các trao
            đổi điện tử hoặc trực tiếp sử dụng các thông tin bạn đã cung cấp
            trong quá trình đăng ký. Bạn đồng ý nhận các trao đổi điện tử bao
            gồm thông báo hoặc thông tin khác mà chúng tôi được pháp luật yêu
            cầu cung cấp cho bạn dưới dạng văn bản hoặc các hình thức nội dung
            khác.
          </Text>

          <Text style={styles.sectionTitle}>12. Quyền sở hữu</Text>
          <Text style={styles.paragraph}>
            Tất cả các quyền, quyền lợi hợp pháp, và lợi ích trong các dịch vụ
            tại Riokupon, các nội dung trên các nền tảng tương tự đều thuộc về
            Riokupon. Ngoài ra, Riokupon duy trì tất cả quyền, quyền lợi hợp
            pháp và lợi ích của từ “RIOKUPON”, logo hoặc bất kỳ nhãn, nhãn dịch
            vụ, nhãn hiệu, hoặc biểu tượng nào của Riokupon.
          </Text>
          <Text style={styles.paragraph}>
            Biểu tượng Riokupon không được sử dụng cùng với bất kỳ sản phẩm hoặc
            dịch vụ không phải của Riokupon dù theo bất kỳ hình thức nào có khả
            năng gây nhầm lẫn cho khách hàng, hoặc gây ảnh hưởng xấu, làm mất uy
            tín của Riokupon.
          </Text>

          <Text style={styles.sectionTitle}>13. Tiêu chuẩn cộng đồng</Text>
          <Text style={styles.paragraph}>
            Bằng cách tạo một tài khoản Riokupon, bạn đã trở thành một thành
            viên của một cộng đồng. Cộng đồng này phụ thuộc vào ý chí và năng
            lực hành vi của mỗi người dùng.
          </Text>
          <Text style={styles.paragraph}>
            Riokupon mong rằng mỗi thành viên sẽ có trách nhiệm với hành động và
            lời nói của mình để cùng xây dựng một cộng đồng thật bền vững.
          </Text>
          <Text style={styles.paragraph}>
            Nghiêm cấm các bình luận công kích cá nhân, sử dụng ngôn từ gây thù
            ghét hoặc bắt nạt. Người dùng nào vi phạm điều khoản này thì sẽ bị
            khoá tài khoản tại Riokupon.
          </Text>

          <Text style={styles.sectionTitle}>14. Bồi thường</Text>
          <Text style={styles.paragraph}>
            Bạn đồng ý bồi thường cho Riokupon hoặc bất kỳ đối tác thương mại
            nào về các khiếu nại, hành động tố tụng, các thiệt hại, tổn thất
            phát sinh từ phía bạn hoặc liên quan đến vi phạm của bạn đối với
            Thỏa Thuận này.
          </Text>

          <Text style={styles.sectionTitle}>
            15. Miễn trừ trách nhiệm bảo đảm
          </Text>
          <Text style={styles.paragraph}>
            Riokupon không bảo đảm tất cả các dịch vụ, nội dung và hệ thống dưới
            bất kỳ hình thức nào. Chúng tôi không bảo đảm về chất lượng, độ
            chính xác, tính đầy đủ, độ tin cậy hoặc tính hợp lệ của các dịch vụ,
            nội dung hệ thống Riokupon.
          </Text>

          <Text style={styles.sectionTitle}>
            16. Đăng nhập sử dụng sinh trắc học, sử dụng điện thoại hoặc thông
            tin đăng nhập của bên thứ ba
          </Text>
          <Text style={styles.paragraph}>
            Bạn có thể lựa chọn cho phép truy cập vào tài khoản Riokupon của bạn
            thông qua thông tin đăng nhập của bên thứ ba (ví dụ: Facebook hoặc
            Google) hoặc qua điện thoại của bạn (bằng cách sử dụng mật khẩu
            thiết bị hoặc dữ liệu sinh trắc học). Vì vậy, bạn cần bảo vệ thiết
            bị di động của mình.
          </Text>

          <Text style={styles.sectionTitle}>17. Chuyển nhượng</Text>
          <Text style={styles.paragraph}>
            Bạn không được chuyển nhượng (toàn bộ hay từng phần) quyền và nghĩa
            vụ của bạn theo Thỏa Thuận này mà chưa có sự đồng ý từ Riokupon. Bất
            kỳ sự tự ý chuyển nhượng nào cũng sẽ bị vô hiệu.
          </Text>

          <Text style={styles.sectionTitle}>18. Từ bỏ, hiệu lực từng phần</Text>
          <Text style={styles.paragraph}>
            Khi bạn không tuân thủ bất kỳ điều khoản nào trong Thỏa Thuận này
            thì không có nghĩa là Riokupon từ bỏ điều khoản đó.
          </Text>

          <Text style={styles.sectionTitle}>
            19. Tính toàn vẹn của Điều khoản & Điều kiện
          </Text>
          <Text style={styles.paragraph}>
            Thỏa Thuận này thể hiện toàn bộ thỏa thuận giữa Riokupon và các bên
            liên quan. Riokupon bảo lưu quyền sửa đổi Thỏa Thuận này bất cứ lúc
            nào.
          </Text>
          <Text
            style={[
              styles.paragraph,
              { fontStyle: "italic", fontWeight: "bold" },
            ]}
          >
            Cập nhật ngày 16/4/2024
          </Text>
          <Text
            style={[
              styles.paragraph,
              { fontStyle: "italic", fontWeight: "bold" },
            ]}
          >
            Thông tin liên hệ:
          </Text>
          <Text style={styles.paragraph}>
            Doanh nghiệp: Công ty TNHH Thiết kế và Quản lý Quảng cáo Dimaco
          </Text>
          <Text style={styles.paragraph}>
            Địa chỉ: Số 18/4 Trần Văn Hoàng, Phường 9, Quận Tân Bình, Thành phố
            Hồ Chí Minh, Việt Nam
          </Text>
          <Text style={styles.paragraph}>SĐT: 0819.577.577</Text>
          <Text style={styles.paragraph}>Email: hotro@riokupon.com</Text>
          <Text style={styles.paragraph}>
            Trường hợp bạn cần hỗ trợ thêm các vấn đề khi sử dụng Riokupon, vui
            lòng liên hệ{" "}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL("https://m.me/riokupon")}
            >
              TẠI ĐÂY
            </Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 8,
  },
  link: {
    fontWeight: "bold",
    color: "blue",
  },
});

export default TermsOfUse;
