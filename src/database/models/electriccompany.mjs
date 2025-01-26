"use strict";

import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class ElectricCompany extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ElectricCompany.init({
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "ElectricCompanies",
    tableName: "ElectricCompanies",
    freezeTableName: true,
  });

  return ElectricCompany;
};