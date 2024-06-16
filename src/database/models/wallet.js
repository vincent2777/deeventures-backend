"use strict";

import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wallet.belongsTo(models.Users, {
        as: "user",
        foreignKey: "user_id",
        onDelete: "CASCADE"
      });
    }
  }
  Wallet.init({
    amount: DataTypes.DOUBLE,
    currency_symbol: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Wallets',
    tableName: 'Wallets',
    freezeTableName: true
  });

  return Wallet;
};