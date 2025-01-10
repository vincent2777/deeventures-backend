"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = _interopRequireDefault(require("../database/models"));
var _response = _interopRequireDefault(require("../utils/response"));
var _giftCard_validator = _interopRequireDefault(require("../utils/validators/giftCard_validator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  GiftCards,
  GiftCardRates,
  Transactions
} = _models.default;

/**
 * @class GiftCardController
 **/
class GiftCardController {}
/**
 * @function getGiftCards (Get all gift cards).
 **/
_defineProperty(GiftCardController, "getGiftCards", async (req, res) => {
  try {
    const giftCards = await GiftCards.findAll({
      where: {
        is_active: 1
      }
    });
    if (!giftCards.length) {
      const response = new _response.default(false, 404, "No gift card found.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, 'Gift cards retrieved successfully.', {
      giftCards
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function getGiftCard (Get single gift card).
 **/
_defineProperty(GiftCardController, "getGiftCard", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const giftCard = await GiftCards.findByPk(id);
    if (!giftCard) {
      const response = new _response.default(false, 404, "Gift card not found.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, 'Gift card retrieved successfully.', {
      giftCard
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
* @function getGiftCardRates (Get single gift card rate).
**/
_defineProperty(GiftCardController, "getGiftCardRates", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const giftCardRates = await GiftCardRates.findAll({
      where: {
        gift_card_id: id
      }
    });
    if (!giftCardRates) {
      const response = new _response.default(false, 404, "Gift card rates not found.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, 'Gift card rates retrieved successfully.', {
      giftCardRates
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 *@function sellGiftCard, (To sell giftcard).
 **/
_defineProperty(GiftCardController, "sellGiftCard", async (req, res) => {
  try {
    const requestBody = req.body;
    const files = req.files;

    // Validate the Request Body.
    const {
      error,
      value
    } = _giftCard_validator.default.sellGiftCardSchema.validate(requestBody);
    if (error) {
      return res.status(400).json(new _response.default(false, 400, `${error.message}`));
    }

    // Generate URLs for the uploaded files
    const fileURLs = files.map(file => {
      return `http://${req.headers.host}/uploads/giftcard_proofs/${file.filename}`;
    });

    // Join the URLs into a comma-separated string
    const trnx_image_string = fileURLs.join(',');

    // Extract the rates from the request body
    const rates = JSON.parse(requestBody.rates || '[]');

    // Default transaction data
    const defaultTransactionData = {
      ...value,
      trnx_image: trnx_image_string,
      trnx_status: requestBody.trnx_status,
      currency: requestBody.currency,
      trnx_type: requestBody.trnx_type,
      trnx_desc: requestBody.trnx_desc,
      trnx_address: requestBody.trnx_address
    };

    // Collect created transactions
    const createdTransactions = [];
    if (Array.isArray(rates) && rates.length > 0) {
      // User-defined rates were used
      for (const rate of rates) {
        const {
          value,
          estimated_value
        } = rate;
        const transactionData = {
          ...defaultTransactionData,
          trnx_amount: value,
          to_receive: estimated_value,
          trnx_rate: requestBody.trnx_rate,
          trnx_address: ""
        };
        const transaction = await Transactions.create(transactionData);
        if (!transaction) {
          return res.status(409).json(new _response.default(false, 409, "Failed to create gift card transaction."));
        }
        createdTransactions.push(transaction);
      }
    } else {
      // Use the default rate
      const transactionData = {
        ...defaultTransactionData,
        trnx_amount: requestBody.trnx_amount,
        to_receive: requestBody.trnx_amount,
        trnx_rate: requestBody.trnx_rate,
        trnx_address: requestBody.trnx_address
      };
      const transaction = await Transactions.create(transactionData);
      if (!transaction) {
        return res.status(409).json(new _response.default(false, 409, "Failed to create gift card transaction."));
      }
      createdTransactions.push(transaction);
    }
    return res.status(201).json(new _response.default(true, 201, 'Transaction created successfully.', {
      transaction: createdTransactions
    }));
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    return res.status(500).json(new _response.default(false, 500, 'Server error, please try again later.'));
  }
});
/**
 * @function updateGiftCard (Update a gift card)
 **/
_defineProperty(GiftCardController, "updateGiftCard", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const requestBody = req.body;

    //  Validate the Request Body.
    const {
      error,
      value
    } = _giftCard_validator.default.updateGiftCardSchema.validate(requestBody);
    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }
    const updatedGiftCard = await GiftCards.update({
      ...value
    }, {
      where: {
        id
      }
    });
    if (updatedGiftCard[0] === 0) {
      const response = new _response.default(false, 400, "Failed to update gift card.");
      return res.status(response.code).json(response);
    }

    //  Get the updated gift card back.
    const giftCard = await GiftCards.findByPk(id);
    const response = new _response.default(true, 200, "Gift card updated successfully.", {
      giftCard
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function deleteGiftCard (Delete a gift card).
 **/
_defineProperty(GiftCardController, "deleteGiftCard", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const deletedGiftCard = await GiftCards.destroy({
      where: {
        id
      }
    });
    if (deletedGiftCard === 0) {
      const response = new _response.default(false, 400, "Failed to delete gift card.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, "Gift card deleted successfully.");
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
var _default = exports.default = GiftCardController;
//# sourceMappingURL=giftCard_controller.js.map