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
 * @class BillPaymentValidator
 **/
class BillPaymentValidator {}
/**
 * @function buyAirtimeSchema
 **/
_defineProperty(BillPaymentValidator, "buyAirtimeSchema", _joi.default.object({
  mobileNetwork: _joi.default.string().required(),
  mobileNumber: _joi.default.string().required(),
  airtimeAmount: _joi.default.number().required()
}));
/**
 * @function buyDataBundleSchema
 **/
_defineProperty(BillPaymentValidator, "buyDataBundleSchema", _joi.default.object({
  mobileNetwork: _joi.default.string().required(),
  dataPlan: _joi.default.number().required(),
  mobileNumber: _joi.default.string().required(),
  dataBundleAmount: _joi.default.number().required(),
  totalAmt: _joi.default.number().required()
}));
/**
 * @function buyCableTVSchema
 **/
_defineProperty(BillPaymentValidator, "buyCableTVSchema", _joi.default.object({
  cableTV: _joi.default.string().required(),
  packageCode: _joi.default.string().required(),
  smartCardNo: _joi.default.number().required(),
  amount: _joi.default.number().required(),
  mobileNumber: _joi.default.string().required()
}));
/**
 * @function buyElectricitySchema
 **/
_defineProperty(BillPaymentValidator, "buyElectricitySchema", _joi.default.object({
  electricCompanyCode: _joi.default.string().required(),
  meterType: _joi.default.string().required(),
  meterNumber: _joi.default.string().required(),
  amount: _joi.default.number().required(),
  totalAmt: _joi.default.number().required(),
  mobileNumber: _joi.default.string().required()
}));
var _default = exports.default = BillPaymentValidator;
//# sourceMappingURL=billPayment_validator.js.map