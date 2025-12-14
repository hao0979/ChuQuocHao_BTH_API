import { CreateSanPhamDTO } from "../dtos/sanphams/create-sanpham.dto.js";
import { UpdateSanPhamDTO } from "../dtos/sanphams/update-sanpham.dto.js";
import { sanphamService } from "../services/sanpham.service.js";

import { validateCreateSanPham } from "../validators/sanphams/create-sanpham.validator.js";
import { validateUpdateSanPham } from "../validators/sanphams/update-sanpham.validator.js";

import { logger } from "../config/logger.js";

export const sanphamController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /sanphams");
      const sanphams = await sanphamService.getAllSanPhams();
      res.json(sanphams);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  getByMa: async (req, res) => {
    const Ma = +req.params.Ma;
    logger.info(`Controller: GET /sanphams/${Ma}`);


    try {
      const sanpham = await sanphamService.getSanPhamByMa(Ma);
      res.json(sanpham);
    } catch (err) {
      logger.error(`Controller Error: getById failed (${Ma})`, err);
      res.status(404).json({ message: err.message });
    }
  },


  getByMaDanhMuc: async (req, res) => {
    const MaDanhMuc = +req.params.MaDanhMuc;
    logger.info(`Controller: GET /sanphams/${MaDanhMuc}`);
    try{

        const sanpham = await sanphamService.getSanPhamByMaDanhMuc(MaDanhMuc);
        res.json(sanpham);
    } catch{
        logger.error(`Controller Error: getById failed (${MaDanhMuc})`, err);
        res.status(404).json({ message: err.message });
    }
  },

  getByTen: async (req, res) => {
    const Ten = req.query.Ten;
    logger.info(`Controller: GET /sanphams/${Ten}`);
    try{
      
        const sanpham = await sanphamService.getSanPhamByTen(Ten);
        res.json(sanpham);
    } catch{
        logger.error(`Controller Error: getByTen failed (${Ten})`, err);
        res.status(404).json({ message: err.message });
    }
  },

  getAllWithPagination: async (req, res) => {
    try {
      const { page = 1, size = 10, sort = 'donGia,asc' } = req.query;
      
      const [sortBy = 'DonGia', sortOrder = 'asc'] = sort.split(',');
      
      const sortFieldMap = {
        'dongia': 'DonGia',
        'ten': 'Ten',
        'ma': 'Ma'
      };
      
      const dbSortField = sortFieldMap[sortBy.toLowerCase()] || 'DonGia';
      
      logger.info(`Controller: GET /api/sanpham?page=${page}&size=${size}&sort=${sortBy},${sortOrder}`);
      
      const result = await sanphamService.getSanPhamsWithPagination(
        page,
        size,
        dbSortField,
        sortOrder
      );
      
      res.json(result);
    } catch (err) {
      logger.error("Controller Error: getAllWithPagination failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  getSanPhamByDanhMucthongke: async (req, res) => {
    try {
      logger.info("Controller: GET /api/thongke/sanpham-danhmuc");
      
      const result = await sanphamService.getThongKeSanPhamByDanhMuc();
      
      res.json(result);
    } catch (err) {
      logger.error("Controller Error: getSanPhamByDanhMuc failed", err);
      res.status(500).json({ 
        message: "Lỗi khi lấy thống kê",
        error: err.message 
      });
    }
  },

  create: async (req, res) => {
    try {
      logger.info("Controller: POST /sanphams");

      // VALIDATE INPUT
      const validData = validateCreateSanPham(req.body);

      // CREATE DTO
      const dto = new CreateSanPhamDTO(validData);

      const sanpham = await sanphamService.createSanPham(dto);
      res.status(201).json(sanpham);
    } catch (err) {
      logger.error("Controller Error: create failed", err);
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const Ma = +req.params.Ma;
    logger.info(`Controller: PUT /sanphams/${Ma}`);

    try {
      // VALIDATE INPUT
      const validData = validateUpdateSanPham(req.body);

      // CREATE DTO
      const dto = new UpdateSanPhamDTO(validData);

      const sanpham = await sanphamService.updateSanPham(Ma, dto);
      res.json(sanpham);
    } catch (err) {
      logger.error(`Controller Error: update failed (${Ma})`, err);
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const Ma = +req.params.Ma;
    logger.info(`Controller: DELETE /sanphams/${Ma}`);

    try {
      const result = await sanphamService.deleteSanPham(Ma);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: delete failed (${Ma})`, err);
      res.status(404).json({ message: err.message });
    }
  },
};