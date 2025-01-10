"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _token_validation = _interopRequireDefault(require("../utils/token_validation"));
var _giftCard_controller = _interopRequireDefault(require("../controllers/giftCard_controller"));
var _file_upload = require("../utils/file_upload");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//  Set up Express Router.
const giftCardRouter = (0, _express.Router)();

//  Get all Gift cards.
giftCardRouter.get("/all_gift_cards", _token_validation.default.userTokenValidation, _giftCard_controller.default.getGiftCards);

//  Get single gift card.
giftCardRouter.get("/single_gift_card/:id", _token_validation.default.userTokenValidation, _giftCard_controller.default.getGiftCard);

//  Update a gift card.
giftCardRouter.put("/update_gift_card", _token_validation.default.userTokenValidation, _giftCard_controller.default.updateGiftCard);

//  Delete a gift card.
giftCardRouter.delete("/delete_gift_card", _token_validation.default.userTokenValidation, _giftCard_controller.default.deleteGiftCard);

//get gift card rates
giftCardRouter.get("/gift_card_rates/:id", _token_validation.default.userTokenValidation, _giftCard_controller.default.getGiftCardRates);

//get gift card rates
giftCardRouter.post("/sell_gift_card", _token_validation.default.userTokenValidation, _file_upload.uploadCardProof, _giftCard_controller.default.sellGiftCard);
var _default = exports.default = giftCardRouter;
//# sourceMappingURL=giftCard_routes.js.map