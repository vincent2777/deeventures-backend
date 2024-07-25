"use strict";

import { Router } from "express";
import TransactionController from "../controllers/transaction_controller";
import TokenValidation from "../utils/token_validation";
import {uploadTransactionProof} from "../utils/file_upload";

//  Set up Express Router.
const transactionRouter = Router();

//  Create a new Transaction.
transactionRouter.post(
    "/create_transaction",
    TokenValidation.userTokenValidation,
    TransactionController.createTransaction
);

//  Get all Transactions.
transactionRouter.get(
    "/all_transactions",
    TokenValidation.userTokenValidation,
    TransactionController.getTransactions
);

//  Get a single Transaction.
transactionRouter.get(
    "/single_transaction/:id",
    TokenValidation.userTokenValidation,
    TransactionController.getTransaction
);

//  Update a Transaction.
transactionRouter.put(
    "/update_transaction/:id",
    TokenValidation.userTokenValidation,
    TransactionController.updateTransaction
);

//  Delete a Transaction.
transactionRouter.delete(
    "/delete_transaction/:id",
    TokenValidation.userTokenValidation,
    TransactionController.deleteTransaction
);

//  Upload Transaction Proof.
transactionRouter.post(
    "/upload_transaction_proof/:trnx_reference",
    TokenValidation.userTokenValidation,
    uploadTransactionProof,
    TransactionController.uploadTransactionProof
);

export default transactionRouter;