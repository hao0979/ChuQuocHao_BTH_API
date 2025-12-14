import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const nhanvienRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all nhanviens");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM Nhanvien");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },


  getByMANV: async (MANV) => {
    logger.info(`Repository: Fetching user with MANV ${MANV}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM Nhanvien WHERE MANV = ?", [MANV]);
      return rows;
    } catch (err) {
      logger.error(`Repository Error: getByMANV failed for MA ${MANV}`, err);
      throw err;
    }
  },


  getByMAPB: async (MAPB) => {
    logger.info(`Repository: Fetching user with MAPB ${MAPB}`);
    try{
        const db = await pool;
        const [rows] = await db.query("SELECT * FROM Nhanvien WHERE MAPB = ?", [MAPB]);
        return rows;
    } catch(err) {
        logger.error(`Repository Error: getByMAPB failed for ${MAPB}`, err);
        throw err;
    }
  },


  getNhanvienBythongke: async () => {
    logger.info("Repository: Fetching thong ke nhanvien theo ngay cong");
    try {
      const db = await pool;
      const query = `SELECT nv.MaNV,nv.HOTEN,nv.MAPB,SUM(c.SLNGAYCONG) as SONGAYCONG
        FROM Nhanvien nv LEFT JOIN Cong c ON nv.MANV = c.MANV
        GROUP BY nv.MANV, nv.HOTEN, nv.MAPB
        ORDER BY SONGAYCONG DESC`;
      const [rows] = await db.query(query);
      return rows;
    } catch (err) {
      logger.error("Repository Error: getNhanvienBythongke failed", err);
      throw err;
    }
  },

  
  create: async ({ MANV, HOTEN, NGAYSINH, PHAI, DIACHI, MAPB }) => {
    logger.info(`Repository: Creating nhanvien ${HOTEN}`);
    try {
      const db = await pool;
      await db.query(
        "INSERT INTO Nhanvien ( MANV, HOTEN, NGAYSINH, PHAI, DIACHI, MAPB ) VALUES (?, ?, ?, ?, ?, ?)",
        [ MANV, HOTEN, NGAYSINH, PHAI, DIACHI, MAPB ]
      );
      return { MANV, HOTEN, NGAYSINH, PHAI, DIACHI, MAPB };
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  },

  update: async (MANV, { HOTEN, NGAYSINH, PHAI, DIACHI, MAPB }) => {
    logger.info(`Repository: Updating nhanvien ${MANV}`);
    try {
      const db = await pool;
      await db.query(
        "UPDATE Nhanvien SET HOTEN = ?, NGAYSINH = ?, PHAI = ?, DIACHI = ?, MAPB = ? WHERE MANV = ?",
        [ HOTEN, NGAYSINH, PHAI, DIACHI, MAPB , MANV]
      );
      return { HOTEN, NGAYSINH, PHAI, DIACHI, MAPB };
    } catch (err) {
      logger.error(`Repository Error: update failed for MASH ${MASH}`, err);
      throw err;
    }
  },

  delete: async (MANV) => {
    logger.info(`Repository: Deleting nhanvien ${MANV}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM Nhanvien WHERE MANV = ?", [MANV]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete failed for MANV ${MANV}`, err);
      throw err;
    }
  },
};
