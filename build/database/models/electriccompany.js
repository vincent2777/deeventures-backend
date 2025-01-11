"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _default = (sequelize, DataTypes) => {
  class ElectricCompany extends _sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ElectricCompany.init({
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "ElectricCompanies",
    tableName: "ElectricCompanies",
    freezeTableName: true
  });
  return ElectricCompany;
};
exports.default = _default;
//# sourceMappingURL=electriccompany.js.map