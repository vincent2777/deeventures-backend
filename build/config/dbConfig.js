"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    dialect: "mysql",
    logging: false
    // dialect: 'mysql',
    // logging: true,
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_PORT,
    // dialect: "postgres",
    dialect: 'mysql',
    logging: false
  },
  production: {
    username: process.env.PRODUCTION_DB_USERNAME,
    password: process.env.PRODUCTION_DB_PASSWORD,
    database: process.env.PRODUCTION_DB_NAME,
    host: process.env.PRODUCTION_DB_HOST,
    port: process.env.PRODUCTION_DB_PORT,
    // username: 'root',//process.env.DEV_DB_USERNAME,
    // password: '', //process.env.DEV_DB_PASSWORD,
    // database: 'deeventures', //process.env.DEV_DB_NAME,
    // host: 'localhost',//process.env.DEV_DB_HOST,
    // port: '3307', //process.env.DEV_DB_PORT,
    // dialect: "mysql",
    dialect: 'mysql',
    logging: true
    // dialectOptions : {
    //   ssl: {
    //     require: false,
    //     rejectUnauthorized: false,
    //   },
    // },
  }
};
//# sourceMappingURL=dbConfig.js.map