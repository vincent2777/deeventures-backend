"use strict";

/*const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.APP_NODE_ENV || 'development';
const config = require(__dirname + '/../../config/dbConfig.js')[env];
const db = {};*/
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _sequelize = require("sequelize");
var _dbConfig = _interopRequireDefault(require("../../config/dbConfig"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const basename = _path.default.basename(__filename);
const env = process.env.APP_NODE_ENV || 'development';
const config = _dbConfig.default[env];
const db = {};

// Initialize Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new _sequelize.Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new _sequelize.Sequelize(config.database, config.username, config.password, config);
}

// Dynamically import models using import()
_fs.default.readdirSync(__dirname).filter(file => {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js' && file.indexOf('.test.js') === -1;
}).forEach(async file => {
  const modelPath = _path.default.join(__dirname, file);
  const model = (await (specifier => new Promise(r => r(`${specifier}`)).then(s => _interopRequireWildcard(require(s))))(modelPath)).default(sequelize, _sequelize.Sequelize.DataTypes);
  db[model.name] = model;
});

// Set associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = _sequelize.Sequelize;

// Export db using module.exports (not export default)
module.exports = db;
//# sourceMappingURL=index.js.map