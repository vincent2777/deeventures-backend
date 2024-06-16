"use strict";

import Joi from "joi";

const status = [0, 1];

/**
 * @class DataPlanValidator
 **/
class DataPlanValidator {

    /**
     * @function createDataPlanSchema
     **/
    static createDataPlanSchema = Joi.object({
        network_id: Joi.string().required(),
        data_plans_isp: Joi.string().required(),
        data_plans_commission: Joi.number().required(),
        data_plans_isp_image: Joi.string().required(),
        is_active: Joi.string().valid(...status).default(1),
    });
}

export default DataPlanValidator;