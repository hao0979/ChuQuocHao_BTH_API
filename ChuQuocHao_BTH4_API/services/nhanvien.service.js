import { nhanvienRepository } from "../repositories/nhanvien.repository.js";
import { NhanvienDTO } from "../dtos/nhanviens/nhanvien.dto.js";
import { ThongKeDTO } from "../dtos/nhanviens/nhanvienthongke.dto.js";
import { logger } from "../config/logger.js";

export const nhanvienService = {
  getAll: async () => {
    logger.info("Service: Getting all nhanvien");
    const nhanvien = await nhanvienRepository.getAll();
    return nhanvien.map((s) => new NhanvienDTO(s));
  },



  getNhanvienByMANV: async (MANV) => {
    logger.info(`Service: Getting sach by MANV ${MANV}`);
    const nhanvien = await nhanvienRepository.getByMANV(MANV);

    if (!nhanvien || nhanvien.length === 0) {
      logger.warn(`Service Warning: Nhanvien ${MANV} not found`);
      throw new Error("Nhanvien not found");
    }

    return nhanvien.map((s) => new NhanvienDTO(s));
  },

  
  getNhanvienByMAPB: async (MAPB) => {
    logger.info(`Service: Getting sach by MAPB ${MAPB}`);
    const nhanvien = await nhanvienRepository.getByMAPB(MAPB);

    if (!nhanvien || nhanvien.length === 0) {
      logger.warn(`Service Warning: Nhanvien ${MAPB} not found`);
      throw new Error("Nhanvien not found");
    }

    return nhanvien.map((s) => new NhanvienDTO(s));
  },

  getThongKeNhanvienByNgaycong: async () => {
    logger.info("Service: Getting thong ke nhan vien theo ngay cong");
    
    const kq = await nhanvienRepository.getNhanvienBythongke();
    
    const tongngaycong = kq.reduce((sum, item) => {
      return sum + parseInt(item.SONGAYCONG);
    }, 0);
    return {
      data: kq.map(item => new ThongKeDTO(item)),
      summary: {
        tongnhanvien: kq.length,
        tongngaycong: tongngaycong
      }
    };
  },

  createNhanvien: async (dto) => {
    logger.info(`Service: Creating new nhanvien ${dto.HOTEN}`);
    const created = await nhanvienRepository.create(dto);
    return new NhanvienDTO(created);
  },

  updateNhanvien: async (MANV, dto) => {
    logger.info(`Service: Updating sach ${MANV}`);

    const existing = await nhanvienRepository.getByMANV(MANV);
    if (!existing) {
      logger.warn(`Service Warning: Cannot update. Nhanvien ${MANV} not found`);
      throw new Error("Nhanvien not found");
    }

    const updated = await nhanvienRepository.update(MANV, dto);
    return new NhanvienDTO(updated);
  },

  deleteNhanvien: async (MANV) => {
    logger.info(`Service: Deleting nhanvien ${MANV}`);

    const existing = await nhanvienRepository.getByMANV(MANV);
    if (!existing) {
      logger.warn(`Service Warning: Cannot delete. Nhanvien ${MANV} not found`);
      throw new Error("Nhanvien not found");
    }

    await nhanvienRepository.delete(MANV);
    return { message: "Nhanvien deleted successfully" };
  },
};