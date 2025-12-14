import { Router } from "express";
import { sanphamController } from "../controllers/sanpham.controller.js";
import { congtrinhController } from "../controllers/congtrinh.controller.js";
import { danhmucController } from "../controllers/danhmuc.controller.js";
import { nhanvienController } from "../controllers/nhanvien.controller.js";
import { phongbanController } from "../controllers/phongban.controller.js";
import { congController } from "../controllers/cong.controller.js";

const router = Router();
//Nguoi dung


//Quan_ly_ban_hang
//-------------------1.10----------------------
router.get("/sanphams/thongke", sanphamController.getSanPhamByDanhMucthongke);
//-------------------1.9-----------------------
router.get("/sanphams/phantrang", sanphamController.getAllWithPagination);
//-------------------1.8-----------------------
router.get("/sanphams/timkiem", sanphamController.getByTen); //?Ten = 
//-------------------1.1-----------------------
router.get("/sanphams", sanphamController.getAll);
//-------------------1.3-----------------------
router.get("/danhmucs", danhmucController.getAll);
//-------------------1.4-----------------------
router.get("/danhmucs/:MaDanhMuc/sanphams", sanphamController.getByMaDanhMuc);
//-------------------1.5-----------------------
router.post("/sanphams", sanphamController.create);
//-------------------1.6-----------------------
router.put("/sanphams/:Ma", sanphamController.update);
//-------------------1.7-----------------------
router.delete("/sanphams/:Ma", sanphamController.delete);
//-------------------1.2-----------------------
router.get("/sanphams/:Ma", sanphamController.getByMa);


//Quan ly nhan vien
//-------------------1.10----------------------
router.get("/nhanviens/thongke", nhanvienController.getNhanvienByNgaycongthongke);
//-------------------1.1-----------------------
router.get("/nhanviens", nhanvienController.getAll);
//-------------------1.3-----------------------
router.post("/nhanviens", nhanvienController.create);
//-------------------1.4-----------------------
router.put("/nhanviens/:MANV", nhanvienController.update);
//-------------------1.5-----------------------
router.delete("/nhanviens/:MANV", nhanvienController.delete);
//-------------------1.6-----------------------
router.get("/nhanviens/:MAPB", nhanvienController.getByMAPB);
//-------------------1.7-----------------------
router.get("/phongbans", phongbanController.getAll);
//-------------------1.8-----------------------
router.get("/congtrinhs", congtrinhController.getAll);
//-------------------1.9-----------------------
router.get("/congs", congController.getAll);
router.post("/congs", congController.create);
//-------------------1.2-----------------------
router.get("/nhanviens/:MANV", nhanvienController.getByMANV);
export default router;
