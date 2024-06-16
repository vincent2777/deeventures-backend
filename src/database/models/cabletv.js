"use strict";

import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class CableTV extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  CableTV.init({
    cable_provider: DataTypes.STRING,
    provider_id: DataTypes.STRING,
    cable_provider_image: DataTypes.STRING,
    cable_commission: DataTypes.FLOAT,
    is_active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CableTVs',
    tableName: "CableTVs",
    freezeTableName: true,
  });

  return CableTV;
};