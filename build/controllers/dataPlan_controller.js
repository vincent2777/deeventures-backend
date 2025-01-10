"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = _interopRequireDefault(require("../database/models"));
var _response = _interopRequireDefault(require("../utils/response"));
var _dataPlan_validator = _interopRequireDefault(require("../utils/validators/dataPlan_validator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  DataPlans
} = _models.default;

/**
 * @class DataPlanController
 **/
class DataPlanController {}
/**
 * @function createDataPlan (Create a new data plan).
 **/
_defineProperty(DataPlanController, "createDataPlan", async (req, res) => {
  try {
    const requestBody = req.body;
    // console.log("REQUEST PAYLOAD::: ", requestBody);

    //  Validate the Request Body.
    const {
      error,
      value
    } = _dataPlan_validator.default.createDataPlanSchema.validate(requestBody);
    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }
    const dataPlan = await DataPlans.create({
      ...value
    });
    if (!dataPlan) {
      const response = new _response.default(false, 409, "Failed to create data plan.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 201, "Data plan created successfully.", {
      dataPlan
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    return res.status(response.code).json(response);
  }
});
/**
 * @function getDataPlans (Get all data plans).
 **/
_defineProperty(DataPlanController, "getDataPlans", async (req, res) => {
  try {
    const dataPlans = await DataPlans.findAll();
    if (!dataPlans.length) {
      const response = new _response.default(false, 404, "No data plan found.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, "Data plans retrieved successfully.", {
      dataPlans
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    return res.status(response.code).json(response);
  }
});
/**
 * @function getDataPlan, (To get a single data plan).
 **/
_defineProperty(DataPlanController, "getDataPlan", async (req, res) => {
  try {
    const {
      code
    } = req.params;
    const dataPlan = await DataPlans.findOne({
      where: {
        network_id: code
      }
    });
    if (!dataPlan) {
      const response = new _response.default(false, 404, "Data plan does not exist.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, "Data plan retrieved successfully.", {
      dataPlan
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    return res.status(response.code).json(response);
  }
});
var _default = exports.default = DataPlanController;
//# sourceMappingURL=dataPlan_controller.js.map