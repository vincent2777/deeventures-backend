"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _token_validation = _interopRequireDefault(require("../utils/token_validation"));
var _billPayment_controller = _interopRequireDefault(require("../controllers/billPayment_controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//  Set up Express Router.
const billPaymentRouter = (0, _express.Router)();

//  Buy Airtime.
billPaymentRouter.post("/buy_airtime", _token_validation.default.userTokenValidation, _billPayment_controller.default.buyAirtime);

//  Get Data Bundles.
billPaymentRouter.get("/all_data_bundles", _token_validation.default.userTokenValidation, _billPayment_controller.default.getDataBundles);
//  Buy Data Bundle.
billPaymentRouter.post("/buy_data_bundle", _token_validation.default.userTokenValidation, _billPayment_controller.default.buyDataBundle);

//  Get Cable TVs.
billPaymentRouter.get("/all_cable_tv", _token_validation.default.userTokenValidation, _billPayment_controller.default.getCableTV);
//  Buy Cable TV.
billPaymentRouter.post("/buy_cable_tv", _token_validation.default.userTokenValidation, _billPayment_controller.default.buyCableTV);

//  Get Electric Companies.
billPaymentRouter.get("/all_electric_companies", _token_validation.default.userTokenValidation, _billPayment_controller.default.getElectricCompanies);
//  Buy Electricity.
billPaymentRouter.post("/buy_electricity", _token_validation.default.userTokenValidation, _billPayment_controller.default.buyElectricity);
var _default = exports.default = billPaymentRouter;
//# sourceMappingURL=billPayment_routes.js.map