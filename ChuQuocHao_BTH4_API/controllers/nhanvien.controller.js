import { CreateNhanvienDTO } from "../dtos/nhanviens/create-nhanvien.dto.js";
import { UpdateNhanvienDTO } from "../dtos/nhanviens/update-nhanvien.dto.js";
import { nhanvienService } from "../services/nhanvien.service.js";

import { validateCreateNhanvien } from "../validators/nhanviens/create-nhanvien.validator.js";
import { validateUpdateNhanvien } from "../validators/nhanviens/update-nhanvien.validator.js";

import { logger } from "../config/logger.js";

export const nhanvienController = {
  getAll: async (req, res) => {
    try {

      logger.info("Controller: GET /nhanvien");
      const nhanvien = await nhanvienService.getAll();
      res.json(nhanvien);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },


  getByMANV: async (req, res) => {
    const MANV = req.params.MANV;
    logger.info(`Controller: GET /nhanviens/${MANV}`);

    try {

      const nhanvien = await nhanvienService.getNhanvienByMANV(MANV);
      res.json(nhanvien);
    } catch (err) {
      logger.error(`Controller Error: getByMA failed (${MANV})`, err);
      res.status(404).json({ message: err.message });
    }

  },

  getByMAPB: async (req, res) => {
    const MAPB = req.params.MAPB;
    logger.info(`Controller: GET /nhanviens/${MAPB}`);


    try {
      const nhanvien = await nhanvienService.getNhanvienByMAPB(MAPB);
      res.json(nhanvien);
    } catch (err) {
      logger.error(`Controller Error: getByMAPB failed (${MAPB})`, err);
      res.status(404).json({ message: err.message });
    }
  },


  getNhanvienByNgaycongthongke: async (req, res) => {
    try {
      logger.info("Controller: GET /api/thongke/nhanvien-ngaycong");
      
      const kq = await nhanvienService.getThongKeNhanvienByNgaycong();
      
      res.json(kq);
    } catch (err) {
      logger.error("Controller Error: getNhanvienByNgaycong failed", err);
      res.status(500).json({ 
        message: "Lỗi khi lấy thống kê",
        error: err.message 
      });
    }
  },

  
  create: async (req, res) => {
    try {
      logger.info("Controller: POST /nhanvien");
      // VALIDATE INPUT
      const validData = validateCreateNhanvien(req.body);

      // CREATE DTO
      const dto = new CreateNhanvienDTO(validData);

      const nhanvien = await nhanvienService.createNhanvien(dto);
      res.status(201).json(nhanvien);
    } catch (err) {
      logger.error("Controller Error: create failed", err);
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const MANV = req.params.MANV;
    logger.info(`Controller: PUT /sach/${MANV}`);

    try {
      // VALIDATE INPUT
      const validData = validateUpdateNhanvien(req.body);

      // CREATE DTO
      const dto = new UpdateNhanvienDTO(validData);

      const nhanvien = await nhanvienService.updateNhanvien(MANV, dto);
      res.json(nhanvien);
    } catch (err) {
      logger.error(`Controller Error: update failed (${MANV})`, err);
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const MANV = req.params.MANV;
    logger.info(`Controller: DELETE /nhanvien/${MANV}`);

    try {
      const result = await nhanvienService.deleteNhanvien(MANV);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: delete failed (${MANV})`, err);
      res.status(404).json({ message: err.message });
    }
  },
};