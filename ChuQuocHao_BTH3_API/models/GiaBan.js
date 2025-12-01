import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import HangHoa from "./HangHoa.js";

const GiaBan = sequelize.define("GiaBan", {
  MaGB: {
    type: DataTypes.STRING(30),
    primaryKey: true,
    allowNull: false
  },
  MaHang: {
    type: DataTypes.STRING(30),
    allowNull: false,
    references: {
      model: 'HangHoa',
      key: 'MaHang'
    }
  },
  Gia: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  DVTinh: {
    type: DataTypes.STRING(30)
  },
  NgayBD: {
    type: DataTypes.DATEONLY, // SQL dùng DATE thì ở đây dùng DATEONLY
    defaultValue: DataTypes.NOW
  },
  NgayKT: {
    type: DataTypes.DATEONLY
  }
}, {
  tableName: 'GiaBan',
  timestamps: false
});

// Định nghĩa quan hệ
GiaBan.belongsTo(HangHoa, { foreignKey: "MaHang" });
HangHoa.hasMany(GiaBan, { foreignKey: "MaHang" });

export default GiaBan;