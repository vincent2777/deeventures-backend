"use strict";

import Joi from "joi";

/**
 * @class ElectricCompanyValidator
 **/
class ElectricCompanyValidator {

    /**
     * @function createElectricCompanySchema
     **/
    static createElectricCompanySchema = Joi.object({
        code: Joi.string().required(),
        name: Joi.string().required(),
        is_active: Joi.number().required(),
    });

    /**
     * @function createMeterTypeSchema
     **/
    static createMeterTypeSchema = Joi.object({
        code: Joi.string(),
        name: Joi.string(),
    });
}

export default ElectricCompanyValidator;