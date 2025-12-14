import { congtrinhRepository } from "../repositories/congtrinh.repository.js";
import { CongtrinhDTO } from "../dtos/congtrinhs/congtrinh.dto.js";
import { logger } from "../config/logger.js";

export const CongtrinhService = {
  getAllCongtrinh: async () => {
    logger.info("Service: Getting all Congtrinhs");
    const congtrinhs = await congtrinhRepository.getAll();
    return congtrinhs.map((u) => new CongtrinhDTO(u));
  },
  

  getCongtrinhByMACT: async (MACT) => {
    logger.info(`Service: Getting Congtrinh by MACT ${MACT}`); // Sửa: dùng backticks và ${}
    const Congtrinh = await congtrinhRepository.getByMACT(MACT);
    if (!Congtrinh || Congtrinh.length === 0) { // Sửa: thêm kiểm tra length
      logger.warn(`Service Warning: Congtrinh ${MACT} not found`);
      throw new Error("Congtrinh not found"); // Sửa: message cho đúng
    }
    return Congtrinh.map((u) => new CongtrinhDTO(u));
  },
  
  
  getCongtrinhByTENCT: async (TENCT) => {
    logger.info(`Service: Getting Congtrinh by TENCT ${TENCT}`); // Sửa: backticks
    const Congtrinh = await congtrinhRepository.getByTENCT(TENCT);
    if (!Congtrinh || Congtrinh.length === 0) {
      logger.warn(`Service Warning: Congtrinh with name ${TENCT} not found`);
      throw new Error("Congtrinh not found");
    }
    return Congtrinh.map((u) => new CongtrinhDTO(u));
  },
  
  getCongtrinhByNAMKC: async (nam) => {
    logger.info(`Service: Getting Congtrinh by nam ${nam}`); // Sửa: backticks
    const Congtrinh = await congtrinhRepository.getByNGAYKCNAM(nam);
    if(!Congtrinh || Congtrinh.length === 0){
      logger.warn(`Service Warning: Congtrinh with nam ${nam} not found`); // Sửa: message
      throw new Error("Congtrinh not found");
    }
    return Congtrinh.map((u) => new CongtrinhDTO(u));
  }
};