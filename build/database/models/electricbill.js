"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _default = (sequelize, DataTypes) => {
  class ElectricBill extends _sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ElectricBill.init({
    provider_id: DataTypes.STRING,
    bill_provider: DataTypes.STRING,
    bill_commission: DataTypes.FLOAT,
    bill_provider_image: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "ElectricBills",
    tableName: "ElectricBills",
    freezeTableName: true
  });
  return ElectricBill;
};
exports.default = _default;
//# sourceMappingURL=electricbill.js.map