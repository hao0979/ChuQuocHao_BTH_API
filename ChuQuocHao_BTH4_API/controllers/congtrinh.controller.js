import { CongtrinhService } from "../services/congtrinh.service.js";
import { logger } from "../config/logger.js";

export const congtrinhController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /congtrinhs"); // Sửa: message cho đúng
      const congtrinhs = await CongtrinhService.getAllCongtrinh();
      res.json(congtrinhs);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },
  


  getByMACT: async (req, res) => {
    const MACT = req.params.MACT;
    logger.info(`Controller: GET /congtrinhs/MACT/${MACT}`); // Sửa: backticks
    try {
      const congtrinh = await CongtrinhService.getCongtrinhByMACT(MACT);
      res.json(congtrinh);
    } catch (err) {
      logger.error(`Controller Error: getByMACT failed (${MACT})`, err); // Sửa: backticks
      res.status(404).json({ message: err.message });
    }
  },
  


  getByTENCT: async (req, res) => {
    const TENCT = req.params.TENCT;
    logger.info(`Controller: GET /congtrinhs/TENCT/${TENCT}`); // Sửa: backticks
    try {
      const congtrinh = await CongtrinhService.getCongtrinhByTENCT(TENCT);
      res.json(congtrinh);
    } catch (err) {
      logger.error(`Controller Error: getByTENCT failed (${TENCT})`, err); // Sửa: backticks
      res.status(404).json({ message: err.message });
    }
  },
  

  
  getByNAMKCCT: async (req, res) => {
    const nam = req.params.nam;
    logger.info(`Controller: GET /congtrinhs/nam/${nam}`); // Sửa: backticks
    try {
      const congtrinh = await CongtrinhService.getCongtrinhByNAMKC(nam);
      res.json(congtrinh);
    } catch (err) {
      logger.error(`Controller Error: getByNAMKCCT failed (${nam})`, err); // Sửa: backticks
      res.status(404).json({ message: err.message });
    }
  }
};