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
const isActive = [0, 1];

/**
 * @class CurrencyValidator
 **/
class CurrencyValidator {}
/**
 * @function createCurrencySchema
 **/
_defineProperty(CurrencyValidator, "createCurrencySchema", _joi.default.object({
  currency_network_id: _joi.default.array().items(_joi.default.number()).required(),
  currency_name: _joi.default.string().required(),
  currency_price: _joi.default.number().min(0).required(),
  currency_buy_rate: _joi.default.number().min(0).required(),
  currency_sell_rate: _joi.default.number().min(0).required(),
  currency_symbol: _joi.default.string().required(),
  currency_is_active: _joi.default.number().valid(...isActive),
  currency_image: _joi.default.string()
}));
/**
 * @function updateCurrencySchema
 **/
_defineProperty(CurrencyValidator, "updateCurrencySchema", _joi.default.object({
  currency_name: _joi.default.string(),
  currency_price: _joi.default.number().min(0),
  currency_buy_rate: _joi.default.number().min(0),
  currency_sell_rate: _joi.default.number().min(0),
  currency_symbol: _joi.default.string(),
  currency_is_active: _joi.default.number(),
  currency_image: _joi.default.string()
}));
var _default = exports.default = CurrencyValidator;
//# sourceMappingURL=currency_validator.js.map