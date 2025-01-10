"use strict";

var _sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DataPlan extends _sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DataPlan.init({
    network_id: DataTypes.STRING,
    data_plans_isp: DataTypes.STRING,
    data_plans_commission: DataTypes.FLOAT,
    data_plans_isp_image: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "DataPlans",
    tableName: "DataPlans",
    freezeTableName: true
  });
  return DataPlan;
};
//# sourceMappingURL=dataplan.js.map