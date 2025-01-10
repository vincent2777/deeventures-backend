"use strict";

var _sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Setting extends _sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Setting.init({
    kyclevel1_max_withdrawal: DataTypes.INTEGER,
    kyclevel2_max_withdrawal: DataTypes.INTEGER,
    kyclevel3_max_withdrawal: DataTypes.INTEGER,
    referral_commision: DataTypes.INTEGER,
    account_bank: DataTypes.STRING,
    account_number: DataTypes.STRING,
    account_name: DataTypes.STRING,
    deposit_instructions: DataTypes.STRING,
    min_withdrawal: DataTypes.FLOAT,
    clubkonect_api: DataTypes.TEXT,
    clubkonect_userid: DataTypes.STRING,
    max_withdrawal: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: "Settings",
    tableName: "Settings",
    freezeTableName: true
  });
  return Setting;
};
//# sourceMappingURL=setting.js.map