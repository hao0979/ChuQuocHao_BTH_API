-- Cơ sở dữ liệu bài 1
CREATE DATABASE IF NOT EXISTS quan_ly_ban_hang;
USE quan_ly_ban_hang;

CREATE TABLE DanhMuc (
    MaDanhMuc INT AUTO_INCREMENT PRIMARY KEY,
    TenDanhMuc VARCHAR(255) NOT NULL
);

CREATE TABLE SanPham (
    Ma INT AUTO_INCREMENT PRIMARY KEY,
    Ten VARCHAR(255) NOT NULL,
    DonGia DECIMAL(15, 0) DEFAULT 0,
    MaDanhMuc INT,
	
    FOREIGN KEY (MaDanhMuc) REFERENCES DanhMuc(MaDanhMuc) ON DELETE SET NULL
);

INSERT INTO DanhMuc (TenDanhMuc) VALUES 
(N'Sách Văn Học Trong Nước'),
(N'Sách Văn Học Nước Ngoài'),
(N'Sách Kinh Tế - Quản Trị'),
(N'Sách Thiếu Nhi'),
(N'Sách Tâm Lý - Kỹ Năng');

INSERT INTO SanPham (Ten, DonGia, MaDanhMuc) VALUES 
(N'Dế Mèn Phiêu Lưu Ký', 50000, 1),
(N'Đất Rừng Phương Nam', 85000, 1),
(N'Số Đỏ', 60000, 1),
(N'Mắt Biếc', 110000, 1),
(N'Cánh Đồng Bất Tận', 75000, 1);

INSERT INTO SanPham (Ten, DonGia, MaDanhMuc) VALUES 
(N'Nhà Giả Kim', 79000, 2),
(N'Ông Già Và Biển Cả', 45000, 2),
(N'Rừng Na Uy', 120000, 2),
(N'Hai Số Phận', 135000, 2),
(N'Không Gia Đình', 98000, 2);

INSERT INTO SanPham (Ten, DonGia, MaDanhMuc) VALUES 
(N'Cha Giàu Cha Nghèo', 115000, 3),
(N'Đắc Nhân Tâm', 86000, 3),
(N'Nhà Đầu Tư Thông Minh', 180000, 3),
(N'Chiến Tranh Tiền Tệ', 145000, 3),
(N'Khởi Nghiệp Tinh Gọn', 110000, 3);

INSERT INTO SanPham (Ten, DonGia, MaDanhMuc) VALUES 
(N'Kính Vạn Hoa - Tập 1', 90000, 4),
(N'Harry Potter và Hòn Đá Phù Thủy', 150000, 4),
(N'Doraemon - Truyện Ngắn Tập 1', 25000, 4),
(N'Thần Đồng Đất Việt - Tập 1', 30000, 4),
(N'Pippi Tất Dài', 65000, 4);

INSERT INTO SanPham (Ten, DonGia, MaDanhMuc) VALUES 
(N'Quẳng Gánh Lo Đi Và Vui Sống', 95000, 5),
(N'Tuổi Trẻ Đáng Giá Bao Nhiêu', 80000, 5),
(N'Đời Thay Đổi Khi Chúng Ta Thay Đổi', 55000, 5),
(N'Hạt Giống Tâm Hồn', 45000, 5),
(N'Tư Duy Phản Biện', 88000, 5);

-- Cơ sở dữ liệu bài 2
CREATE DATABASE QuanLyNhanVien;
USE QuanLyNhanVien;
-- Bảng Phòng ban
CREATE TABLE Phongban (
    MAPB NVARCHAR(10) PRIMARY KEY,
    TENPB NVARCHAR(100)
);
-- Bảng Nhân viên
CREATE TABLE Nhanvien (
    MANV NVARCHAR(10) PRIMARY KEY,
    HOTEN NVARCHAR(100),
    NGAYSINH DATE,
    PHAI NVARCHAR(5),
    DIACHI NVARCHAR(200),
    MAPB NVARCHAR(10),
    FOREIGN KEY (MAPB) REFERENCES Phongban(MAPB)
);
-- Bảng Công trình
CREATE TABLE Congtrinh (
    MACT NVARCHAR(10) PRIMARY KEY,
    TENCT NVARCHAR(200),
    DIADIEM NVARCHAR(200),
    NGAYCAPGP DATE,
    NGAYKC DATE
);
-- Bảng Công
CREATE TABLE Cong (
    MACT NVARCHAR(10),
    MANV NVARCHAR(10),
    SLNGAYCONG INT,
    PRIMARY KEY (MACT, MANV),
    FOREIGN KEY (MACT) REFERENCES Congtrinh(MACT),
    FOREIGN KEY (MANV) REFERENCES Nhanvien(MANV)
);

INSERT INTO Phongban VALUES
(N'PB01', N'Hành chính'),
(N'PB02', N'Kế toán'),
(N'PB03', N'Kỹ thuật');
INSERT INTO Nhanvien VALUES
(N'NV01', N'Nguyễn Văn A', '1990-05-10', N'Nam', N'Hà Nội', N'PB01'),
(N'NV02', N'Trần Thị B', '1992-08-21', N'Nữ', N'Hải Phòng', N'PB02'),
(N'NV03', N'Lê Văn C', '1989-12-02', N'Nam', N'Đà Nẵng', N'PB03');
INSERT INTO Congtrinh VALUES
(N'CT01', N'Xây dựng nhà A', N'Hà Nội', '2022-01-15', '2022-03-01'),
(N'CT02', N'Sửa chữa đường B', N'Hải Phòng', '2021-09-20', '2021-10-01'),
(N'CT03', N'Làm cầu C', N'Đà Nẵng', '2023-02-05', '2023-03-10');
INSERT INTO Cong VALUES
(N'CT01', N'NV01', 20),
(N'CT01', N'NV02', 15),
(N'CT02', N'NV02', 18),
(N'CT03', N'NV03', 22);

INSERT INTO Phongban VALUES
(N'PB04', N'Nhân sự'),
(N'PB05', N'Kinh doanh'),
(N'PB06', N'Marketing');

INSERT INTO Nhanvien VALUES
(N'NV04', N'Phạm Thị D', '1995-07-13', N'Nữ', N'Hà Nội', N'PB04'),
(N'NV05', N'Hoàng Văn E', '1991-01-25', N'Nam', N'Nam Định', N'PB05'),
(N'NV06', N'Vũ Thị F', '1993-11-10', N'Nữ', N'Quảng Ninh', N'PB06'),
(N'NV07', N'Đặng Văn G', '1988-09-05', N'Nam', N'Hải Dương', N'PB01'),
(N'NV08', N'Bùi Thị H', '1996-03-17', N'Nữ', N'Hưng Yên', N'PB01'),
(N'NV09', N'Ngô Văn I', '1994-08-30', N'Nam', N'Thái Bình', N'PB02'),
(N'NV10', N'Đỗ Thị K', '1990-12-22', N'Nữ', N'Bắc Ninh', N'PB03'),
(N'NV11', N'Nguyễn Văn L', '1992-04-09', N'Nam', N'Hà Nội', N'PB04'),
(N'NV12', N'Phan Thị M', '1989-10-11', N'Nữ', N'Vĩnh Phúc', N'PB05');

INSERT INTO Congtrinh VALUES
(N'CT04', N'Nhà máy nước D', N'Quảng Ninh', '2022-05-01', '2022-09-15'),
(N'CT05', N'Chung cư E', N'Hà Nội', '2023-01-10', '2023-06-30'),
(N'CT06', N'Đường tránh F', N'Ninh Bình', '2021-11-01', '2022-02-20'),
(N'CT07', N'Cầu vượt G', N'Hải Dương', '2023-03-15', '2023-07-30'),
(N'CT08', N'Trường học H', N'Hưng Yên', '2022-09-10', '2023-01-25');
