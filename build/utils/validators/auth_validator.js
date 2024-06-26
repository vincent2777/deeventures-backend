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
const status = ["active", "pending"];

/**
 * @class AuthValidator
 **/
class AuthValidator {}
/**
 * @function signUpUserSchema
 **/
_defineProperty(AuthValidator, "signUpUserSchema", _joi.default.object({
  full_name: _joi.default.string().min(3).required(),
  // username: Joi.string().required(),
  email: _joi.default.string().email(),
  phone_number: _joi.default.string(),
  account_status: _joi.default.string().valid(...status).default("pending"),
  country: _joi.default.string(),
  referred_by: _joi.default.string().allow("", null),
  // reg_date: Joi.date(),
  avatar: _joi.default.string(),
  password: _joi.default.string().required().pattern(new RegExp('^[a-zA-Z0-9@#$%&]{6,30}$')).error(new Error("Password must be at least 6 characters with alphanumeric and special characters."))
}));
/**
 * @function loginUserSchema
 **/
_defineProperty(AuthValidator, "loginUserSchema", _joi.default.object({
  email: _joi.default.string().required().email(),
  password: _joi.default.string().required()
}));
/**
 * @function updateUserSchema
 **/
_defineProperty(AuthValidator, "updateUserSchema", _joi.default.object({
  full_name: _joi.default.string().min(3),
  // username: Joi.string(),
  email: _joi.default.string().email(),
  phone_number: _joi.default.string(),
  status: _joi.default.string().valid(...status),
  country: _joi.default.string(),
  referred_by: _joi.default.string(),
  reg_date: _joi.default.date(),
  avatar: _joi.default.string(),
  password: _joi.default.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).error(new Error("Password must be at least 6 characters and alphanumeric."))
}));
var _default = exports.default = AuthValidator;
//# sourceMappingURL=auth_validator.js.map