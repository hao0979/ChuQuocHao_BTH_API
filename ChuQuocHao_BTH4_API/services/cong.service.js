import { congRepository } from "../repositories/cong.repository.js";
import { CongDTO } from "../dtos/congs/cong.dto.js";
import { logger } from "../config/logger.js";

export const congService = {
  getAll: async () => {
    logger.info("Service: Getting all nhanvien");
    const cong = await congRepository.getAll();
    return cong.map((s) => new CongDTO(s));
  },

  
  
  createCong: async (dto) => {
    logger.info(`Service: Creating new cong ${dto.MANV}`);
    const created = await congRepository.create(dto);
    return new CongDTO(created);
  },
};