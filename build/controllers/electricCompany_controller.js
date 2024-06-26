"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = _interopRequireDefault(require("../database/models"));
var _response = _interopRequireDefault(require("../utils/response"));
var _electricCompany_validator = _interopRequireDefault(require("../utils/validators/electricCompany_validator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  ElectricCompanies,
  ElectricBills,
  MeterTypes
} = _models.default;

/**
 * @class ElectricController
 **/
class ElectricController {}
/**
 * @function createElectricCompany (Create a new electric company).
 **/
/*static createElectricCompany = async (req, res) => {
    try {
        const requestBody = req.body;
         //  Validate the Request Body.
        const {error, value} = ElectricCompanyValidator.createElectricCompanySchema.validate(requestBody);
        if (error) {
            const response = new Response(
                false,
                400,
                `${error.message}`
            );
            return res.status(response.code).json(response);
        }
         const electricCompany = await ElectricCompanies.create({ ...value });
        if (!electricCompany) {
            const response = new Response(
                false,
                409,
                "Failed to create electric company."
            );
            return res.status(response.code).json(response);
        }
         const response = new Response(
            true,
            201,
            'Electric company created successfully.',
            { electricCompany }
        );
        return res.status(response.code).json(response);
     } catch (error) {
        console.log(`ERROR::: ${error}`);
         const response = new Response(
            false,
            500,
            'Server error, please try again later.'
        );
        return res.status(response.code).json(response);
    }
};*/
/**
 * @function createMeterType (Create a new meter type).
 **/
_defineProperty(ElectricController, "createMeterType", async (req, res) => {
  try {
    const requestBody = req.body;

    //  Validate the Request Body.
    const {
      error,
      value
    } = _electricCompany_validator.default.createMeterTypeSchema.validate(requestBody);
    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }
    const meterType = await MeterTypes.create({
      ...value
    });
    if (!meterType) {
      const response = new _response.default(false, 409, "Failed to create meter type.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 201, 'Meter type created successfully.', {
      meterType
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function getElectricCompanies (Get all electric companies).
 **/
_defineProperty(ElectricController, "getElectricCompanies", async (req, res) => {
  try {
    const electricCompanies = await ElectricBills.findAll();
    if (!electricCompanies.length) {
      const response = new _response.default(false, 404, "No electric company found.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, 'Electric companies retrieved successfully.', {
      electricCompanies
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function getMeterTypes (Get all meter types).
 **/
_defineProperty(ElectricController, "getMeterTypes", async (req, res) => {
  try {
    const meterTypes = await MeterTypes.findAll();
    if (!meterTypes.length) {
      const response = new _response.default(false, 404, "No meter type found.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, 'Meter types retrieved successfully.', {
      meterTypes
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function getElectricCompany, (To get a single electric company).
 **/
_defineProperty(ElectricController, "getElectricCompany", async (req, res) => {
  try {
    const {
      code
    } = req.params;
    const electricCompany = await ElectricBills.findOne({
      where: {
        provider_id: code
      }
    });
    if (!electricCompany) {
      const response = new _response.default(false, 404, "Electric company does not exist.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, "Electric company retrieved successfully.", {
      electricCompany
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    return res.status(response.code).json(response);
  }
});
/**
 * @function getMeterType, (To get a single meter type).
 **/
_defineProperty(ElectricController, "getMeterType", async (req, res) => {
  try {
    const {
      code
    } = req.params;
    const meterType = await MeterTypes.findOne({
      where: {
        code
      }
    });
    if (!meterType) {
      const response = new _response.default(false, 404, "Meter type does not exist.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, "Meter type retrieved successfully.", {
      meterType
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    return res.status(response.code).json(response);
  }
});
var _default = exports.default = ElectricController;
//# sourceMappingURL=electricCompany_controller.js.map