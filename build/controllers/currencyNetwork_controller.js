"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = _interopRequireDefault(require("../database/models"));
var _response = _interopRequireDefault(require("../utils/response"));
var _currencyNetwork_validator = _interopRequireDefault(require("../utils/validators/currencyNetwork_validator"));
var _currency_validator = _interopRequireDefault(require("../utils/validators/currency_validator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  CurrencyNetworks
} = _models.default;

/**
 * @class CurrencyNetworkController
 **/
class CurrencyNetworkController {}
/**
 * @function createCryptoNetwork (Create a new crypto network).
 **/
_defineProperty(CurrencyNetworkController, "createCryptoNetwork", async (req, res) => {
  try {
    const requestBody = req.body;
    // console.log("REQUEST PAYLOAD::: ", requestBody);

    //  Validate the Request Body.
    const {
      error,
      value
    } = _currencyNetwork_validator.default.createCurrencyNetworkSchema.validate(requestBody);
    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }
    const transaction = await CurrencyNetworks.create({
      ...value
    });
    if (!transaction) {
      const response = new _response.default(false, 409, "Failed to create crypto network.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 201, 'Crypto network created successfully.', {
      transaction
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function getCryptoNetworks, (Get all crypto networks).
 **/
_defineProperty(CurrencyNetworkController, "getCryptoNetworks", async (req, res) => {
  try {
    const currencyNetworks = await CurrencyNetworks.findAll();
    if (!currencyNetworks.length) {
      const response = new _response.default(false, 404, "No crypto network found.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, 'Currency networks retrieved successfully.', {
      currencyNetworks
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function getCryptoNetwork, (Get a single crypto network).
 **/
_defineProperty(CurrencyNetworkController, "getCryptoNetwork", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const currencyNetwork = await CurrencyNetworks.findByPk(id);
    if (!currencyNetwork) {
      const response = new _response.default(false, 404, "No currency network found.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, 'Currency network retrieved successfully.', {
      currencyNetwork
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function updateCryptoNetwork (Update a crypto network).
 **/
_defineProperty(CurrencyNetworkController, "updateCryptoNetwork", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const requestBody = req.body;

    //  Validate the Request Body.
    const {
      error,
      value
    } = _currencyNetwork_validator.default.updateCurrencyNetworkSchema.validate(requestBody);
    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }
    const updatedCryptoNetwork = await CurrencyNetworks.update({
      ...value
    }, {
      where: {
        id
      }
    });
    if (updatedCryptoNetwork[0] === 0) {
      const response = new _response.default(false, 400, "Failed to update currency network.");
      return res.status(response.code).json(response);
    }

    //  Get the updated crypto network back.
    const currencyNetwork = await CurrencyNetworks.findByPk(id);
    const response = new _response.default(true, 200, "Currency network updated successfully.", {
      currencyNetwork
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function deleteCryptoNetwork (Delete a crypto network).
 **/
_defineProperty(CurrencyNetworkController, "deleteCryptoNetwork", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const deletedCryptoNetwork = await CurrencyNetworks.destroy({
      where: {
        id
      }
    });
    if (deletedCryptoNetwork === 0) {
      const response = new _response.default(false, 400, "Failed to delete currency network.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, "Currency network deleted successfully.");
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
var _default = exports.default = CurrencyNetworkController;
//# sourceMappingURL=currencyNetwork_controller.js.map