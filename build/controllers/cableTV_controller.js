"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = _interopRequireDefault(require("../database/models"));
var _response = _interopRequireDefault(require("../utils/response"));
var _cableTV_validator = _interopRequireDefault(require("../utils/validators/cableTV_validator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  CableTVs
} = _models.default;

/**
 * @class CableTVController
 **/
class CableTVController {}
/**
 * @function createCableTV (Create a new cable tv).
 **/
_defineProperty(CableTVController, "createCableTV", async (req, res) => {
  try {
    const requestBody = req.body;
    // console.log("REQUEST PAYLOAD::: ", requestBody);

    //  Validate the Request Body.
    const {
      error,
      value
    } = _cableTV_validator.default.createCableTVSchema.validate(requestBody);
    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }
    const cableTV = await CableTVs.create({
      ...value
    });
    if (!cableTV) {
      const response = new _response.default(false, 409, "Failed to create cable tv.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 201, 'Cable tv created successfully.', {
      cableTV
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function getCableTVs (Get all cable tv).
 **/
_defineProperty(CableTVController, "getCableTVs", async (req, res) => {
  try {
    const cableTVs = await CableTVs.findAll();
    if (!cableTVs.length) {
      const response = new _response.default(false, 404, "No cable tv found.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, 'Cable TVs retrieved successfully.', {
      cableTVs
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function getCableTV, (To get a single cable TV).
 **/
_defineProperty(CableTVController, "getCableTV", async (req, res) => {
  try {
    const {
      code
    } = req.params;
    const cableTV = await CableTVs.findOne({
      where: {
        provider_id: code
      }
    });
    if (!cableTV) {
      const response = new _response.default(false, 404, "Cable tv does not exist.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, 'Cable tv retrieved successfully.', {
      cableTV
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
var _default = exports.default = CableTVController;
//# sourceMappingURL=cableTV_controller.js.map