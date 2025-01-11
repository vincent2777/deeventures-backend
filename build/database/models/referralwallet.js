"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _default = (sequelize, DataTypes) => {
  class ReferralWallet extends _sequelize.Model {
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
exports.default = _default;
//# sourceMappingURL=referralwallet.js.map