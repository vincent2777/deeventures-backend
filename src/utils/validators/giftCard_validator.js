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
        is_active: Joi.number().required()
    });

    /**
     * @function updateGiftCardSchema
     **/
    static updateGiftCardSchema = Joi.object({
        gcard_name: Joi.string(),
        gcard_image: Joi.string(),
        is_active: Joi.number()
    });
}

export default GiftCardValidator;