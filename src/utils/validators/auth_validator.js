"use strict";

import Joi from "joi";

const status = ["active", "pending"];

/**
 * @class AuthValidator
 **/
class AuthValidator {

    /**
     * @function signUpUserSchema
     **/
    static signUpUserSchema = Joi.object({
        full_name: Joi.string().min(3).required(),
        email: Joi.string().email(),
        phone_number: Joi.string(),
        account_status: Joi.string().valid(...status).default("active"),
        country: Joi.string(),
        referred_by: Joi.string().allow("", null),
        avatar: Joi.string(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\'",.<>\\/?|]{6,30}$'))
            .required()
            .error(new Error("Password must be at least 6 characters long and can include alphanumeric and special characters.")),
    });


    /**
     * @function loginUserSchema
     **/
    static loginUserSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    });


    /**
     * @function forgotUserPasswordSchema
     **/
    static forgotUserPasswordSchema = Joi.object({
        email: Joi.string().required().email(),
    });

    /**
     * @function resetUserPasswordSchema
     **/
    static resetUserPasswordSchema = Joi.object({
        otp: Joi.string().required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\'",.<>\\/?|]{6,30}$'))
            .required()
            .error(new Error("Password must be at least 6 characters long and can include alphanumeric and special characters.")),
        confirm_password: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .error(new Error("Confirm password must match the password.")),
    });


    /**
     * @function updateUserSchema
     **/
    static updateUserSchema = Joi.object({
        full_name: Joi.string().min(3),
        phone_number: Joi.string(),
        country: Joi.string(),
    });

    /**
   * @function updateUserPasswordSchema
   **/
    static updateUserPasswordSchema = Joi.object({
        old_password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\'",.<>\\/?|]{6,30}$'))
            .error(new Error("Password must be at least 6 characters long and can include alphanumeric and special characters.")),
        new_password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\'",.<>\\/?|]{6,30}$'))
            .error(new Error("Password must be at least 6 characters long and can include alphanumeric and special characters.")),
    });
}

export default AuthValidator;