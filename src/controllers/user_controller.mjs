"use strict";

import jwt from "jsonwebtoken";
import bCrypt from "bcryptjs";
import { Op, Sequelize } from "sequelize";
import models from "../database/models/index.mjs";
import Response from "../utils/response.mjs";
import AuthValidator from "../utils/validators/auth_validator.mjs";
import crypto from 'crypto';  // Use import syntax instead of require
import otpGenerator from "otp-generator";
import SendEMail from "../utils/send_email.mjs";

const { Users, Wallets, ReferralWallets, Transactions, OTP } = models;

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

            // console.log('id :::: ' + id)


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
            // const { amount: prevAmount } = await ReferralWallets.findOne({
            //     where: { user_id: value.referred_by },
            // });
            // await ReferralWallets.update({ amount: prevAmount + 50 }, { where: { user_id: value.referred_by } });

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

            console.log({
                "asasa": requestBody
            });
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

            const inputPasswordHash = crypto.createHash('md5').update(value.password).digest('hex');
            const isPasswordMatched = (inputPasswordHash === user.password);
            // const isPasswordMatched = bCrypt.compareSync(value.password, user.password);
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
     *@function forgotUserPassword, (To reset forgotten password).
     **/
    static forgotUserPassword = async (req, res) => {
        try {
            const requestBody = req.body;
            // console.log("REQUEST BODY::: ", requestBody);

            //  Validate the Request Body.
            const { error, value } = AuthValidator.forgotUserPasswordSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            // Generate a Six digits OTP.
            const otp = otpGenerator.generate(6, {
                digits: true,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false
            });
            console.log("GEN OTP::: ", otp);

            const user = await Users.findOne({
                where: { email: value.email },
            });

            //  Save OTP to the DB
            await OTP.create({
                otp,
                user_id: user.id
            });

            const userName = user.username;
            const subject = "Reset Password";

            //  Send OTP to users mail.
            const emailResponse = await SendEMail.sendForgotPasswordMail(value.email, userName, subject, otp);
            console.log("EMAIL RESPONSE::: ", emailResponse.response);

            const response = new Response(
                true,
                201,
                "An OTP has been sent successfully to your email. Kindly check your email for your OTP.",
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
     * @function resetUserPassword, (To update a user password).
     **/
    static resetUserPassword = async (req, res) => {
        try {
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = AuthValidator.resetUserPasswordSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }
            const { otp } = value;

            //  Find the OTP.
            const foundOTP = await OTP.findOne({
                where: { otp },
            });
            if (foundOTP === null) {
                const response = new Response(
                    false,
                    400,
                    "The OTP is invalid, kindly request for an OTP."
                );
                return res.status(response.code).json(response);
            }
            const { user_id } = foundOTP;

            //  Hash the new password and update the User "password" property.
            const hashedPassword = crypto.createHash('md5').update(value.password).digest('hex');
            const updatedUser = await Users.update({ "password": hashedPassword }, { where: { id: user_id } });
            if (updatedUser[0] === 0) {
                const response = new Response(
                    false,
                    400,
                    "Failed to reset password."
                );
                return res.status(response.code).json(response);
            }

            //  Delete the Users OTP.
            await OTP.destroy({
                where: { user_id }
            });

            const response = new Response(
                true,
                200,
                "Password updated successfully. Kindly login with your new password",
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
                "Profile updated successfully.",
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


    /**
     * @function updateUserPassword, (To update a user password).
     **/
    static updateUserPassword = async (req, res) => {
        try {
            const { id } = req.params;
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = AuthValidator.updateUserPasswordSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            if (value.old_password) {
                //hash old password
                const oldPassHash = crypto.createHash('md5').update(value.old_password).digest('hex');

                const user = await Users.findOne({
                    where: { id },
                });

                if (!user) {
                    const response = new Response(
                        false,
                        404,
                        "User not found."
                    );
                    return res.status(response.code).json(response);
                }

                // Check if the old password matches
                if (user.password !== oldPassHash) {
                    const response = new Response(
                        false,
                        400,
                        "Old password is incorrect."
                    );
                    return res.status(response.code).json(response);
                }

                // Hash the new password
                const newPassHash = crypto.createHash('md5').update(value.new_password).digest('hex');
                // Update the password in the database
                user.password = newPassHash;
                await user.save();
            }

            const response = new Response(
                true,
                200,
                "Password updated successfully."
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
 * @function deleteUser, (To delete a user).
 **/
    static deleteUser = async (req, res) => {
        const { id } = req.params;

        try {
            const user = await Users.findOne({ where: { id } });

            if (!user) {
                const response = new Response(false, 404, "User not found.");
                return res.status(response.code).json(response);
            }

            await user.destroy();
            const response = new Response(true, 200, "Your account has been deleted!");
            return res.status(response.code).json(response);
        } catch (error) {
            console.error('Error deleting user:', error);
            const response = new Response(false, 500, "An error occurred while deleting the user.");
            return res.status(response.code).json(response);
        }
    }


    /**
     * @function uploadUserProfileImage (Upload user profile image).
     **/
    static uploadUserProfileImage = async (req, res) => {
        try {
            const { id } = req.params;
            const filename = req.file.filename;
            const imageURL = `http://${req.headers.host}/uploads/profile_image/${filename}`;
            // const imageURL = `http://${req.headers.host}/deeventure-apis/uploads/profile_image/${filename}`;
            // console.log("IMAGE FILE:::", req.file);

            //  Update the User profile image.
            const updatedUser = await Users.update(
                { avatar: imageURL },
                { where: { id } }
            );
            if (updatedUser[0] === 0) {
                const response = new Response(
                    false,
                    400,
                    "Failed to update user profile image."
                );
                return res.status(response.code).json(response);
            }

            //  Get the updated user back.
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
                "Profile image updated successfully.",
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
}

export default UserController;