import { Dialect, Sequelize } from "sequelize";
import config from "../config/dbconfig";

const dbName = config.development.database as string;
const dbUser = config.development.username as string;
const dbPassword = config.development.password as undefined;
const dbHost = config.development.host;
const dbDriver = config.development.dialect as Dialect;

const db = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
});

export default db;