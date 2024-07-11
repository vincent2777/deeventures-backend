"use strict";

import { Router } from "express";
import TokenValidation from "../utils/token_validation";
import WalletController from "../controllers/wallet_controller";



//  Set up Express Router.
const walletRouter = Router();

//  Create a Wallet.
walletRouter.post(
    "/create_wallet",
    WalletController.createWallet
);
walletRouter.post(
    "/create_referral_wallet",
    WalletController.createReferralWallet
);


//  Get All Wallets.
walletRouter.get(
    "/all_wallets",
    TokenValidation.userTokenValidation,
    WalletController.getWallets
);
walletRouter.get(
    "/all_referral_wallets",
    TokenValidation.userTokenValidation,
    WalletController.getReferralWallets
);


//  Get Single Wallet.
walletRouter.get(
    "/single_wallet/:id",
    TokenValidation.userTokenValidation,
    WalletController.getWallet
);
walletRouter.get(
    "/single_referral_wallet/:id",
    TokenValidation.userTokenValidation,
    WalletController.getReferralWallet
);


//  Get Users Wallet.
walletRouter.get(
    "/user_wallet/:userID",
    TokenValidation.userTokenValidation,
    WalletController.getUserWallet
);
walletRouter.get(
    "/user_referral_wallet/:userID",
    TokenValidation.userTokenValidation,
    WalletController.getUserReferralWallet
);

//  Get Single Wallet.
walletRouter.put(
    "/update_wallet/:id",
    TokenValidation.userTokenValidation,
    WalletController.updateWallet
);
walletRouter.put(
    "/update_referral_wallet/:id",
    TokenValidation.userTokenValidation,
    WalletController.updateReferralWallet
);

// Deposit money
walletRouter.post(
    "/deposit_money/:id",
    TokenValidation.userTokenValidation,
    WalletController.depositMoney
);

// Withdraw money
walletRouter.post(
    "/withdraw_money",
    TokenValidation.userTokenValidation,
    WalletController.withdrawMoney
);

export default walletRouter;