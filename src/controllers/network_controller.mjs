"use strict";

import models from "../database/models";
import Response from "../utils/response";
import NetworkValidator from "../utils/validators/airtime_validator";

const { AirTimes } = models;

/**
 * @class NetworkController
 **/
class NetworkController {

    /**
     * @function createAirtime (Create a new airtime).
     **/
    static createAirtime = async (req, res) => {
        try {
            const requestBody = req.body;

            //  Validate the Request Body.
            const {error, value} = NetworkValidator.createAirtimeSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            const airtime = await AirTimes.create({ ...value });
            if (!airtime) {
                const response = new Response(
                    false,
                    409,
                    "Failed to create airtime."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                201,
                'Airtime created successfully.',
                { airtime }
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
     * @function getAirTimes (Get all airtime).
     **/
    static getAirTimes = async (req, res) => {
        try {
            const airTimes = await AirTimes.findAll();
            if (!airTimes.length) {
                const response = new Response(
                    false,
                    404,
                    "No airtime found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Airtime retrieved successfully.',
                { airTimes }
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
     * @function getAirTime, (To get a single airtime).
     **/
    static getAirTime = async (req, res) => {
        try {
            const { code } = req.params;

            const airtime = await AirTimes.findOne({
                where: { code },
            });
            if (!airtime) {
                const response = new Response(
                    false,
                    404,
                    "Airtime does not exist."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Airtime retrieved successfully.",
                { airtime }
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

export default NetworkController;