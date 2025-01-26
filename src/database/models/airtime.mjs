"use strict";

import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class AirTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AirTime.init({
    code: DataTypes.STRING,
    airtime_isp: DataTypes.STRING,
    airtime_commission: DataTypes.FLOAT,
    airtime_image: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "AirTimes",
    tableName: "AirTimes",
    freezeTableName: true,
  });

  return AirTime;
};