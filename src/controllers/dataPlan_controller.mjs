"use strict";

import models from "../database/models/index.mjs";
import Response from "../utils/response.mjs";
import DataPlanValidator from "../utils/validators/dataPlan_validator.mjs";

const { DataPlans } = models;

/**
 * @class DataPlanController
 **/
class DataPlanController {

    /**
     * @function createDataPlan (Create a new data plan).
     **/
    static createDataPlan = async (req, res) => {
        try {
            const requestBody = req.body;
            // console.log("REQUEST PAYLOAD::: ", requestBody);

            //  Validate the Request Body.
            const {error, value} = DataPlanValidator.createDataPlanSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            const dataPlan = await DataPlans.create({ ...value });
            if (!dataPlan) {
                const response = new Response(
                    false,
                    409,
                    "Failed to create data plan."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                201,
                "Data plan created successfully.",
                { dataPlan }
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
     * @function getDataPlans (Get all data plans).
     **/
    static getDataPlans = async (req, res) => {
        try {
            const dataPlans = await DataPlans.findAll();
            if (!dataPlans.length) {
                const response = new Response(
                    false,
                    404,
                    "No data plan found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Data plans retrieved successfully.",
                { dataPlans }
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
    }


    /**
     * @function getDataPlan, (To get a single data plan).
     **/
    static getDataPlan = async (req, res) => {
        try {
            const { code } = req.params;

            const dataPlan = await DataPlans.findOne({
                where: { network_id: code },
            });
            if (!dataPlan) {
                const response = new Response(
                    false,
                    404,
                    "Data plan does not exist."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Data plan retrieved successfully.",
                { dataPlan }
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

export default DataPlanController;