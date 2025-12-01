import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import LoaiHang from "./LoaiHang.js";

const HangHoa = sequelize.define("HangHoa", {
  MaHang: {
    type: DataTypes.STRING(30),
    primaryKey: true,
    allowNull: false
  },
  MaLoai: {
    type: DataTypes.STRING(30),
    allowNull: false,
    references: {
      model: 'LoaiHang',
      key: 'MaLoai'
    }
  },
  TenHang: { // Lưu ý: Trong SQL bạn viết TenHang (H hoa), code phải giống
    type: DataTypes.STRING(50)
  },
  SoLuong: {
    type: DataTypes.INTEGER,
    defaultValue: 10
  },
  SoLuongCon: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  tableName: 'HangHoa',
  timestamps: false
});

// Định nghĩa quan hệ
HangHoa.belongsTo(LoaiHang, { foreignKey: "MaLoai" });
LoaiHang.hasMany(HangHoa, { foreignKey: "MaLoai" });

export default HangHoa;