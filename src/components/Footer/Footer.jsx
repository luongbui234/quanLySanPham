import { Button, Divider } from "antd";
import React from "react";

export default function Footer() {
  return (
    <footer className="font-mono h-fit tablet:py-10 py-5 bg-[#212121] text-white">
      <div className="tablet:w-4/5 tablet:m-auto m-2 text-lg">
        <div className="flex tablet:flex-row flex-col justify-around gap-2">
          <div className="space-y-2">
            <h1 className="font-bold">HỖ TRỢ KHÁCH HÀNG</h1>
            <p>Hotline: 0877709376</p>
            <p>Email: cskh@antoree.com</p>
            <p>Phản hồi về dịch vụ: anh.pham2@antoree.com</p>
          </div>
          <div className="space-y-2">
            <h1 className="font-bold">THÔNG TIN DỊCH VỤ</h1>
            <p>Điều khoản sử dụng</p>
            <p>Chính sách bảo mật</p>
            <p>Chính sách hoàn tiền</p>
            <p>FAQs</p>
            <p>Cam kết đầu ra</p>
          </div>
          <div className="space-y-2">
            <h1 className="font-bold">KẾT NỐI VỚI ANTOREE</h1>
            <p>Cộng đồng</p>
            <Button className="bg-[#14b24c] border-0">
              Trở thành giáo viên
            </Button>
            <div className="flex justify-around">
              <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-tiktok"></i>
              <i className="fa-brands fa-twitter"></i>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="font-bold">Tải ứng dụng trên điện thoại</h1>
            <img
              _ngcontent-c3=""
              alt=""
              src="https://ant-files-v1-staging.s3.ap-southeast-1.amazonaws.com/doannh/logo_android.png"
            />
            <img
              _ngcontent-c3=""
              alt=""
              src="https://ant-files-v1-staging.s3.ap-southeast-1.amazonaws.com/doannh/logo_ios.png"
            />
          </div>
        </div>
        <Divider className="bg-white" />
        <div>
          <p>
            Công ty Giáo dục và Đào tạo ANTOREE INTERNATIONAL PTE. LTD. (MST:
            201436698Z)
          </p>
          <p>
            Trụ sở chính: 10 Anson Road, #27-15, International Plaza, Singapore
            079903
          </p>
          <p>
            Đối tác đại diện tại Việt Nam: CÔNG TY TNHH PHÁT TRIỂN GIÁO DỤC
            ANTOREE (MST: 0313769851)
          </p>
          <p>
            Trụ sở chính: 187/7 Điện Biên Phủ, P. Đa Kao, Q 1, TP Hồ Chí Minh,
            Việt Nam
          </p>
          <p>
            Văn phòng đại diện, tiếp khách và nhận thư tại TP Hồ Chí Minh: Số
            55A Trần Thái Tông, Phường 15, Quận Tân Bình, Hồ Chí Minh, Việt Nam
          </p>
        </div>
        <Divider className="bg-white" />
        <div className="tablet:text-xl text-xs flex justify-around">
          <p>© 2025 Antoree Pte.Ltd</p>
          <div className="flex gap-10">
            <p>Chính sách bảo mật</p>
            <p>Điều khoản sử dụng</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
