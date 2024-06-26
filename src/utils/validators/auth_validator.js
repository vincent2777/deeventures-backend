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
        account_status: Joi.string().valid(...status).default("pending"),
        country: Joi.string(),
        referred_by: Joi.string().allow("", null),
        avatar: Joi.string(),
        password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9@#$%&]{6,30}$'))
            .error(new Error("Password must be at least 6 characters with alphanumeric and special characters.")),
    });


    /**
     * @function loginUserSchema
     **/
    static loginUserSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    });


    /**
     * @function updateUserSchema
     **/
    static updateUserSchema = Joi.object({
        full_name: Joi.string().min(3),
        // username: Joi.string(),
        email: Joi.string().email(),
        phone_number: Joi.string(),
        status: Joi.string().valid(...status),
        country: Joi.string(),
        referred_by: Joi.string(),
        reg_date: Joi.date(),
        avatar: Joi.string(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric.")),
    });
}

export default AuthValidator;