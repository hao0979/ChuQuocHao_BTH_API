import e from "express";
import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const sanphamRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all san pham");
    try {
      const db = await pool;
      const [rows] = await db.query(`SELECT sp.*, dm.TenDanhMuc FROM SanPham sp LEFT JOIN DanhMuc dm ON sp.MaDanhMuc = dm.MaDanhMuc`);
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },


  getByMa: async (Ma) => {
    logger.info(`Repository: Fetching san pham with Ma ${Ma}`);
    try {
      const db = await pool;
      const [rows] = await db.query(`SELECT sp.*, dm.TenDanhMuc FROM SanPham sp LEFT JOIN DanhMuc dm ON sp.MaDanhMuc = dm.MaDanhMuc WHERE sp.Ma = ?`, [Ma]);
      return rows;
    } catch (err) {
      logger.error(`Repository Error: getById failed for Ma ${Ma}`, err);
      throw err;
    }
  },


  getByMaDanhMuc: async (MaDanhMuc) => {
    logger.info(`Repository: Fetching san pham with Ma ${MaDanhMuc}`);
    try{
        const db = await pool;
        const [rows] = await db.query(`SELECT * FROM SanPham where MaDanhMuc = ?`,[MaDanhMuc])
        return rows;
    } catch{
        logger.error(`Repository Error: getById failed for MaDanhMuc ${MaDanhMuc}`, err);
        throw err;
    }
  },


  getByTen: async (Ten) => {
    logger.info(`Repository: Fetching san pham with Ten ${Ten}`);
    try{
        const db = await pool;
        const [rows] = await db.query(`SELECT * FROM SanPham where Ten LIKE ?`,[`%${Ten}%`])
        return rows;
    } catch {
        logger.error(`Repository Error: getByTen failed for Ten ${Ten}`, err);
        throw err;
    }
  },


  getAllWithPagination: async (page, size, sortBy, sortOrder) => {
    logger.info(`Repository: Fetching san pham with pagination - page: ${page}, size: ${size}, sort: ${sortBy},${sortOrder}`);
    try {
      const db = await pool;
      const offset = (page - 1) * size;
      
      const order = sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      
      const allowedSortFields = ['DonGia', 'Ten', 'Ma'];
      const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'DonGia';
      
      const query = ` SELECT sp.*, dm.TenDanhMuc FROM SanPham sp 
        LEFT JOIN DanhMuc dm ON sp.MaDanhMuc = dm.MaDanhMuc
        ORDER BY sp.${sortField} ${order} LIMIT ? OFFSET ?`;
      
      const [rows] = await db.query(query, [size, offset]);
      
      const [countResult] = await db.query('SELECT COUNT(*) as total FROM SanPham');
      const total = countResult[0].total;
      

      return {
        data: rows,
        pagination: {
          page,
          size,
          total,
          totalPages: Math.ceil(total / size)
        }
      };
    } catch (err) {
      logger.error("Repository Error: getAllWithPagination failed", err);
      throw err;
    }
  },

  
  getSanPhamByDanhMucthongke: async () => {
    logger.info("Repository: Fetching thong ke san pham theo danh muc");
    try {
      const db = await pool;
      const query = `SELECT dm.MaDanhMuc,dm.TenDanhMuc,COUNT(sp.Ma) as SoLuongSanPham
        FROM DanhMuc dm LEFT JOIN SanPham sp ON dm.MaDanhMuc = sp.MaDanhMuc
        GROUP BY dm.MaDanhMuc, dm.TenDanhMuc
        ORDER BY SoLuongSanPham DESC`;
      const [rows] = await db.query(query);
      return rows;
    } catch (err) {
      logger.error("Repository Error: getSanPhamByDanhMuc failed", err);
      throw err;
    }
  },

  create: async ({ Ten, DonGia, MaDanhMuc }) => {
    logger.info(`Repository: Creating san pham ${Ten}`);
    try {
      const db = await pool;
      await db.query("INSERT INTO SanPham (Ten, DonGia, MaDanhMuc) VALUES (?, ?, ?)",[Ten, DonGia, MaDanhMuc]);
      return { Ten, DonGia, MaDanhMuc };
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  },

  update: async (Ma, { Ten, DonGia, MaDanhMuc }) => {
    logger.info(`Repository: Updating san pham ${Ma}`);
    try {
      const db = await pool;
      await db.query("UPDATE SanPham SET Ten = ?, DonGia = ?, MaDanhMuc = ? WHERE Ma = ?",[Ten, DonGia, MaDanhMuc, Ma]);
      return { Ma, Ten, DonGia, MaDanhMuc };
    } catch (err) {
      logger.error(`Repository Error: update failed for Ma ${Ma}`, err);
      throw err;
    }
  },

  delete: async (Ma) => {
    logger.info(`Repository: Deleting san pham ${Ma}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM SanPham WHERE Ma = ?", [Ma]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete failed for Ma ${Ma}`, err);
      throw err;
    }
  },
};