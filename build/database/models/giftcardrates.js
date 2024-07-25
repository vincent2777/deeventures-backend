"use strict";

var _sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GiftCardRates extends _sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      GiftCardRates.belongsTo(models.GiftCardTypes, {
        foreignKey: "gift_card_type_id",
        as: "giftCardType"
      });
      GiftCardRates.belongsTo(models.GiftCards, {
        foreignKey: "gift_card_id",
        as: "giftCard"
      });
    }
  }
  GiftCardRates.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    gift_card_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gift_card_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    min_sell: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    default_naira_rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    min_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    max_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    naira_rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    fixed_price_value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    fixed_price_rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    gcard_currency_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gcard_currency_sym: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gcard_country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: "GiftCardRates",
    tableName: "GiftCardRates",
    freezeTableName: true
  });
  return GiftCardRates;
};
//# sourceMappingURL=giftcardrates.js.map