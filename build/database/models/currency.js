"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _default = (sequelize, DataTypes) => {
  class Currency extends _sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Currency.belongsTo(models.CurrencyNetworks, {
        as: "currency_networks",
        foreignKey: "currency_network_id",
        onDelete: "CASCADE"
      });
    }
  }
  Currency.init({
    currency_name: DataTypes.STRING,
    currency_buy_rate: DataTypes.FLOAT,
    currency_sell_rate: DataTypes.FLOAT,
    currency_symbol: DataTypes.STRING,
    currency_price: DataTypes.FLOAT,
    currency_is_active: DataTypes.INTEGER,
    currency_network_id: DataTypes.ARRAY(DataTypes.INTEGER),
    currency_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Currencies",
    tableName: "Currencies",
    freezeTableName: true
  });
  return Currency;
};
exports.default = _default;
//# sourceMappingURL=currency.js.map