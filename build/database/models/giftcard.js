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
      GiftCard.hasMany(models.GiftCardRates, {
        foreignKey: "gift_card_id",
        as: "rates"
      });
    }
  }
  GiftCard.init({
    gcard_name: DataTypes.STRING,
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