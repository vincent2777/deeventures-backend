"use strict";

import bCrypt from "bcryptjs";
import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Wallets, {
        as: "wallet",
        foreignKey: "user_id",
        onDelete: "CASCADE"
      });
      /*User.hasOne(models.ReferralWallets, {
        as: "referralWallet",
        foreignKey: "user_id",
        onDelete: "CASCADE"
      });*/

      User.hasMany(models.Transactions, {
        as: "transactions",
        foreignKey: "user_id",
        onDelete: "CASCADE"
      })
    }
  }
  User.init({
    full_name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING,
    account_status: DataTypes.ENUM("active", "pending"),
    country: DataTypes.STRING,
    referred_by: DataTypes.STRING,
    reg_date: DataTypes.DATE,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Users",
    tableName: "Users",
    freezeTableName: true
  });

  //  Before the Records will be created, let's do the following.
  User.beforeCreate((user) => {
    user.password = bCrypt.hashSync(user.password, 10);
    user.reg_date = new Date().getTime();
    user.username = user.email.split("@")[0] + Math.floor(Math.random() * 900);
  });
  User.beforeUpdate((user) => {
    user.password = bCrypt.hashSync(user.password, 10);
  });

  //  After the record is persisted and before the persisted data are returned, let's remove the "password".
  User.afterCreate((user) => {
    delete user.dataValues.password
  });

  return User;
};