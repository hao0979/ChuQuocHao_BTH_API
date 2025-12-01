import express from "express";
import * as hhController from "../controllers/hangHoaController.js";
const router = express.Router();
// --------------------------------

// --- GET Queries ---
router.get("/hanghoa/by-maloai/:maLoai", hhController.getByMaLoai);
router.get("/hanghoa/search-loai", hhController.getByTenLoai); // ?keyword=...
router.get("/hanghoa/sap-het", hhController.getSapHetHang);
router.get("/hanghoa/:maHang/gia-hien-tai", hhController.getCurrentPrice);
router.get("/hanghoa/tim-theo-gia", hhController.getByPriceRange); // ?min=...&max=...
router.get("/hanghoa/:maHang/full-info", hhController.getFullInfo);
router.get("/hanghoa/:maHang/lich-su-gia", hhController.getPriceHistory);

// --- CRUD Hàng Hóa ---
router.post("/hanghoa", hhController.crudHangHoa.create);
router.put("/hanghoa/:maHang", hhController.crudHangHoa.update);
router.delete("/hanghoa/:maHang", hhController.crudHangHoa.delete);

// --- CRUD Giá Bán ---
router.post("/giaban", hhController.crudGiaBan.create);
router.put("/giaban/:id", hhController.crudGiaBan.update);
router.delete("/giaban/:id", hhController.crudGiaBan.delete);

export default router;