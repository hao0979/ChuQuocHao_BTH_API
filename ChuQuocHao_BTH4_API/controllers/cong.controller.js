import { CreateCongDTO } from "../dtos/congs/create-cong.dto.js";
import { congService } from "../services/cong.service.js";

import { validateCreateCong } from "../validators/congs/create-cong.validator.js";

import { logger } from "../config/logger.js";



export const congController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /cong");
      const cong = await congService.getAll();
      res.json(cong);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },



  create: async (req, res) => {
    try {
      logger.info("Controller: POST / cong");
      // VALIDATE INPUT
      const validData = validateCreateCong(req.body);

      // CREATE DTO
      const dto = new CreateCongDTO(validData);

      const cong = await congService.createCong(dto);
      res.status(201).json(cong);
    } catch (err) {
      logger.error("Controller Error: create failed", err);
      res.status(400).json({ message: err.message });
    }
  },
};