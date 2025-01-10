"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = _interopRequireDefault(require("../database/models"));
var _response = _interopRequireDefault(require("../utils/response"));
var _airtime_validator = _interopRequireDefault(require("../utils/validators/airtime_validator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  AirTimes
} = _models.default;

/**
 * @class NetworkController
 **/
class NetworkController {}
/**
 * @function createAirtime (Create a new airtime).
 **/
_defineProperty(NetworkController, "createAirtime", async (req, res) => {
  try {
    const requestBody = req.body;

    //  Validate the Request Body.
    const {
      error,
      value
    } = _airtime_validator.default.createAirtimeSchema.validate(requestBody);
    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }
    const airtime = await AirTimes.create({
      ...value
    });
    if (!airtime) {
      const response = new _response.default(false, 409, "Failed to create airtime.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 201, 'Airtime created successfully.', {
      airtime
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function getAirTimes (Get all airtime).
 **/
_defineProperty(NetworkController, "getAirTimes", async (req, res) => {
  try {
    const airTimes = await AirTimes.findAll();
    if (!airTimes.length) {
      const response = new _response.default(false, 404, "No airtime found.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, 'Airtime retrieved successfully.', {
      airTimes
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function getAirTime, (To get a single airtime).
 **/
_defineProperty(NetworkController, "getAirTime", async (req, res) => {
  try {
    const {
      code
    } = req.params;
    const airtime = await AirTimes.findOne({
      where: {
        code
      }
    });
    if (!airtime) {
      const response = new _response.default(false, 404, "Airtime does not exist.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, "Airtime retrieved successfully.", {
      airtime
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    return res.status(response.code).json(response);
  }
});
var _default = exports.default = NetworkController;
//# sourceMappingURL=network_controller.js.map