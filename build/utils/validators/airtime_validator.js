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
 * @class NetworkValidator
 **/
class NetworkValidator {}
/**
 * @function createAirtimeSchema
 **/
_defineProperty(NetworkValidator, "createAirtimeSchema", _joi.default.object({
  code: _joi.default.string().required(),
  airtime_isp: _joi.default.string().required(),
  airtime_commission: _joi.default.number().required(),
  airtime_image: _joi.default.string().required(),
  is_active: _joi.default.number().required()
}));
var _default = exports.default = NetworkValidator;
//# sourceMappingURL=airtime_validator.js.map