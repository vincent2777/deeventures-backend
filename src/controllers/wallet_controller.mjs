"use strict";

import Response from "../utils/response";
import models from "../database/models";
import WalletValidator from "../utils/validators/wallet_validator";
import getCurrentDateTime from "../utils/datetime";
import SendEMail from "../utils/send_email";
import otpGenerator from "otp-generator";

const { Wallets, ReferralWallets, Users, Transactions, Settings, OTP } = models;


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
            const { userID } = req.params;
            const { amount } = req.body;

            //  Get the previous Amount.
            const wallet = await Wallets.findOne({
                where: { user_id: userID },
            });

            // Insert transaction information into Transactions table
            const transactionPayload = {
                user_id: userID,
                trnx_amount: amount,
                trnx_type: "Wallet Funding",
                trnx_desc: `Wallet funding with ${amount} naira.`,
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


    /**
     *@function withdrawMoney, (Withdraw money).
     **/
     static withdrawMoney = async (req, res) => {
        try {
            const { userID } = req.params;
            const { amount } = req.body;
    
            console.log(`Request Received: userID: ${userID}, amount: ${amount}`);
    
            // Generate a Six-digit OTP
            const otp = otpGenerator.generate(6, {
                digits: true,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            });
            console.log(`Generated OTP: ${otp}`);
    
            // Fetch user details
            const user = await Users.findOne({
                where: { id: userID },
            });
    
            if (!user) {
                console.error(`User not found for userID: ${userID}`);
                const response = new Response(
                    false,
                    404,
                    "User not found. Please check the user ID and try again."
                );
                return res.status(response.code).json(response);
            }
    
            const userEmail = user.email;
            const userName = user.username;
    
            console.log(`User found: email: ${userEmail}, username: ${userName}`);
    
            // Save OTP to the database
            await OTP.create({
                otp,
                user_id: userID,
            });
            console.log(`OTP saved to the database for userID: ${userID}`);
    
            // Send OTP to the user's email
            const subject = "Withdrawal Request";
            const emailResponse = await SendEMail.sendOTPMail(userEmail, userName, subject, otp, amount);
            
            if (!emailResponse || !emailResponse.response) {
                console.error(`Failed to send email to: ${userEmail}`);
                const response = new Response(
                    false,
                    500,
                    "Failed to send OTP email. Please try again later."
                );
                return res.status(response.code).json(response);
            }
    
            console.log(`Email sent successfully. Response: ${emailResponse.response}`);
    
            const response = new Response(
                true,
                201,
                "An OTP has been sent successfully to your email. Kindly check your email for your OTP."
            );
            return res.status(response.code).json(response);
    
        } catch (error) {
            console.error(`ERROR::: ${error.message}`, error);
    
            const response = new Response(
                false,
                500,
                "Server error, please try again later."
            );
            return res.status(response.code).json(response);
        }
    };
    

    /**
  *@function verifyWithdrawMoney, (Verify money withdrawal).
  **/
    static verifyWithdrawMoney = async (req, res) => {
        try {
            const { userID } = req.params;
            const { amount, withdrawalChannel, account_number, account_name, bank_name, otp } = req.body;

            //  Find the OTP.
            const foundOTP = await OTP.findOne({
                where: { otp, user_id: userID },
            });
            if (foundOTP === null) {
                const response = new Response(
                    false,
                    400,
                    "The OTP is invalid, kindly request for an OTP."
                );
                return res.status(response.code).json(response);
            }

            let wallet;
            //check if user has the amount in their wallet
            if (withdrawalChannel === "main_wallet") {
                wallet = await Wallets.findOne({
                    where: { user_id: userID },
                });
            } else {
                wallet = await ReferralWallets.findOne({
                    where: { user_id: userID },
                });
            }
            const prevAmount = wallet.amount;

            if (prevAmount < amount) {
                // Your logic here
                return res.status(409).json(new Response(false, 409, "You don't have sufficient funds in your wallet"));
            } else {

                //  Update User's Wallet.
                await Wallets.update({ amount: prevAmount - amount }, { where: { user_id: userID } });

                const trnxDesc = `Withdrawal Request from  ${withdrawalChannel.replace("_", " ")} Account Number: ${account_number}, Account Name: ${account_name}, Bank: ${bank_name}`;

                //get userEmail
                const user = await Users.findOne({
                    where: { id: userID },
                });

                // Insert transaction information into Transactions table
                const transactionPayload = {
                    user_id: userID,
                    trnx_amount: amount,
                    trnx_type: "Fund Withdrawal",
                    trnx_desc: trnxDesc,
                    trnx_status: 0,
                    trnx_rate: amount,
                    trnx_address: account_number,
                    trnx_image: "",
                    to_receive: amount,
                    currency: "NGN",
                };

                //send email
                const subject = "Withdrawal Request";
                const userEmail = user.email;
                const message = `
                <h2>Your withdrawal request was successfull</h2>
                <p><b>Amount:</b> ₦${amount}</p>
                <p><b>Account Number:</b> ${account_number}</p> 
                <p><b>Account Name:</b> ${account_name}</p> 
                <p><b>Bank Name:</b> ${bank_name}</p> 
                <p><b>Description:</b> ${trnxDesc}</p> 
                <p><b>Date:</b> ${getCurrentDateTime()}</p>`;

                const emailResponse = SendEMail.handleSendMail(userEmail, message, subject)
                const mailData = await emailResponse;

                const transaction = await Transactions.create({ ...transactionPayload });
                if (!transaction) {
                    const response = new Response(
                        false,
                        409,
                        "Failed to create withdrawal transaction."
                    );
                    return res.status(response.code).json(response);
                }

                const response = new Response(
                    true,
                    200,
                    "Withdawal request sent.",
                    { transaction }
                );
                return res.status(response.code).json(response);
            }

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