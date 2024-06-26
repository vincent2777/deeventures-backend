"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _token_validation = _interopRequireDefault(require("../utils/token_validation"));
var _wallet_controller = _interopRequireDefault(require("../controllers/wallet_controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//  Set up Express Router.
const walletRouter = (0, _express.Router)();

//  Create a Wallet.
walletRouter.post("/create_wallet", _wallet_controller.default.createWallet);
walletRouter.post("/create_referral_wallet", _wallet_controller.default.createReferralWallet);

//  Get All Wallets.
walletRouter.get("/all_wallets", _token_validation.default.userTokenValidation, _wallet_controller.default.getWallets);
walletRouter.get("/all_referral_wallets", _token_validation.default.userTokenValidation, _wallet_controller.default.getReferralWallets);

//  Get Single Wallet.
walletRouter.get("/single_wallet/:id", _token_validation.default.userTokenValidation, _wallet_controller.default.getWallet);
walletRouter.get("/single_referral_wallet/:id", _token_validation.default.userTokenValidation, _wallet_controller.default.getReferralWallet);

//  Get Users Wallet.
walletRouter.get("/user_wallet/:userID", _token_validation.default.userTokenValidation, _wallet_controller.default.getUserWallet);
walletRouter.get("/user_referral_wallet/:userID", _token_validation.default.userTokenValidation, _wallet_controller.default.getUserReferralWallet);

//  Get Single Wallet.
walletRouter.put("/update_wallet/:id", _token_validation.default.userTokenValidation, _wallet_controller.default.updateWallet);
walletRouter.put("/update_referral_wallet/:id", _token_validation.default.userTokenValidation, _wallet_controller.default.updateReferralWallet);

// Deposit money
walletRouter.post("/deposit_money/:id", _token_validation.default.userTokenValidation, _wallet_controller.default.depositMoney);
var _default = exports.default = walletRouter;
//# sourceMappingURL=wallet_routes.js.map