"use strict";

import Joi from "joi";

/**
 * @class NetworkValidator
 **/
class NetworkValidator {

    /**
     * @function createAirtimeSchema
     **/
    static createAirtimeSchema = Joi.object({
        code: Joi.string().required(),
        airtime_isp: Joi.string().required(),
        airtime_commission: Joi.number().required(),
        airtime_image: Joi.string().required(),
        is_active: Joi.number().required(),
    });
}

export default NetworkValidator;