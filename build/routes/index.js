"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _user_routes = _interopRequireDefault(require("./user_routes"));
var _currency_routes = _interopRequireDefault(require("./currency_routes"));
var _cryptoNetwork_routes = _interopRequireDefault(require("./cryptoNetwork_routes"));
var _transaction_routes = _interopRequireDefault(require("./transaction_routes"));
var _wallet_routes = _interopRequireDefault(require("./wallet_routes"));
var _giftCard_routes = _interopRequireDefault(require("./giftCard_routes"));
var _billPayment_routes = _interopRequireDefault(require("./billPayment_routes"));
var _cableTV_routes = _interopRequireDefault(require("./cableTV_routes"));
var _electricity_routes = _interopRequireDefault(require("./electricity_routes"));
var _network_routes = _interopRequireDefault(require("./network_routes"));
var _dataPlan_routes = _interopRequireDefault(require("./dataPlan_routes"));
var _setting_routes = _interopRequireDefault(require("./setting_routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//  Import all the required routes.

//  Initialize Express Router.
const router = (0, _express.Router)();
router.use("/users", _user_routes.default);
router.use("/currencies", _currency_routes.default);
router.use("/crypto_networks", _cryptoNetwork_routes.default);
router.use("/transactions", _transaction_routes.default);
router.use("/wallets", _wallet_routes.default);
router.use("/gift_cards", _giftCard_routes.default);
router.use("/bills_payment", _billPayment_routes.default);
router.use("/data_plans", _dataPlan_routes.default);
router.use("/cable_tvs", _cableTV_routes.default);
router.use("/electricity_companies", _electricity_routes.default);
router.use("/networks", _network_routes.default);
router.use("/settings", _setting_routes.default);
var _default = exports.default = router;
//# sourceMappingURL=index.js.map