"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _token_validation = _interopRequireDefault(require("../utils/token_validation"));
var _setting_controller = _interopRequireDefault(require("../controllers/setting_controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//  Set up Express Router.
const settingRouter = (0, _express.Router)();

//  Get settings.
settingRouter.get("/setting", _token_validation.default.userTokenValidation, _setting_controller.default.getSettings);

//  Update settings.
settingRouter.put("/update_settings", _token_validation.default.userTokenValidation, _setting_controller.default.updateSettings);
var _default = exports.default = settingRouter;
//# sourceMappingURL=setting_routes.js.map