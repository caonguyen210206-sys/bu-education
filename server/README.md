# Cổng Host và Học viên online

## Chạy API

Từ repo Bu Education, dùng Node.js 22 trở lên. Đặt mật khẩu quản trị trong biến môi trường riêng của máy chủ.

| Biến | Giá trị |
| --- | --- |
| `BU_ADMIN_PASSWORD` | Mật khẩu Host, tối thiểu 16 ký tự |
| `BU_DATA_DIR` | Thư mục dữ liệu riêng trên ổ đĩa bền vững |
| `BU_ALLOWED_ORIGINS` | Origin của GitHub Pages, ví dụ `https://caonguyen210206-sys.github.io` |
| `HOST` và `PORT` | Địa chỉ lắng nghe của nền tảng triển khai |
| `BU_DRIVE_ROOT_ID` | ID thư mục nguồn chứa video, PDF và ghi chú |
| `BU_DRIVE_CREDENTIALS_FILE` | Đường dẫn máy chủ tới khóa JSON của tài khoản dịch vụ Google |

Chạy `node server/server.mjs`. Dùng HTTPS cho địa chỉ API công khai. Điền origin HTTPS đó vào `classApi` trong `settings.js`. Nếu có link đăng ký lớp qua Zalo, điền `zaloUrl` trong cùng tệp.

Bật Drive API trong dự án Google Cloud của tài khoản dịch vụ. Chia sẻ thư mục nguồn với email tài khoản dịch vụ ở quyền **Người xem**. Giữ khóa, mật khẩu và dữ liệu lớp trong cấu hình riêng của máy chủ.

## Vận hành

- Mở **Cổng Host**, tạo lớp theo khối và cấp mật khẩu riêng cho từng học viên.
- Drive được quét khi API khởi động và sau mỗi 15 phút. Có nút **Đồng bộ ngay** trên Host.
- Chọn lớp, chương và buổi để xếp PDF, video và ghi chú. Dùng **Chuyển chương / buổi** để đổi vị trí. Tài liệu ở vị trí mới trở về bản nháp.
- Sau buổi dạy, bấm **Mở xem lại**. Chỉ học viên đúng lớp thấy tài liệu đã mở.
- Giao bài theo chương cho cả lớp hoặc từng học viên, rồi xem kết quả trong Host.
- Mục **Người dùng tự học** hiển thị tên, khối và tiến độ của hồ sơ đã chọn chia sẻ. Học sinh có thể dừng chia sẻ từ trang Tự học. Kết quả tự luyện là dữ liệu do trình duyệt báo về.

## Thử tại máy

Đặt `HOST=127.0.0.1` và `PORT=4315`, rồi cấu hình `classApi: 'http://127.0.0.1:4315'` trong bản làm việc. Mở `http://127.0.0.1:4315/admin.html`. Mặc định API chấp nhận origin thử này khi biến `BU_ALLOWED_ORIGINS` còn trống.
