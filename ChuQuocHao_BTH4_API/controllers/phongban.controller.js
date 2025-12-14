import { phongbanService } from "../services/phongban.service.js";
import { logger } from "../config/logger.js";


export const phongbanController = {
  getAll: async (req, res) => {
    try {

      logger.info("Controller: GET / phongban");
      const phongban = await phongbanService.getAll();
      res.json(phongban);

    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },
};