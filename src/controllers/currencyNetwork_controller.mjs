"use strict";

import models from "../database/models";
import Response from "../utils/response";
import CurrencyNetworkValidator from "../utils/validators/currencyNetwork_validator";
import CurrencyValidator from "../utils/validators/currency_validator";

const { CurrencyNetworks } = models;

/**
 * @class CurrencyNetworkController
 **/
class CurrencyNetworkController {

    /**
     * @function createCryptoNetwork (Create a new crypto network).
     **/
    static createCryptoNetwork = async (req, res) => {
        try {
            const requestBody = req.body;
            // console.log("REQUEST PAYLOAD::: ", requestBody);

            //  Validate the Request Body.
            const {error, value} = CurrencyNetworkValidator.createCurrencyNetworkSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            const transaction = await CurrencyNetworks.create({ ...value });
            if (!transaction) {
                const response = new Response(
                    false,
                    409,
                    "Failed to create crypto network."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                201,
                'Crypto network created successfully.',
                { transaction }
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
     * @function getCryptoNetworks, (Get all crypto networks).
     **/
    static getCryptoNetworks = async (req, res) => {
        try {
            const currencyNetworks = await CurrencyNetworks.findAll();
            if (!currencyNetworks.length) {
                const response = new Response(
                    false,
                    404,
                    "No crypto network found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Currency networks retrieved successfully.',
                { currencyNetworks }
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
     * @function getCryptoNetwork, (Get a single crypto network).
     **/
    static getCryptoNetwork = async (req, res) => {
        try {
            const { id } = req.params;

            const currencyNetwork = await CurrencyNetworks.findByPk(id);
            if (!currencyNetwork) {
                const response = new Response(
                    false,
                    404,
                    "No currency network found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Currency network retrieved successfully.',
                { currencyNetwork }
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
     * @function updateCryptoNetwork (Update a crypto network).
     **/
    static updateCryptoNetwork = async (req, res) => {
        try {
            const { id } = req.params;
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = CurrencyNetworkValidator.updateCurrencyNetworkSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            const updatedCryptoNetwork = await CurrencyNetworks.update({ ...value }, { where: { id } });
            if (updatedCryptoNetwork[0] === 0) {
                const response = new Response(
                    false,
                    400,
                    "Failed to update currency network."
                );
                return res.status(response.code).json(response);
            }

            //  Get the updated crypto network back.
            const currencyNetwork = await CurrencyNetworks.findByPk(id);

            const response = new Response(
                true,
                200,
                "Currency network updated successfully.",
                { currencyNetwork }
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
     * @function deleteCryptoNetwork (Delete a crypto network).
     **/
    static deleteCryptoNetwork = async (req, res) => {
        try {
            const { id } = req.params;

            const deletedCryptoNetwork = await CurrencyNetworks.destroy({ where: { id } });
            if (deletedCryptoNetwork === 0) {
                const response = new Response(
                    false,
                    400,
                    "Failed to delete currency network."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Currency network deleted successfully."
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

export default CurrencyNetworkController;