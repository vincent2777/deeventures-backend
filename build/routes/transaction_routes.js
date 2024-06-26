"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _transaction_controller = _interopRequireDefault(require("../controllers/transaction_controller"));
var _token_validation = _interopRequireDefault(require("../utils/token_validation"));
var _file_upload = _interopRequireDefault(require("../utils/file_upload"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//  Set up Express Router.
const transactionRouter = (0, _express.Router)();

//  Create a new Transaction.
transactionRouter.post("/create_transaction", _token_validation.default.userTokenValidation, _transaction_controller.default.createTransaction);

//  Get all Transactions.
transactionRouter.get("/all_transactions", _token_validation.default.userTokenValidation, _transaction_controller.default.getTransactions);

//  Get a single Transaction.
transactionRouter.get("/single_transaction/:id", _token_validation.default.userTokenValidation, _transaction_controller.default.getTransaction);

//  Update a Transaction.
transactionRouter.put("/update_transaction/:id", _token_validation.default.userTokenValidation, _transaction_controller.default.updateTransaction);

//  Delete a Transaction.
transactionRouter.delete("/delete_transaction/:id", _token_validation.default.userTokenValidation, _transaction_controller.default.deleteTransaction);

//  Upload Transaction Proof.
transactionRouter.post("/upload_transaction_proof/:trnx_reference", _token_validation.default.userTokenValidation, _file_upload.default, _transaction_controller.default.uploadTransactionProof);
var _default = exports.default = transactionRouter;
//# sourceMappingURL=transaction_routes.js.map