import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const congtrinhRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all congtrinhs"); // Sửa: message cho đúng
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM Congtrinh");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },
  

  getByMACT: async (MACT) => {
    logger.info(`Repository: Fetching congtrinh with MACT ${MACT}`); // Sửa: backticks
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM Congtrinh WHERE MACT = ?", [MACT]);
      return rows;
    } catch (err) {
      logger.error(`Repository Error: getByMACT failed for MACT ${MACT}`, err); // Sửa: backticks
      throw err;
    }
  },
  

  getByTENCT: async (TENCT) => {
    logger.info(`Repository: Fetching congtrinh with TENCT ${TENCT}`); // Sửa: backticks
    try{
        const db = await pool;
        const [rows] = await db.query("SELECT * FROM Congtrinh WHERE TENCT LIKE ?", [`%${TENCT}%`]); // Sửa: thêm [] cho params
        return rows;
    } catch (err) { // Sửa: thêm err parameter
        logger.error(`Repository Error: getByTENCT failed for ${TENCT}`, err); // Sửa: backticks
        throw err;
    }
  },
  
  
  getByNGAYKCNAM: async (nam) => {
    logger.info(`Repository: Fetching congtrinh with nam ${nam}`); // Sửa: backticks
    try{
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM Congtrinh WHERE YEAR(NGAYKC) = ?", [nam]);
      return rows;
    } catch(err){ // Sửa: thêm err parameter
      logger.error(`Repository Error: getByNGAYKCNAM failed for ${nam}`, err); // Sửa: backticks
      throw err;
    }
  }
};