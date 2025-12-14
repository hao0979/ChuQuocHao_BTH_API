import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const phongbanRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all phongbans");
    try {

      const db = await pool;
      const [rows] = await db.query("SELECT * FROM Phongban");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
    
  },
};
