'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _default = (sequelize, DataTypes) => {
  class OTP extends _sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OTP.init({
    otp: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OTP',
    tableName: 'OTP',
    freezeTableName: true
  });
  return OTP;
};
exports.default = _default;
//# sourceMappingURL=otp.js.map