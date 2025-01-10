"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _token_validation = _interopRequireDefault(require("../utils/token_validation"));
var _dataPlan_controller = _interopRequireDefault(require("../controllers/dataPlan_controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//  Set up Express Router.
const dataPlanRouter = (0, _express.Router)();

//  Create cable tv.
dataPlanRouter.post("/create_data_plan", _token_validation.default.userTokenValidation, _dataPlan_controller.default.createDataPlan);

//  Get all cable tv.
dataPlanRouter.get("/all_data_plan", _token_validation.default.userTokenValidation, _dataPlan_controller.default.getDataPlans);

//  Get single cable tv.
dataPlanRouter.get("/single_data_plan/:code", _token_validation.default.userTokenValidation, _dataPlan_controller.default.getDataPlan);
var _default = exports.default = dataPlanRouter;
//# sourceMappingURL=dataPlan_routes.js.map