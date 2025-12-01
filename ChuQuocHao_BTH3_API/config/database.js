import { Sequelize } from "sequelize";
import "dotenv/config";
import { logger } from "./logger.js";

const sequelize = new Sequelize(
  process.env.MYSQL_DBNAME,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    logging: false, // Tắt log query cho gọn console
    define: {
        timestamps: false // Cấu hình chung tắt timestamps cho toàn bộ model
    }
  }
);

export default sequelize;