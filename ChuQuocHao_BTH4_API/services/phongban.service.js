import { phongbanRepository } from "../repositories/phongban.repository.js";
import { PhongbanDTO } from "../dtos/phongbans/phongban.dto.js";
import { logger } from "../config/logger.js";


export const phongbanService = {
  getAll: async () => {
    logger.info("Service: Getting all phongban");
    const phongban = await phongbanRepository.getAll();
    return phongban.map((s) => new PhongbanDTO(s));
  },
};