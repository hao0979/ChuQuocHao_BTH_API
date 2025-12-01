import { Op } from "sequelize";
import HangHoa from "../models/HangHoa.js";
import GiaBan from "../models/GiaBan.js";
import LoaiHang from "../models/LoaiHang.js";

// 1. Get các HangHoa theo MaLoai
export const getByMaLoai = async (req, res) => {
  try {
    const list = await HangHoa.findAll({ where: { MaLoai: req.params.maLoai } });
    res.json(list);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// 2. Get các HangHoa theo TenLoai (Tìm gần đúng)
export const getByTenLoai = async (req, res) => {
  try {
    const { keyword } = req.query; // Ví dụ: /api/hanghoa/search-loai?keyword=Samsung
    const list = await HangHoa.findAll({
      include: [{
        model: LoaiHang,
        where: { TenLoai: { [Op.like]: `%${keyword}%` } }
      }]
    });
    res.json(list);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// 3. Get các HangHoa sắp hết (SoLuongCon < 5)
export const getSapHetHang = async (req, res) => {
  try {
    const list = await HangHoa.findAll({ where: { SoLuongCon: { [Op.lt]: 5 } } });
    res.json(list);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// 4. Get giá bán hiện tại của 1 mã hàng
export const getCurrentPrice = async (req, res) => {
  try {
    const today = new Date();
    const price = await GiaBan.findOne({
      where: {
        MaHang: req.params.maHang,
        NgayBD: { [Op.lte]: today },
        NgayKT: { [Op.gte]: today }
      }
    });
    res.json(price || { message: "Chưa có giá áp dụng" });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// 5. Tìm hàng hóa có giá nằm trong khoảng min-max hiện tại
export const getByPriceRange = async (req, res) => {
  try {
    const { min, max } = req.query;
    const today = new Date();
    
    const list = await HangHoa.findAll({
      include: [{
        model: GiaBan,
        where: {
          Gia: { [Op.between]: [min, max] },
          NgayBD: { [Op.lte]: today },
          NgayKT: { [Op.gte]: today }
        }
      }]
    });
    res.json(list);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// 6 & 7. Lấy lịch sử giá và CRUD Giá bán
export const getPriceHistory = async (req, res) => {
  try {
    const list = await GiaBan.findAll({ where: { MaHang: req.params.maHang } });
    res.json(list);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

export const crudGiaBan = {
  create: async (req, res) => {
    try {
        const item = await GiaBan.create(req.body);
        res.status(201).json(item);
    } catch(e) { res.status(500).json(e); }
  },
  update: async (req, res) => {
    await GiaBan.update(req.body, { where: { MaGB: req.params.id } });
    res.json({ message: "Updated" });
  },
  delete: async (req, res) => {
    await GiaBan.destroy({ where: { MaGB: req.params.id } });
    res.json({ message: "Deleted" });
  }
};

// 8. Lấy full info HangHoa kèm giá hiện tại
export const getFullInfo = async (req, res) => {
  try {
    const today = new Date();
    const item = await HangHoa.findOne({
      where: { MaHang: req.params.maHang },
      include: [{
        model: GiaBan,
        required: false, // Left Join (vẫn lấy hàng hóa dù chưa có giá)
        where: {
          NgayBD: { [Op.lte]: today },
          NgayKT: { [Op.gte]: today }
        }
      }]
    });
    res.json(item);
  } catch (err) { res.status(500).json(err); }
};

// 9. CRUD HangHoa (Cơ bản)
export const crudHangHoa = {
  create: async (req, res) => {
      const item = await HangHoa.create(req.body);
      res.json(item);
  },
  update: async (req, res) => {
      await HangHoa.update(req.body, { where: { MaHang: req.params.maHang }});
      res.json({msg: "Updated"});
  },
  delete: async (req, res) => {
      await HangHoa.destroy({ where: { MaHang: req.params.maHang }});
      res.json({msg: "Deleted"});
  }
};