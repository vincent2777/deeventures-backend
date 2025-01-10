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
/**
 * @class SettingsValidator
 **/
class SettingsValidator {}
/**
 * @function updateSettingsSchema
 **/
_defineProperty(SettingsValidator, "updateSettingsSchema", _joi.default.object({
  kyclevel1_max_withdrawal: _joi.default.number(),
  kyclevel2_max_withdrawal: _joi.default.number(),
  kyclevel3_max_withdrawal: _joi.default.number(),
  referral_commision: _joi.default.number(),
  account_bank: _joi.default.string(),
  account_number: _joi.default.number(),
  deposit_instructions: _joi.default.string(),
  min_withdrawal: _joi.default.number(),
  clubkonect_api: _joi.default.string(),
  clubkonect_userid: _joi.default.string(),
  max_withdrawal: _joi.default.number()
}));
var _default = exports.default = SettingsValidator;
//# sourceMappingURL=setting_validator.js.map