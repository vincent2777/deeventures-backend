"use strict";

import { Model } from "sequelize";
import {generateFixedRandomID} from "../../utils/random_number_generator.mjs";

export default (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Users, {
        as: "user",
        foreignKey: "user_id",
        onDelete: "CASCADE"
      })
    }
  }
  Transaction.init({
    user_id: DataTypes.INTEGER,
    trnx_amount: DataTypes.DOUBLE,
    trnx_reference: DataTypes.TEXT,
    trnx_date: DataTypes.DATE,
    trnx_type: DataTypes.ENUM("Gift Card Sale", "Coin Purchase", "Coin Sale", "Bill Payment", "Wallet Funding", "Fund Withdrawal", "Promo Usage"),
    trnx_desc: DataTypes.STRING,
    trnx_status: DataTypes.INTEGER,
    trnx_rate: DataTypes.FLOAT,
    trnx_address: DataTypes.STRING,
    trnx_image: DataTypes.STRING,
    to_receive: DataTypes.FLOAT,
    currency: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Transactions",
    tableName: "Transactions",
    freezeTableName: true
  });

  //  Before the Records will be created, let's do the following.
  Transaction.beforeCreate((transaction) => {
    transaction.trnx_reference = "TREF-" + generateFixedRandomID(12)
    transaction.trnx_date = new Date().toISOString();
  });

  return Transaction;
};