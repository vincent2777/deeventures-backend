"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = _interopRequireDefault(require("../database/models"));
var _response = _interopRequireDefault(require("../utils/response"));
var _currency_validator = _interopRequireDefault(require("../utils/validators/currency_validator"));
var _sequelize = require("sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  Currencies,
  CurrencyNetworks
} = _models.default;

/**
 * @class CurrencyController
 **/
class CurrencyController {}
/**
 * @function createCurrency (Create a new currency).
 **/
_defineProperty(CurrencyController, "createCurrency", async (req, res) => {
  try {
    const requestBody = req.body;
    // console.log("REQUEST PAYLOAD::: ", requestBody);

    //  Validate the Request Body.
    const {
      error,
      value
    } = _currency_validator.default.createCurrencySchema.validate(requestBody);
    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }
    const currency = await Currencies.create({
      ...value
    });
    if (!currency) {
      const response = new _response.default(false, 409, "Failed to create currency.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 201, 'Currency created successfully.', {
      currency
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function getCurrencies (Get all currencies).
 **/
_defineProperty(CurrencyController, "getCurrencies", async (req, res) => {
  try {
    const currencies = await Currencies.findAll();
    if (!currencies.length) {
      const response = new _response.default(false, 404, "No currency found.");
      return res.status(response.code).json(response);
    }
    const currenciesWithNetworks = await Promise.all(currencies.map(async eachCurrency => {
      // Find all CurrencyNetworks matching the IDs
      const currencyNetworks = await CurrencyNetworks.findAll({
        where: {
          id: {
            [_sequelize.Op.in]: eachCurrency.currency_network_id
          }
        },
        attributes: ["id", "network_name", "network_address"] // Add all the necessary attributes you need
      });
      return {
        ...eachCurrency.dataValues,
        currency_networks: currencyNetworks
      };
    }));
    const response = new _response.default(true, 200, 'Currencies retrieved successfully.', {
      currencies: currenciesWithNetworks
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function getCurrency (Get single currency).
 **/
_defineProperty(CurrencyController, "getCurrency", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const currency = await Currencies.findByPk(id);
    if (!currency) {
      const response = new _response.default(false, 404, "Currency not found.");
      return res.status(response.code).json(response);
    }

    // Find all CurrencyNetworks matching the IDs
    const currencyNetworks = await CurrencyNetworks.findAll({
      where: {
        id: {
          [_sequelize.Op.in]: currency.currency_network_id
        }
      },
      attributes: ["id", "network_name", "network_address", "network_image"] // Add all the necessary attributes you need
    });
    const response = new _response.default(true, 200, 'Currency retrieved successfully.', {
      ...currency.dataValues,
      currency_networks: currencyNetworks
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function updateCurrency (Update a currency).
 **/
_defineProperty(CurrencyController, "updateCurrency", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const requestBody = req.body;

    //  Validate the Request Body.
    const {
      error,
      value
    } = _currency_validator.default.updateCurrencySchema.validate(requestBody);
    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }
    const updatedCurrency = await Currencies.update({
      ...value
    }, {
      where: {
        id
      }
    });
    if (updatedCurrency[0] === 0) {
      const response = new _response.default(false, 400, "Failed to update currency.");
      return res.status(response.code).json(response);
    }

    //  Get the updated currency back.
    const currency = await Currencies.findByPk(id);
    const response = new _response.default(true, 200, "Currency updated successfully.", {
      currency
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function deleteCurrency (Delete a currency).
 **/
_defineProperty(CurrencyController, "deleteCurrency", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const deletedCurrency = await Currencies.destroy({
      where: {
        id
      }
    });
    if (deletedCurrency === 0) {
      const response = new _response.default(false, 400, "Failed to delete currency.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, "Currency deleted successfully.");
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
var _default = exports.default = CurrencyController;
//# sourceMappingURL=currency_controller.js.map