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
 * @class TransactionValidator
 **/
class TransactionValidator {}
/**
 * @function createTransactionSchema
 **/
_defineProperty(TransactionValidator, "createTransactionSchema", _joi.default.object({
  user_id: _joi.default.number().required(),
  trnx_amount: _joi.default.number().positive().required(),
  trnx_type: _joi.default.string().valid(...transactionType).required(),
  trnx_desc: _joi.default.string().required(),
  trnx_status: _joi.default.number().required(),
  trnx_rate: _joi.default.number().positive().required(),
  trnx_address: _joi.default.string().required(),
  trnx_image: _joi.default.string().allow("").optional(),
  to_receive: _joi.default.number().positive().required(),
  currency: _joi.default.string().required()
}));
/**
 * @function updateTransactionSchema
 **/
_defineProperty(TransactionValidator, "updateTransactionSchema", _joi.default.object({
  user_id: _joi.default.number().allow(null).optional(),
  trnx_amount: _joi.default.number().allow(null).optional(),
  trnx_type: _joi.default.string().valid(...transactionType),
  trnx_desc: _joi.default.string().allow(null).optional(),
  trnx_status: _joi.default.number().allow(null).optional(),
  trnx_rate: _joi.default.number().positive().allow(null).optional(),
  trnx_address: _joi.default.string().allow(null).optional(),
  trnx_image: _joi.default.string().allow(null).optional().allow(null).optional(),
  to_receive: _joi.default.number().allow(null).optional(),
  currency: _joi.default.string().allow(null).optional()
}));
var _default = exports.default = TransactionValidator;
//# sourceMappingURL=transaction_validator.js.map