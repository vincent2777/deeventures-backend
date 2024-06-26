"use strict";

var _sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GiftCard extends _sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GiftCard.init({
    gcard_name: DataTypes.STRING,
    gcard_country: DataTypes.STRING,
    gcard_currency: DataTypes.STRING,
    gcard_type: DataTypes.STRING,
    gcard_sellprice: DataTypes.INTEGER,
    gcard_min_sell: DataTypes.INTEGER,
    gcard_minrate_range: DataTypes.INTEGER,
    gcard_maxrate_range: DataTypes.INTEGER,
    gcard_naira_rate_range: DataTypes.INTEGER,
    gcard_buyprice: DataTypes.INTEGER,
    gcard_image: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "GiftCards",
    tableName: "GiftCards",
    freezeTableName: true
  });
  return GiftCard;
};
//# sourceMappingURL=giftcard.js.map