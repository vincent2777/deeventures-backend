"use strict";

import models from "../database/models";
import Response from "../utils/response";
import CurrencyValidator from "../utils/validators/currency_validator";
import { Op, where } from "sequelize";

const { Currencies, CurrencyNetworks } = models;

/**
 * @class CurrencyController
 **/
class CurrencyController {

    /**
     * @function createCurrency (Create a new currency).
     **/
    static createCurrency = async (req, res) => {
        try {
            const requestBody = req.body;
            // console.log("REQUEST PAYLOAD::: ", requestBody);

            //  Validate the Request Body.
            const { error, value } = CurrencyValidator.createCurrencySchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            const currency = await Currencies.create({ ...value });
            if (!currency) {
                const response = new Response(
                    false,
                    409,
                    "Failed to create currency."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                201,
                'Currency created successfully.',
                { currency }
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
     * @function getCurrencies (Get all currencies).
     **/
    static getCurrencies = async (req, res) => {
        try {
            const currencies = await Currencies.findAll({
                where: {
                    currency_is_active: 1
                }
            });
    
            // Log the retrieved currencies
            console.log('Currencies:', currencies);
    
            if (!Array.isArray(currencies)) {
                throw new TypeError('Currencies is not an array');
            }
    
            if (!currencies.length) {
                const response = new Response(
                    false,
                    404,
                    "No currency found."
                );
                return res.status(response.code).json(response);
            }
    
            const currenciesWithNetworks = await Promise.all(currencies.map(async (eachCurrency) => {
                // Log each currency to check its structure
                // console.log('Each Currency:', eachCurrency);
    
                let currencyNetworkIds;
                try {
                    currencyNetworkIds = JSON.parse(eachCurrency.currency_network_id);
                    if (!Array.isArray(currencyNetworkIds)) {
                        throw new TypeError('Parsed currency_network_id is not an array');
                    }
                    // Convert all elements to integers
                    currencyNetworkIds = currencyNetworkIds.map(id => parseInt(id, 10));
                } catch (e) {
                    console.error(`Failed to parse currency_network_id for currency id ${eachCurrency.id}:`, e);
                    throw new TypeError(`currency_network_id is not an array for currency id ${eachCurrency.id}`);
                }
    
                // Find all CurrencyNetworks matching the IDs
                const currencyNetworks = await CurrencyNetworks.findAll({
                    where: {
                        id: {
                            [Op.in]: currencyNetworkIds
                        }
                    },
                    attributes: ["id", "network_name", "network_address"] // Add all the necessary attributes you need
                });
    
                console.log('Currency Networks:', currencyNetworks);
    
                return { ...eachCurrency.dataValues, currency_network_id: currencyNetworkIds, currency_networks: currencyNetworks };
            }));
    
            const response = new Response(
                true,
                200,
                'Currencies retrieved successfully.',
                { currencies: currenciesWithNetworks }
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
     * @function getCurrency (Get single currency).
     **/
    static getCurrency = async (req, res) => {
        try {
            const { id } = req.params;

            const currency = await Currencies.findByPk(id);
            if (!currency) {
                const response = new Response(
                    false,
                    404,
                    "Currency not found."
                );
                return res.status(response.code).json(response);
            }

            // Find all CurrencyNetworks matching the IDs
            const currencyNetworks = await CurrencyNetworks.findAll({
                where: {
                    id: {
                        [Op.in]: currency.currency_network_id
                    }
                },
                attributes: ["id", "network_name", "network_address", "network_image"] // Add all the necessary attributes you need
            });

            const response = new Response(
                true,
                200,
                'Currency retrieved successfully.',
                { ...currency.dataValues, currency_networks: currencyNetworks },
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
     * @function updateCurrency (Update a currency).
     **/
    static updateCurrency = async (req, res) => {
        try {
            const { id } = req.params;
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = CurrencyValidator.updateCurrencySchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            const updatedCurrency = await Currencies.update({ ...value }, { where: { id } });
            if (updatedCurrency[0] === 0) {
                const response = new Response(
                    false,
                    400,
                    "Failed to update currency."
                );
                return res.status(response.code).json(response);
            }

            //  Get the updated currency back.
            const currency = await Currencies.findByPk(id);

            const response = new Response(
                true,
                200,
                "Currency updated successfully.",
                { currency }
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
     * @function deleteCurrency (Delete a currency).
     **/
    static deleteCurrency = async (req, res) => {
        try {
            const { id } = req.params;

            const deletedCurrency = await Currencies.destroy({ where: { id } });
            if (deletedCurrency === 0) {
                const response = new Response(
                    false,
                    400,
                    "Failed to delete currency."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Currency deleted successfully."
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
}

export default CurrencyController;