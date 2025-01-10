"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _currencyNetwork_controller = _interopRequireDefault(require("../controllers/currencyNetwork_controller"));
var _token_validation = _interopRequireDefault(require("../utils/token_validation"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//  Set up Express Router.
const cryptoNetworkRouter = (0, _express.Router)();

//  Get all Crypto Networks.
cryptoNetworkRouter.post("/create_network", _token_validation.default.userTokenValidation, _currencyNetwork_controller.default.createCryptoNetwork);

//  Get all Crypto Networks.
cryptoNetworkRouter.get("/all_networks", _token_validation.default.userTokenValidation, _currencyNetwork_controller.default.getCryptoNetworks);

//  Get a single Crypto Network.
cryptoNetworkRouter.get("/single_network/:id", _token_validation.default.userTokenValidation, _currencyNetwork_controller.default.getCryptoNetwork);

//  Update a Crypto Network.
cryptoNetworkRouter.put("/update_network/:id", _token_validation.default.userTokenValidation, _currencyNetwork_controller.default.updateCryptoNetwork);

//  Delete a Crypto Network.
cryptoNetworkRouter.delete("/delete_network/:id", _token_validation.default.userTokenValidation, _currencyNetwork_controller.default.deleteCryptoNetwork);
var _default = exports.default = cryptoNetworkRouter;
//# sourceMappingURL=cryptoNetwork_routes.js.map