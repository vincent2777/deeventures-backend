"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _token_validation = _interopRequireDefault(require("../utils/token_validation"));
var _giftCard_controller = _interopRequireDefault(require("../controllers/giftCard_controller"));
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
var _default = exports.default = giftCardRouter;
//# sourceMappingURL=giftCard_routes.js.map