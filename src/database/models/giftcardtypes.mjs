"use strict";

import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class GiftCardTypes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            GiftCardTypes.hasMany(models.GiftCardRates, {
                foreignKey: "gift_card_type_id",
                as: "rates",
            });
        }
    }
    GiftCardTypes.init({
        gcard_type_name: DataTypes.STRING,
        gcard_type_image: DataTypes.STRING,
        gcard_type_details: DataTypes.STRING,
        is_active: DataTypes.INTEGER,
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        sequelize,
        modelName: "GiftCardTypes",
        tableName: "GiftCardTypes",
        freezeTableName: true,
    });

    return GiftCardTypes;
};