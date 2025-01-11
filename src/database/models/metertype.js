"use strict";

import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class MeterType extends Model {
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