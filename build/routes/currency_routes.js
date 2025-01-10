"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _currency_controller = _interopRequireDefault(require("../controllers/currency_controller"));
var _token_validation = _interopRequireDefault(require("../utils/token_validation"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//  Set up Express Router.
const currencyRouter = (0, _express.Router)();

//  Create Currency.
currencyRouter.post("/create_currency", _token_validation.default.userTokenValidation, _currency_controller.default.createCurrency);

//  Get all Currencies.
currencyRouter.get("/all_currencies", _token_validation.default.userTokenValidation, _currency_controller.default.getCurrencies);

//  Get a single Currency.
currencyRouter.get("/single_currency/:id", _token_validation.default.userTokenValidation, _currency_controller.default.getCurrency);

//  Update a Currency.
currencyRouter.put("/update_currency/:id", _token_validation.default.userTokenValidation, _currency_controller.default.updateCurrency);

//  Delete a Currency.
currencyRouter.delete("/delete_currency/:id", _token_validation.default.userTokenValidation, _currency_controller.default.deleteCurrency);
var _default = exports.default = currencyRouter;
//# sourceMappingURL=currency_routes.js.map