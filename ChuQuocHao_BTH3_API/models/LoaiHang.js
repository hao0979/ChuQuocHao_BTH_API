import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const LoaiHang = sequelize.define("LoaiHang", {
  MaLoai: {
    type: DataTypes.STRING(30),
    primaryKey: true,
    allowNull: false
  },
  TenLoai: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  MoTa: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'LoaiHang', // Tên bảng trong SQL
  timestamps: false      // Tắt tự động tạo cột thời gian của Sequelize
});

export default LoaiHang;