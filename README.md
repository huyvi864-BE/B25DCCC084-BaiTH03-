# TEI — Shop_mini bán laptop (React + TypeScript + Vite)

Dự án xây dựng cửa hàng trực tuyến **TEI** bằng React + TypeScript, áp dụng kết hợp `useState`, `Context API` và `Redux Toolkit` để quản lý state.

## 1. Cách phân chia State trong dự án & Lý do lựa chọn

### 1.1. `useState` — Dùng cho UI State cục bộ trong từng trang
* **Các biến sử dụng:**
  * `searchTerm` (ở **HomePage.tsx**): Lưu chuỗi người dùng đang gõ vào ô tìm kiếm.
  * `username`, `password`, `error` (ở **LoginPage.tsx**): Quản lý dữ liệu nhập vào form đăng nhập và câu thông báo lỗi khi nhập sai.
  * `orderSuccess` (ở **CheckoutPage.tsx**): Cờ bật/tắt màn hình thông báo sau khi bấm nút "Đặt hàng".
* **Lý do chọn `useState`:**
  * Những dữ liệu này chỉ phục vụ cho đúng một màn hình duy nhất, các component khác không cần biết tới.
  * Nếu đẩy state của ô input hay ô tìm kiếm lên Context hoặc Redux thì mỗi lần gõ 1 ký tự, cả ứng dụng hoặc nhiều component sẽ bị re-render không cần thiết. Giữ ở `useState` giúp code gọn, tối ưu hiệu năng và tự động reset khi chuyển trang.

### 1.2. `Context API` — Dùng cho State toàn cục nhưng ít thay đổi
* **Các Context sử dụng:**
  * `ThemeContext`: Lưu trạng thái giao diện `light` / `dark` và hàm `toggleTheme()`.
  * `AuthContext`: Lưu thông tin `user` đang đăng nhập cùng 2 hàm `login()` và `logout()`.
* **Lý do chọn `Context API`:**
  * Thông tin đăng nhập và giao diện Sáng/Tối cần được truy cập ở nhiều nơi cách xa nhau trong cây component (từ **Header.tsx**, **LoginPage.tsx** cho tới **ProtectedRoute.tsx** và **CheckoutPage.tsx**).
  * 2 state này **tần suất cập nhật rất ít** người dùng chỉ đăng nhập 1 lần hoặc thỉnh thoảng mới bấm đổi theme và logic chỉ là gán giá trị đơn giản. Dùng `Context API` kết hợp custom hook (`useTheme`, `useAuth`) là vừa đủ để tránh truyền props qua nhiều cấp (*prop drilling*) mà không cần viết nhiều mã cấu hình như Redux.

### 1.3. `Redux Toolkit` — Dùng cho Business Logic & Dữ liệu bất đồng bộ
* **Các Slice sử dụng:**
  * `productsSlice`: Quản lý danh sách sản phẩm (`items`) gọi từ API `https://fakestoreapi.com/products` thông qua `createAsyncThunk`, đi kèm trạng thái `status` (`idle` | `loading` | `succeeded` | `failed`) và `error`.
  * `cartSlice`: Quản lý mảng sản phẩm trong giỏ hàng (`items`) với các action `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart` và các selector tính tổng số lượng, tổng tiền.
* **Lý do chọn `Redux Toolkit`:**
  * **Với Sản phẩm (`productsSlice`):** Cần gọi dữ liệu bất đồng bộ từ API và kiểm soát chặt chẽ các trạng thái chờ tải (`loading`) hay lỗi mạng (`failed`). Lưu vào Redux giúp dữ liệu sản phẩm chỉ cần tải 1 lần và dùng chung mượt mà giữa Trang chủ và Trang chi tiết sản phẩm.
  * **Với Giỏ hàng (`cartSlice`):** Đây là phần có nhiều xử lý như thêm trùng sản phẩm thì tăng số lượng, giảm về 0 thì xóa khỏi giỏ, xóa toàn bộ khi thanh toán, đồng thời phải tính lại tổng số lượng trên **Header.tsx** và tổng tiền ở **CartPage.tsx**, **CheckoutPage.tsx**. Đặt trong Redux Toolkit giúp gom toàn bộ logic tính toán về một chỗ, dễ kiểm soát và dễ bảo trì.
