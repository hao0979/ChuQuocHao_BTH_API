import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const congRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all congs");
    try {

      const db = await pool;
      const [rows] = await db.query("SELECT * FROM Cong");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },
  

  create: async ({MACT, MANV, SLNGAYCONG}) => {
    logger.info(`Repository: Creating nhanvien ${MANV}`);
    try {
      const db = await pool;
      await db.query(
        "INSERT INTO Cong ( MACT ,MANV, SLNGAYCONG ) VALUES (?, ?, ?)",
        [ MACT ,MANV, SLNGAYCONG]
      );
      return { MACT ,MANV, SLNGAYCONG};
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  },
};
