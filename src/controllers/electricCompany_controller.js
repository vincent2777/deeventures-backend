"use strict";

import models from "../database/models";
import Response from "../utils/response";
import ElectricCompanyValidator from "../utils/validators/electricCompany_validator";
import axios from "axios";

const { ElectricCompanies, ElectricBills, MeterTypes } = models;

/**
 * @class ElectricController
 **/
class ElectricController {

    /**
     * @function createElectricCompany (Create a new electric company).
     **/
    /*static createElectricCompany = async (req, res) => {
        try {
            const requestBody = req.body;

            //  Validate the Request Body.
            const {error, value} = ElectricCompanyValidator.createElectricCompanySchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            const electricCompany = await ElectricCompanies.create({ ...value });
            if (!electricCompany) {
                const response = new Response(
                    false,
                    409,
                    "Failed to create electric company."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                201,
                'Electric company created successfully.',
                { electricCompany }
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${error}`);

            const response = new Response(
                false,
                500,
                'Server error, please try again later.'
            );
            return res.status(response.code).json(response);
        }
    };*/

    /**
     * @function createMeterType (Create a new meter type).
     **/
    static createMeterType = async (req, res) => {
        try {
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = ElectricCompanyValidator.createMeterTypeSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            const meterType = await MeterTypes.create({ ...value });
            if (!meterType) {
                const response = new Response(
                    false,
                    409,
                    "Failed to create meter type."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                201,
                'Meter type created successfully.',
                { meterType }
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${error}`);

            const response = new Response(
                false,
                500,
                'Server error, please try again later.'
            );
            return res.status(response.code).json(response);
        }
    };



    /**
     * @function getElectricCompanies (Get all electric companies).
     **/
    static getElectricCompanies = async (req, res) => {
        try {
            const electricCompanies = await ElectricBills.findAll();
            if (!electricCompanies.length) {
                const response = new Response(
                    false,
                    404,
                    "No electric company found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Electric companies retrieved successfully.',
                { electricCompanies }
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${error}`);

            const response = new Response(
                false,
                500,
                'Server error, please try again later.'
            );
            return res.status(response.code).json(response);
        }
    }

    /**
     * @function getMeterTypes (Get all meter types).
     **/
    static getMeterTypes = async (req, res) => {
        try {
            const meterTypes = await MeterTypes.findAll();
            if (!meterTypes.length) {
                const response = new Response(
                    false,
                    404,
                    "No meter type found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Meter types retrieved successfully.',
                { meterTypes }
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${error}`);

            const response = new Response(
                false,
                500,
                'Server error, please try again later.'
            );
            return res.status(response.code).json(response);
        }
    }



    /**
     * @function getElectricCompany, (To get a single electric company).
     **/
    static getElectricCompany = async (req, res) => {
        try {
            const { code } = req.params;

            const electricCompany = await ElectricBills.findOne({
                where: { provider_id: code },
            });
            if (!electricCompany) {
                const response = new Response(
                    false,
                    404,
                    "Electric company does not exist."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Electric company retrieved successfully.",
                { electricCompany }
            );
            return res.status(response.code).json(response);
        } catch (error) {
            console.log(`ERROR::: ${error}`);

            const response = new Response(
                false,
                500,
                "Server error, please try again later."
            );
            return res.status(response.code).json(response);
        }
    };

    /**
     * @function getMeterType, (To get a single meter type).
     **/
    static getMeterType = async (req, res) => {
        try {
            const { code } = req.params;

            const meterType = await MeterTypes.findOne({
                where: { code },
            });
            if (!meterType) {
                const response = new Response(
                    false,
                    404,
                    "Meter type does not exist."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Meter type retrieved successfully.",
                { meterType }
            );
            return res.status(response.code).json(response);
        } catch (error) {
            console.log(`ERROR::: ${error}`);

            const response = new Response(
                false,
                500,
                "Server error, please try again later."
            );
            return res.status(response.code).json(response);
        }
    };

}

export default ElectricController;