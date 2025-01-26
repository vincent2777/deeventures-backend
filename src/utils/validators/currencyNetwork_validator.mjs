"use strict";

import Joi from "joi";


/**
 * @class CurrencyNetworkValidator
 **/
class CurrencyNetworkValidator {

    /**
     * @function createCurrencyNetworkSchema
     **/
    static createCurrencyNetworkSchema = Joi.object({
        network_name: Joi.string().required(),
        network_address: Joi.string().required(),
        network_image: Joi.string().required()
    });

    /**
     * @function updateCurrencyNetworkSchema
     **/
    static updateCurrencyNetworkSchema = Joi.object({
        network_name: Joi.string().required(),
        network_image: Joi.string().required()
    });
}

export default CurrencyNetworkValidator;