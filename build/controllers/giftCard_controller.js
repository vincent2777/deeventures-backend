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
  GiftCards
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
    const giftCards = await GiftCards.findAll();
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