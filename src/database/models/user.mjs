"use strict";

import bCrypt from "bcryptjs";
import crypto from 'crypto';  // Use import syntax instead of require
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
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

      User.hasMany(models.Transactions, {
        as: "transactions",
        foreignKey: "user_id",
        onDelete: "CASCADE"
      });
    }
  }
  User.init({
    full_name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING,
    account_status: {
      type: DataTypes.ENUM('active', 'pending'),
      defaultValue: 'active', // Set default value here
    }, 
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

  // Before the Records will be created, let's do the following.
  User.beforeCreate((user) => {
    user.password = crypto.createHash('md5').update(user.password).digest('hex');
    user.reg_date = new Date().getTime();
    user.username = user.email.split("@")[0] + Math.floor(Math.random() * 900);
  });

  User.beforeUpdate((user) => {
    if (!user.changed('password')) {
      user.password = crypto.createHash('md5').update(user.password).digest('hex');
    }
  });

  // After the record is persisted and before the persisted data are returned, let's remove the "password".
  User.afterCreate((user) => {
    delete user.dataValues.password;
  });

  return User;
};
