"use strict";

import Joi from "joi";

/**
 * @class SettingsValidator
 **/
class SettingsValidator {

    /**
     * @function updateSettingsSchema
     **/
    static updateSettingsSchema = Joi.object({
        kyclevel1_max_withdrawal: Joi.number(),
        kyclevel2_max_withdrawal: Joi.number(),
        kyclevel3_max_withdrawal: Joi.number(),
        referral_commission: Joi.number(),
        account_bank: Joi.string(),
        account_number: Joi.number(),
        deposit_instructions: Joi.string(),
        min_withdrawal: Joi.number(),
        clubkonect_api: Joi.string(),
        clubkonect_userid: Joi.string(),
        max_withdrawal: Joi.number(),
    });
}

export default SettingsValidator;