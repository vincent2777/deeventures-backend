"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = _interopRequireDefault(require("../database/models"));
var _response = _interopRequireDefault(require("../utils/response"));
var _transaction_validator = _interopRequireDefault(require("../utils/validators/transaction_validator"));
var _sequelize = _interopRequireDefault(require("sequelize"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  Transactions,
  Users
} = _models.default;

/**
 * @class TransactionController
 **/
class TransactionController {}
/**
 * @function createTransaction (Create a new transaction).
 **/
_defineProperty(TransactionController, "createTransaction", async (req, res) => {
  try {
    const requestBody = req.body;
    // console.log("REQUEST PAYLOAD::: ", requestBody);

    //  Validate the Request Body.
    const {
      error,
      value
    } = _transaction_validator.default.createTransactionSchema.validate(requestBody);
    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }
    const transaction = await Transactions.create({
      ...value
    });
    if (!transaction) {
      const response = new _response.default(false, 409, "Failed to create transaction.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 201, 'Transaction created successfully.', {
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
 * @function getTransactions (Get all transactions).
 **/
_defineProperty(TransactionController, "getTransactions", async (req, res) => {
  try {
    const {
      type,
      status,
      page = 1,
      limit = 10
    } = req.query;
    const {
      id
    } = req.requestPayload;
    let whereClause = {
      user_id: id
    };
    if (type) {
      // Filter by trnx_type if provided
      switch (type) {
        case "coin_purchase":
          whereClause.trnx_type = "Coin Purchase";
          break;
        case "coin_sell":
          whereClause.trnx_type = "Coin Sell";
          break;
        case "gift_card_sell":
          whereClause.trnx_type = "Gift Card Sell";
          break;
        case "bill_payment":
          whereClause.trnx_type = "Bill Payment";
          break;
        case "fund_withdrawal":
          whereClause.trnx_type = "Fund Withdrawal";
          break;
        case "wallet_funding":
          whereClause.trnx_type = "Wallet Funding";
          break;
        default:
          whereClause.trnx_type = null;
      }
    }
    if (status) {
      // Filter by status if provided (excluding "All")
      whereClause.trnx_status = status;
    }

    // Clean up whereClause to remove null values
    whereClause = Object.fromEntries(Object.entries(whereClause).filter(([_, v]) => v != null));

    // Pagination calculation
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const transactions = await Transactions.findAll({
      where: whereClause,
      order: [[_sequelize.default.col("trnx_date"), "DESC"]],
      limit: parseInt(limit, 10),
      offset: offset
    });
    if (!transactions.length) {
      const response = new _response.default(true, 200, "No transaction found.", {
        transactions: []
      });
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, 'Transactions retrieved successfully.', {
      transactions
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function getTransaction (Get single transaction).
 **/
_defineProperty(TransactionController, "getTransaction", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const transaction = await Transactions.findByPk(id, {
      include: {
        model: Users,
        as: "user",
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"]
        }
      }
    });
    if (!transaction) {
      const response = new _response.default(false, 404, "Transaction not found.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, 'Transaction retrieved successfully.', {
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
 * @function updateTransaction (Update a transaction).
 **/
_defineProperty(TransactionController, "updateTransaction", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const requestBody = req.body;

    //  Validate the Request Body.
    const {
      error,
      value
    } = _transaction_validator.default.updateTransactionSchema.validate(requestBody);
    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }
    const updatedTransaction = await Transactions.update({
      ...value
    }, {
      where: {
        id
      }
    });
    if (updatedTransaction[0] === 0) {
      const response = new _response.default(false, 400, "Failed to update transaction.");
      return res.status(response.code).json(response);
    }

    //  Get the updated transaction back.
    const transaction = await Transactions.findByPk(id);
    const response = new _response.default(true, 200, "Transaction updated successfully.", {
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
 * @function deleteTransaction (Delete a transaction).
 **/
_defineProperty(TransactionController, "deleteTransaction", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const deletedTransaction = await Transactions.destroy({
      where: {
        id
      }
    });
    if (deletedTransaction === 0) {
      const response = new _response.default(false, 400, "Failed to delete transaction.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, "Transaction deleted successfully.");
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function deleteTransaction (Delete a transaction).
 **/
_defineProperty(TransactionController, "uploadTransactionProof", async (req, res) => {
  try {
    const {
      trnx_reference
    } = req.params;
    const filename = req.file.filename;
    const imageURL = `http://${req.headers.host}/deeventure-apis/uploads/crypto_proofs/${filename}`;

    // const imageURL = `http://${req.headers.host}/uploads/crypto_proofs/${filename}`;
    // console.log("IMAGE FILE:::", req.file);

    //  Update the Transaction image.
    const updatedTransaction = await Transactions.update({
      trnx_image: imageURL
    }, {
      where: {
        trnx_reference
      }
    });
    if (updatedTransaction[0] === 0) {
      const response = new _response.default(false, 400, "Failed to update transaction.");
      return res.status(response.code).json(response);
    }

    //  Get the updated transaction back.
    const transaction = await Transactions.findOne({
      where: {
        trnx_reference
      }
    });
    const response = new _response.default(true, 200, "Transaction image uploaded successfully.", {
      transaction
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
var _default = exports.default = TransactionController;
//# sourceMappingURL=transaction_controller.js.map