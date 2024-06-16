"use strict";

import jwt from "jsonwebtoken";
import bCrypt from "bcryptjs";
import { Op, Sequelize } from "sequelize";
import models from "../database/models";
import Response from "../utils/response";
import AuthValidator from "../utils/validators/auth_validator";

const { Users, Wallets, ReferralWallets, Transactions } = models;

/**
 * @class UserController
 **/
class UserController {

    /**
     *@function signUpUser, (To create a user account).
     **/
    static signUpUser = async (req, res) => {
        try {
            const requestBody = req.body;
            // console.log("REQUEST BODY::: ", requestBody);

            //  Validate the Request Body.
            const { error, value } = AuthValidator.signUpUserSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            // Generate a Six digits OTP.
            /*const otp = otpGenerator.generate(6, {
                digits: true,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false
            });
            console.log("GEN OTP::: ", otp);*/

            //  Send OTP to users mail.
            // await SendOTPMail.sendMail(value.name, value.email, otp);
            // const emailResponse = await SendOTPMail.sendMail(name, email, otp);
            // console.log("EMAIL RESPONSE::: ", emailResponse.response);


            //  Check if User already exist and create a new Users.
            const [user, created] = await Users.findOrCreate({
                where: { email: value.email },
                defaults: { ...value }
            });
            if (!created) {
                const response = new Response(
                    false,
                    409,
                    "User already registered. Kindly login with your credentials."
                );
                return res.status(response.code).json(response);
            }
            const { id } = user;


            //  Create a Wallet and ReferralWallets.
            await Wallets.create({
                amount: 0.0,
                currency_symbol: "₦",
                user_id: id,
            });
            await ReferralWallets.create({
                amount: 0.0,
                currency_symbol: "₦",
                user_id: id,
            });

            // Update the referrer's wallet with ₦50 bonus.
            const { amount: prevAmount } = await ReferralWallets.findOne({
                where: { user_id: value.referred_by },
            });
            await ReferralWallets.update({ amount: prevAmount + 50 }, { where: { user_id: value.referred_by } });

            // TODO
            // You can notify the referrer about the added referrer's bonus

            //  Get the user back.
            const returnedUser = await Users.findOne({
                where: { id },
                attributes: {
                    exclude: ["password"]
                },
                include: {
                    model: Wallets,
                    as: "wallet",
                    attributes: {
                        exclude: ["user_id", "createdAt", "updatedAt"]
                    }
                }
            });

            const response = new Response(
                true,
                201,
                "Successfully registered. Kindly check your email for your validation link.",
                { user: returnedUser.dataValues }
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
     * @function loginUser, (To login a user).
     **/
    static loginUser = async (req, res) => {
        try {
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = AuthValidator.loginUserSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  Find the user.
            const user = await Users.findOne({
                where: { email: value.email },
                include: {
                    model: Wallets,
                    as: "wallet",
                    attributes: ["id", "user_id", "amount", "currency_symbol"]
                }
            });
            if (!user) {
                const response = new Response(
                    false,
                    404,
                    "Incorrect email. Please check your email and try again."
                );
                return res.status(response.code).json(response);
            }
            const { id, name, email, phone } = user;

            //  Check if users account is active.
            if (user.account_status !== "active") {
                const response = new Response(
                    true,
                    200,
                    "Account is pending. Kindly check your email for your validation link or complete your account creation process.",
                );
                return res.status(response.code).json(response);
            }

            //  Compare the encrypted password.
            const isPasswordMatched = bCrypt.compareSync(value.password, user.password);
            if (!isPasswordMatched) {
                const response = new Response(
                    false,
                    401,
                    "Incorrect password. Please check your password and try again."
                );
                return res.status(response.code).json(response);
            }

            //  Create a Token that will be passed to the response.
            const token = jwt.sign(
                { id, name, email, phone },
                `${process.env.JWT_SECRET_KEY}`,
            );

            //  Now remove the "password" before returning the User.
            const userDataValues = user.dataValues;
            delete userDataValues.password;

            const response = new Response(
                true,
                200,
                "You're logged in successfully.",
                {
                    user: userDataValues,
                    token
                }
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
     * @function getUsers, (To get all users).
     **/
    static getUsers = async (req, res) => {
        try {
            const users = await Users.findAll({
                attributes: {
                    exclude: ["password"]
                }
            });
            if (!users.length) {
                const response = new Response(
                    false,
                    404,
                    "No user found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Users retrieved successfully.',
                { users }
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
     * @function getUser, (To get a single user).
     **/
    static getUser = async (req, res) => {
        try {
            const { id } = req.params;

            const user = await Users.findByPk(id, {
                attributes: {
                    exclude: ["password"],
                },
                include: {
                    model: Wallets,
                    as: "wallet",
                    attributes: ["id", "user_id", "amount", "currency_symbol"]
                }
            });
            if (!user) {
                const response = new Response(
                    false,
                    404,
                    "User does not exist."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'User retrieved successfully.',
                { user }
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
     * @function getTopTraders (Get top ten users with highest transaction amount).
     **/
    static getTopTraders = async (req, res) => {
        try {

            const { type, duration } = req.query;

            let whereClause = {};
            if (type) {
                if (type.toLowerCase() === "cryptocurrency") {
                    whereClause.trnx_type = {
                        [Op.or]: [
                            { [Op.eq]: "Coin Purchase" },
                            { [Op.eq]: "Coin Sale" }
                        ]
                    };
                } else if (type === "gift_card") {
                    whereClause.trnx_type = "Gift Card Sale";
                }
            }
            if (duration) {
                const now = new Date();
                switch (duration.toLowerCase()) {
                    case "day":
                        whereClause.createdAt = { [Op.gte]: new Date(now.setDate(now.getDate() - 1)) };
                        break;
                    case "week":
                        whereClause.createdAt = { [Op.gte]: new Date(now.setDate(now.getDate() - 7)) };
                        break;
                    case "month":
                        whereClause.createdAt = { [Op.gte]: new Date(now.setMonth(now.getMonth() - 1)) };
                        break;
                }
            }

            const topTraders = await Transactions.findAll({
                where: whereClause,
                attributes: [
                    [Sequelize.fn("SUM", Sequelize.col("trnx_amount")), "total_amount"],
                    [Sequelize.fn("COUNT", Sequelize.col("user_id")), "transaction_count"]
                ],
                order: [[Sequelize.fn("SUM", Sequelize.col("trnx_amount")), "DESC"]],
                include: {
                    model: Users,
                    as: "user",
                    attributes: ["id", "full_name", "username", "country"]
                },
                group: ["user.id"],
                limit: 10
            });
            if (!topTraders.length) {
                const response = new Response(
                    false,
                    404,
                    "No top traders found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Top traders retrieved successfully.',
                { topTraders }
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
    }


    /**
     * @function updateUser, (To update a user).
     **/
    static updateUser = async (req, res) => {
        try {
            const { id } = req.params;
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = AuthValidator.updateUserSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            if (value.email) {
                const user = await Users.findOne({
                    where: { id },
                });

                //  First check if the user Email is changed, then return error message.
                if (user.email !== value.email) {
                    const response = new Response(
                        true,
                        400,
                        "Error. you cannot change your email.",
                    );
                    return res.status(response.code).json(response);
                }
            }

            const updatedUser = await Users.update({ ...value }, { where: { id } });
            if (updatedUser[0] === 0) {
                const response = new Response(
                    false,
                    400,
                    "Failed to update user."
                );
                return res.status(response.code).json(response);
            }

            //  Get the updated user back.
            const user = await Users.findOne({
                where: { id },
                attributes: {
                    exclude: ["password"]
                }
            });
            const { name, email, phone, role } = user;

            //  Create a token.
            const token = jwt.sign(
                { id, name, email, phone, role },
                `${process.env.JWT_SECRET_KEY}`,
            );

            const response = new Response(
                true,
                200,
                "Account updated successfully.",
                { user, token }
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
}

export default UserController;