import { sanphamRepository } from "../repositories/sanpham.repository.js";
import { SanPhamDTO } from "../dtos/sanphams/sanpham.dto.js";
import { ThongKeSanPhamDanhMucDTO } from "../dtos/danhmucs/thongkedangmuc.dto.js";
import { logger } from "../config/logger.js";
import { kh } from "zod/locales";

export const sanphamService = {
  getAllSanPhams: async () => {
    logger.info("Service: Getting all san phams");
    const sanphams = await sanphamRepository.getAll();
    return sanphams.map((sp) => new SanPhamDTO(sp));
  },


  getSanPhamByMa: async (Ma) => {
    logger.info(`Service: Getting san pham by Ma ${Ma}`);
    const sanpham = await sanphamRepository.getByMa(Ma);


    if (!sanpham) {
      logger.warn(`Service Warning: San pham ${Ma} not found`);
      throw new Error("San pham not found");
    }
    return sanpham.map((sp) => new SanPhamDTO(sp));
  },

  
  getSanPhamByMaDanhMuc: async (MaDanhMuc) => {
    logger.info(`Service: Getting san pham by Ma ${MaDanhMuc}`);
    const sanpham = await sanphamRepository.getByMaDanhMuc(MaDanhMuc);
    if(!sanpham){
        logger.warn(`Service Warning: San pham ${MaDanhMuc} not found`);
        throw new Error("San pham not found");
    }
    return sanpham.map((sp) => new SanPhamDTO(sp));
  },

  getSanPhamByTen: async (Ten) => {
    logger.info(`Service: Getting san pham by Ten ${Ten}`);
    const sanpham = await sanphamRepository.getByTen(Ten);
    if(!sanpham){
        logger.warn(`Service Warning: San pham ${Ten} not found`);
        throw new Error("San pham not found");
    }
    return sanpham.map((sp) => new SanPhamDTO(sp));
  },

  getSanPhamsWithPagination: async (page = 1, size = 10, sortBy = 'DonGia', sortOrder = 'asc') => {
    logger.info(`Service: Getting san phams with pagination - page: ${page}, size: ${size}, sort: ${sortBy},${sortOrder}`);

    const validPage = Math.max(1, parseInt(page));
    const validSize = Math.min(100, Math.max(1, parseInt(size)));
    
    const result = await sanphamRepository.getAllWithPagination(
      validPage,
      validSize,
      sortBy,
      sortOrder
    );
    
    return {
      data: result.data.map((sp) => new SanPhamDTO(sp)),
      pagination: result.pagination
    };
  },

  getThongKeSanPhamByDanhMuc: async () => {
    logger.info("Service: Getting thong ke san pham theo danh muc");
    
    const result = await sanphamRepository.getSanPhamByDanhMucthongke();
    
    const tongSanPham = result.reduce((sum, item) => {
      return sum + parseInt(item.SoLuongSanPham);
    }, 0);
    
    return {
      data: result.map(item => new ThongKeSanPhamDanhMucDTO(item)),
      summary: {
        tongDanhMuc: result.length,
        tongSanPham: tongSanPham
      }
    };
  },

  createSanPham: async (dto) => {
    logger.info(`Service: Creating new san pham ${dto.Ten}`);
    const created = await sanphamRepository.create(dto);
    return new SanPhamDTO(created);
  },

  updateSanPham: async (Ma, dto) => {
    logger.info(`Service: Updating san pham ${Ma}`);

    const existing = await sanphamRepository.getByMa(Ma);
    if (!existing) {
      logger.warn(`Service Warning: Cannot update. San pham ${Ma} not found`);
      throw new Error("San pham not found");
    }

    const updated = await sanphamRepository.update(Ma, dto);
    return new SanPhamDTO(updated);
  },

  deleteSanPham: async (Ma) => {
    logger.info(`Service: Deleting san pham ${Ma}`);

    const existing = await sanphamRepository.getByMa(Ma);
    if (!existing) {
      logger.warn(`Service Warning: Cannot delete. San pham ${Ma} not found`);
      throw new Error("San pham not found");
    }

    await sanphamRepository.delete(Ma);
    return { message: "San pham deleted successfully" };
  },
};