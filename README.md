# 📸 Super Sharp Shot - Menu Pro

**Super Sharp Shot** là một tiện ích mở rộng (Extension) dành cho Google Chrome / Microsoft Edge giúp bạn chụp ảnh màn hình, cắt vùng chọn tuỳ ý và lưu trực tiếp vào bộ nhớ tạm (Clipboard) với chất lượng **siêu nét**.

Khác với các công cụ chụp màn hình thông thường hay bị mờ khi dùng trên màn hình độ phân giải cao (Retina, 2K, 4K), tiện ích này tự động tính toán tỷ lệ pixel thực tế để giữ nguyên độ sắc nét tối đa của hình ảnh gốc! ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧

## ✨ Tính năng nổi bật

* **🎯 Thuật toán "Siêu Nét":** Tự động nhận diện tỷ lệ thiết bị (Device Pixel Ratio) và tắt tính năng làm mượt ảnh (`imageSmoothingEnabled = false`) giúp ảnh chụp ra luôn giữ được độ sắc cạnh, không bị mờ nhòe.
* **⚡ Thao tác siêu tốc:** Gọi công cụ cắt ảnh nhanh chóng qua **Icon trên thanh công cụ** hoặc chọn **"📸 Tick ✨"** từ Menu chuột phải (Context Menu) ở bất kỳ đâu trên trang web.
* **✂️ Giao diện Crop trực quan:** Màn hình tối (Overlay) kết hợp với khung đứt nét giúp bạn dễ dàng khoanh đúng vùng cần chụp.
* **📋 Tự động sao chép (Auto-Copy):** Ảnh sau khi cắt sẽ được chuyển thành định dạng PNG chất lượng cao nhất và lưu ngay vào Clipboard. Chỉ cần ấn `Ctrl + V` (hoặc `Cmd + V`) để dán vào tin nhắn, Word, hay Photoshop!
* **⌨️ Phím tắt tiện lợi:** Hỗ trợ nhấn `ESC` để hủy thao tác chụp ngay lập tức.

## 🚀 Hướng dẫn cài đặt (Dành cho nhà phát triển / Cài thủ công)

Vì đây là Extension tự phát triển, bạn có thể cài đặt dễ dàng qua Developer Mode:

1. Tải toàn bộ mã nguồn này về máy (Nút **Code** xanh lá cây -> **Download ZIP**) và giải nén ra một thư mục. Hoặc clone repo:
   ```bash
   git clone [https://github.com/Nguyenvu0511/super-sharp-shot.git](https://github.com/Nguyenvu0511/super-sharp-shot.git)
2. Mở trình duyệt Chrome / Edge, truy cập vào trang quản lý Tiện ích mở rộng:
 - Chrome: Nhập chrome://extensions/ vào thanh địa chỉ.

3. Bật chế độ Developer mode (Chế độ dành cho nhà phát triển) ở góc trên bên phải.
4. Click vào nút Load unpacked (Tải tiện ích đã giải nén).
5. Chọn thư mục chứa mã nguồn vừa tải về. Vậy là xong! 🎉

Cách sử dụng
1. Mở một trang web bất kỳ bạn muốn chụp ảnh.
2. Click chuột phải vào màn hình, chọn " Tick" (Hoặc bấm vào biểu tượng icon Gundam của Extension trên góc phải trình duyệt).
3. Màn hình sẽ tối lại. Nhấn giữ chuột trái và kèo để chọn vùng muốn chụp.
4. Thả chuột ra, sẽ có thông báo: "(-) đã có trong bộ nhớ tạm của bạn
5. Sang ứng dụng khác (Zalo, Messenger, Word...) và Ctrl + V để dán ảnh!
