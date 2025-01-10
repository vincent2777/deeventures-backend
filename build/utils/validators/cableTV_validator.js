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
 * @class CableTVValidator
 **/
class CableTVValidator {}
/**
 * @function createCableTVSchema
 **/
_defineProperty(CableTVValidator, "createCableTVSchema", _joi.default.object({
  code: _joi.default.string().required(),
  name: _joi.default.string().required()
}));
/**
 * @function updateCableTVSchema
 **/
_defineProperty(CableTVValidator, "updateCableTVSchema", _joi.default.object({
  code: _joi.default.string(),
  name: _joi.default.string()
}));
var _default = exports.default = CableTVValidator;
//# sourceMappingURL=cableTV_validator.js.map