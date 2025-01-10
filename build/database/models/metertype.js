"use strict";

var _sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MeterType extends _sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MeterType.init({
    code: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: "MeterTypes",
    tableName: "MeterTypes",
    freezeTableName: true
  });
  return MeterType;
};
//# sourceMappingURL=metertype.js.map