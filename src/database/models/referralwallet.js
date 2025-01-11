"use strict";

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ReferralWallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReferralWallet.belongsTo(models.Users, {
        as: "user",
        foreignKey: "user_id",
        onDelete: "CASCADE"
      });
    }
  }
  ReferralWallet.init({
    amount: DataTypes.DOUBLE,
    currency_symbol: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: "ReferralWallets",
    tableName: "ReferralWallets",
    freezeTableName: true
  });

  return ReferralWallet;
};