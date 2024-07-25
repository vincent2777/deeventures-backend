"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const transactionType = ["Gift Card Sell", "Coin Sell", "Bill Payment", "Wallet Funding", "Fund Withdrawal", "Promo Usage"];

/**
 * @class GiftCardValidator
 **/
class GiftCardValidator {}
/**
 * @function createGiftCardSchema
 **/
_defineProperty(GiftCardValidator, "createGiftCardSchema", _joi.default.object({
  gcard_name: _joi.default.string().required(),
  gcard_image: _joi.default.string().required(),
  is_active: _joi.default.number().required()
}));
/**
 * @function updateGiftCardSchema
 **/
_defineProperty(GiftCardValidator, "updateGiftCardSchema", _joi.default.object({
  gcard_name: _joi.default.string(),
  gcard_image: _joi.default.string(),
  is_active: _joi.default.number()
}));
/**
* @function sellGiftCardSchema
**/
_defineProperty(GiftCardValidator, "sellGiftCardSchema", _joi.default.object({
  user_id: _joi.default.number().required(),
  trnx_amount: _joi.default.number().positive().required(),
  trnx_type: _joi.default.string().valid(...transactionType).required(),
  trnx_desc: _joi.default.string().required(),
  trnx_status: _joi.default.number().required(),
  trnx_rate: _joi.default.number().positive().required(),
  trnx_address: _joi.default.string().allow("").optional(),
  rates: _joi.default.string().allow("").optional(),
  trnx_image: _joi.default.string().allow("").optional(),
  to_receive: _joi.default.number().positive().required(),
  currency: _joi.default.string().required()
}));
var _default = exports.default = GiftCardValidator;
//# sourceMappingURL=giftCard_validator.js.map