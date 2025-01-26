"use strict";

import models from "../database/models/index.mjs";
import Response from "../utils/response.mjs";
import CableTVValidator from "../utils/validators/cableTV_validator.mjs";

const { CableTVs } = models;

/**
 * @class CableTVController
 **/
class CableTVController {

    /**
     * @function createCableTV (Create a new cable tv).
     **/
    static createCableTV = async (req, res) => {
        try {
            const requestBody = req.body;
            // console.log("REQUEST PAYLOAD::: ", requestBody);

            //  Validate the Request Body.
            const {error, value} = CableTVValidator.createCableTVSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            const cableTV = await CableTVs.create({ ...value });
            if (!cableTV) {
                const response = new Response(
                    false,
                    409,
                    "Failed to create cable tv."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                201,
                'Cable tv created successfully.',
                { cableTV }
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
     * @function getCableTVs (Get all cable tv).
     **/
    static getCableTVs = async (req, res) => {
        try {
            const cableTVs = await CableTVs.findAll();
            if (!cableTVs.length) {
                const response = new Response(
                    false,
                    404,
                    "No cable tv found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Cable TVs retrieved successfully.',
                { cableTVs }
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
     * @function getCableTV, (To get a single cable TV).
     **/
    static getCableTV = async (req, res) => {
        try {
            const { code } = req.params;

            const cableTV = await CableTVs.findOne({
                where: { provider_id: code },
            });
            if (!cableTV) {
                const response = new Response(
                    false,
                    404,
                    "Cable tv does not exist."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Cable tv retrieved successfully.',
                { cableTV }
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
}

export default CableTVController;