### **`Running App 👟`**
1: npm start



2: http://localhost:3000

# 📌 README — API Hệ Thống

---

# 🧩 BÀI 1 — QUẢN LÝ BÁN HÀNG

### 1. Sản phẩm
- `GET /sanphams` – Lấy tất cả sản phẩm  
- `GET /sanphams/:Ma` – Lấy sản phẩm theo mã  
- `POST /sanphams` – Thêm sản phẩm  
- `PUT /sanphams/:Ma` – Cập nhật sản phẩm  
- `DELETE /sanphams/:Ma` – Xóa sản phẩm  
- `GET /sanphams/timkiem?Ten=` – Tìm sản phẩm theo tên  
- `GET /sanphams/phantrang?page=&limit=` – Phân trang  
- `GET /sanphams/thongke` – Thống kê sản phẩm theo danh mục  

### 2. Danh mục
- `GET /danhmucs` – Lấy tất cả danh mục  
- `GET /danhmucs/:MaDanhMuc/sanphams` – Lấy sản phẩm theo danh mục  


---

# 🧩 BÀI 2 — QUẢN LÝ NHÂN VIÊN

### 1. Nhân viên
- `GET /nhanviens` – Lấy tất cả nhân viên  
- `GET /nhanviens/:MANV` – Lấy nhân viên theo mã  
- `POST /nhanviens` – Thêm nhân viên  
- `PUT /nhanviens/:MANV` – Cập nhật nhân viên  
- `DELETE /nhanviens/:MANV` – Xóa nhân viên  
- `GET /nhanviens/thongke` – Thống kê nhân viên theo ngày công  
- `GET /nhanviens/:MAPB` – Lấy nhân viên theo mã phòng ban  

### 2. Phòng ban
- `GET /phongbans` – Lấy tất cả phòng ban  

### 3. Công trình
- `GET /congtrinhs` – Lấy tất cả công trình  

### 4. Công (chấm công)
- `GET /congs` – Lấy danh sách công  
- `POST /congs` – Thêm công  
