"use strict";

import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class CurrencyNetwork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CurrencyNetwork.hasMany(models.Currencies, {
        as: "currencies",
        foreignKey: "currency_network_id",
        onDelete: "CASCADE"
      });
    }
  }
  CurrencyNetwork.init({
    network_name: DataTypes.STRING,
    network_address: DataTypes.STRING,
    network_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: "CurrencyNetworks",
    tableName: "CurrencyNetworks",
    freezeTableName: true,
  });

  return CurrencyNetwork;
};