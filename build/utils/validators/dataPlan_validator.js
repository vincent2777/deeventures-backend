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
const status = [0, 1];

/**
 * @class DataPlanValidator
 **/
class DataPlanValidator {}
/**
 * @function createDataPlanSchema
 **/
_defineProperty(DataPlanValidator, "createDataPlanSchema", _joi.default.object({
  network_id: _joi.default.string().required(),
  data_plans_isp: _joi.default.string().required(),
  data_plans_commission: _joi.default.number().required(),
  data_plans_isp_image: _joi.default.string().required(),
  is_active: _joi.default.string().valid(...status).default(1)
}));
var _default = exports.default = DataPlanValidator;
//# sourceMappingURL=dataPlan_validator.js.map