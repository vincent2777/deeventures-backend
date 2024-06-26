"use strict";

import Response from "../utils/response";
import models from "../database/models";
import WalletValidator from "../utils/validators/wallet_validator";

const { Wallets, ReferralWallets, Transactions, Settings } = models;


/**
 * @class UserController
 **/
class WalletController {

    /**
     *@function createWallet, (To create a new wallet).
     **/
    static createWallet = async (req, res) => {
        try {
            const requestBody = req.body;
            // console.log("REQUEST BODY::: ", requestBody);

            //  Validate the Request Body.
            const { error, value } = WalletValidator.createWalletSchema.validate({ ...requestBody });
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  Create a Wallet.
            const wallet = await Wallets.create({ ...value });
            if (!wallet) {
                const response = new Response(
                    false,
                    409,
                    "Wallet creation failed."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                201,
                "Successfully created a new wallet.",
                { wallet }
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
    };
    static createReferralWallet = async (req, res) => {
        try {
            const requestBody = req.body;
            // console.log("REQUEST BODY::: ", requestBody);

            //  Validate the Request Body.
            const { error, value } = WalletValidator.createWalletSchema.validate({ ...requestBody });
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  Create a Wallet.
            const referralWallet = await ReferralWallets.create({ ...value });
            if (!referralWallet) {
                const response = new Response(
                    false,
                    409,
                    "Referral wallet creation failed."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                201,
                "Successfully created a new referral wallet.",
                { referralWallet }
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
    };


    /**
     *@function getWallets, (Get all wallets).
     **/
    static getWallets = async (req, res) => {
        try {
            const wallets = await Wallets.findAll();
            if (!wallets.length) {
                const response = new Response(
                    false,
                    404,
                    "No wallet found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Wallets retrieved successfully.',
                { wallets }
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
    };
    static getReferralWallets = async (req, res) => {
        try {
            const referralWallets = await ReferralWallets.findAll();
            if (!referralWallets.length) {
                const response = new Response(
                    false,
                    404,
                    "No referral wallet found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Referral wallets retrieved successfully.',
                { referralWallets }
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
    };


    /**
     *@function getWallet, (Get single wallet).
     **/
    static getWallet = async (req, res) => {
        try {
            const { id } = req.params;

            const wallet = await Wallets.findByPk(id);
            if (!wallet) {
                const response = new Response(
                    false,
                    404,
                    "Wallet not found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Wallet retrieved successfully.',
                { wallet }
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
    };
    static getReferralWallet = async (req, res) => {
        try {
            const { id } = req.params;

            const referralWallet = await ReferralWallets.findByPk(id);
            if (!referralWallet) {
                const response = new Response(
                    false,
                    404,
                    "Referral wallet not found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Referral wallet retrieved successfully.',
                { referralWallet }
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
    };


    /**
     *@function getUserWallet, (Get single wallet).
     **/
    static getUserWallet = async (req, res) => {
        try {
            const { userID } = req.params;
            // console.log("USERS ID::: ", userID);

            const wallet = await Wallets.findOne({
                where: { user_id: userID },
            });
            if (!wallet) {
                const response = new Response(
                    false,
                    404,
                    "Wallet not found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Wallet retrieved successfully.',
                { wallet }
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
    };
    static getUserReferralWallet = async (req, res) => {
        try {
            const { userID } = req.params;
            // console.log("USERS ID::: ", userID);

            const referralWallet = await ReferralWallets.findOne({
                where: { user_id: userID },
            });
            if (!referralWallet) {
                const response = new Response(
                    false,
                    404,
                    "Referral wallet not found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Referral wallet retrieved successfully.",
                { referralWallet }
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
    };


    /**
     *@function updateWallet, (Update single wallet).
     **/
    static updateWallet = async (req, res) => {
        try {
            const { id } = req.params;
            const { amount } = req.body;

            //  Get the previous Amount.
            const { amount: prevAmount } = await Wallets.findOne({
                where: { user_id: id },
            });

            const updatedWallet = await Wallets.update({ amount: prevAmount + amount }, { where: { user_id: id } });
            if (updatedWallet[0] === 0) {
                const response = new Response(
                    false,
                    404,
                    "Failed to update wallet."
                );
                return res.status(response.code).json(response);
            }

            const newlyUpdatedWallet = await Wallets.findOne({
                where: { user_id: id },
            });

            const response = new Response(
                true,
                200,
                'Wallet updated successfully.',
                { wallet: newlyUpdatedWallet }
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
    };
    static updateReferralWallet = async (req, res) => {
        try {
            const { id } = req.params;
            const { amount } = req.body;

            //  Get the previous Amount.
            const { amount: prevAmount } = await ReferralWallets.findOne({
                where: { user_id: id },
            });

            const updatedWallet = await ReferralWallets.update({ amount: prevAmount + amount }, { where: { user_id: id } });
            if (updatedWallet[0] === 0) {
                const response = new Response(
                    false,
                    404,
                    "Failed to update referral wallet."
                );
                return res.status(response.code).json(response);
            }

            const newlyUpdatedWallet = await ReferralWallets.findOne({
                where: { user_id: id },
            });

            const response = new Response(
                true,
                200,
                'Referral wallet updated successfully.',
                { wallet: newlyUpdatedWallet }
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
    };


    /**
     *@function depositMoney, (Deposit money).
     **/
    static depositMoney = async (req, res) => {
        try {
            const { id } = req.params;
            const { amount } = req.body;

            //  Get the previous Amount.
            const wallet = await Wallets.findOne({
                where: { user_id: id },
            });

            // Insert transaction information into Transactions table
            const transactionPayload = {
                user_id: id,
                trnx_amount: amount,
                trnx_type: "Wallet Funding",
                trnx_desc: `Wallet funding with ${ amount } naira.`,
                trnx_status: 0,
                trnx_rate: amount,
                trnx_address: wallet.id,
                trnx_image: "",
                to_receive: amount,
                currency: "NGN",
            };
            const transaction = await Transactions.create({ ...transactionPayload });
            if (!transaction) {
                const response = new Response(
                    false,
                    409,
                    "Failed to create transaction."
                );
                return res.status(response.code).json(response);
            }

            // Get account settings
            const settings = await Settings.findByPk(1);
            if (!settings) {
                const response = new Response(
                    false,
                    404,
                    "Settings not found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Deposit initiated successfully.",
                { settings, transaction }
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${error}`);

            const response = new Response(
                false,
                500,
                "Server error, please try again later."
            );
            return res.status(response.code).json(response);
        }
    };
}

export default WalletController;