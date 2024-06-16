"use strict";

import Joi from "joi";

/**
 * @class GiftCardValidator
 **/
class GiftCardValidator {

    /**
     * @function createGiftCardSchema
     **/
    static createGiftCardSchema = Joi.object({
        gcard_name: Joi.string().required(),
        gcard_image: Joi.string().required(),
        gcard_country: Joi.string().required(),
        gcard_currency: Joi.string().required(),
        gcard_type: Joi.string().required(),
        gcard_sellprice: Joi.number().required(),
        gcard_min_sell: Joi.number().required(),
        gcard_minrate_range: Joi.number().required(),
        gcard_maxrate_range: Joi.number().required(),
        gcard_naira_rate_range: Joi.number().required(),
        gcard_buyprice: Joi.number().required(),
        is_active: Joi.number().required()
    });

    /**
     * @function updateGiftCardSchema
     **/
    static updateGiftCardSchema = Joi.object({
        gcard_name: Joi.string(),
        gcard_image: Joi.string(),
        gcard_country: Joi.string(),
        gcard_currency: Joi.string(),
        gcard_type: Joi.string(),
        gcard_sellprice: Joi.number(),
        gcard_min_sell: Joi.number(),
        gcard_minrate_range: Joi.number(),
        gcard_maxrate_range: Joi.number(),
        gcard_naira_rate_range: Joi.number(),
        gcard_buyprice: Joi.number(),
        is_active: Joi.number()
    });
}

export default GiftCardValidator;