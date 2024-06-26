"use strict";

import Joi from "joi";

/**
 * @class BillPaymentValidator
 **/
class BillPaymentValidator {

    /**
     * @function buyAirtimeSchema
     **/
    static buyAirtimeSchema = Joi.object({
        mobileNetwork: Joi.string().required(),
        mobileNumber: Joi.string().required(),
        airtimeAmount: Joi.number().required(),
    });

    /**
     * @function buyDataBundleSchema
     **/
    static buyDataBundleSchema = Joi.object({
        mobileNetwork: Joi.string().required(),
        dataPlan: Joi.number().required(),
        mobileNumber: Joi.string().required(),
        dataBundleAmount: Joi.number().required(),
        totalAmt: Joi.number().required(),
    });

    /**
     * @function buyCableTVSchema
     **/
    static buyCableTVSchema = Joi.object({
        cableTV: Joi.string().required(),
        packageCode: Joi.string().required(),
        smartCardNo: Joi.number().required(),
        amount: Joi.number().required(),
        mobileNumber: Joi.string().required(),
    });

    /**
     * @function buyElectricitySchema
     **/
    static buyElectricitySchema = Joi.object({
        electricCompanyCode: Joi.string().required(),
        meterType: Joi.string().required(),
        meterNumber: Joi.string().required(),
        amount: Joi.number().required(),
        totalAmt: Joi.number().required(),
        mobileNumber: Joi.string().required(),
    });
}

export default BillPaymentValidator;