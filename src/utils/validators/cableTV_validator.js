"use strict";

import Joi from "joi";

/**
 * @class CableTVValidator
 **/
class CableTVValidator {

    /**
     * @function createCableTVSchema
     **/
    static createCableTVSchema = Joi.object({
        code: Joi.string().required(),
        name: Joi.string().required(),
    });

    /**
     * @function updateCableTVSchema
     **/
    static updateCableTVSchema = Joi.object({
        code: Joi.string(),
        name: Joi.string(),
    });
}

export default CableTVValidator;