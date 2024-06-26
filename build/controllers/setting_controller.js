"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = _interopRequireDefault(require("../database/models"));
var _response = _interopRequireDefault(require("../utils/response"));
var _setting_validator = _interopRequireDefault(require("../utils/validators/setting_validator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  Settings
} = _models.default;

/**
 * @class SettingController
 **/
class SettingController {}
/**
 * @function getSettings (Get settings).
 **/
_defineProperty(SettingController, "getSettings", async (req, res) => {
  try {
    const settings = await Settings.findByPk(1);
    if (!settings) {
      const response = new _response.default(false, 404, "Settings not found.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, 'Settings retrieved successfully.', {
      settings
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function updateSettings (Update a settings).
 **/
_defineProperty(SettingController, "updateSettings", async (req, res) => {
  try {
    const requestBody = req.body;

    //  Validate the Request Body.
    const {
      error,
      value
    } = _setting_validator.default.updateSettingsSchema.validate(requestBody);
    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }
    const updatedSettings = await Settings.update({
      ...value
    }, {
      where: {
        id: 1
      }
    });
    if (updatedSettings[0] === 0) {
      const response = new _response.default(false, 400, "Failed to update settings.");
      return res.status(response.code).json(response);
    }

    //  Get the updated transaction back.
    const transaction = await Settings.findByPk(id);
    const response = new _response.default(true, 200, "Settings updated successfully.", {
      transaction
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
var _default = exports.default = SettingController;
//# sourceMappingURL=setting_controller.js.map