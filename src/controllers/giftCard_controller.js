"use strict";

import models from "../database/models";
import Response from "../utils/response";
import GiftCardValidator from "../utils/validators/giftCard_validator";

const { GiftCards } = models;


/**
 * @class GiftCardController
 **/
class GiftCardController {

    /**
     * @function getGiftCards (Get all gift cards).
     **/
    static getGiftCards = async (req, res) => {
        try {
            const giftCards = await GiftCards.findAll();
            if (!giftCards.length) {
                const response = new Response(
                    false,
                    404,
                    "No gift card found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Gift cards retrieved successfully.',
                { giftCards }
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
     * @function getGiftCard (Get single gift card).
     **/
    static getGiftCard = async (req, res) => {
        try {
            const { id } = req.params;
            const giftCard = await GiftCards.findByPk(id);
            if (!giftCard) {
                const response = new Response(
                    false,
                    404,
                    "Gift card not found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Gift card retrieved successfully.',
                { giftCard }
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
     * @function updateGiftCard (Update a gift card)
     **/
    static updateGiftCard = async (req, res) => {
        try {
            const { id } = req.params;
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = GiftCardValidator.updateGiftCardSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            const updatedGiftCard = await GiftCards.update({ ...value }, { where: { id } });
            if (updatedGiftCard[0] === 0) {
                const response = new Response(
                    false,
                    400,
                    "Failed to update gift card."
                );
                return res.status(response.code).json(response);
            }

            //  Get the updated gift card back.
            const giftCard = await GiftCards.findByPk(id);

            const response = new Response(
                true,
                200,
                "Gift card updated successfully.",
                { giftCard }
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
     * @function deleteGiftCard (Delete a gift card).
     **/
    static deleteGiftCard = async (req, res) => {
        try {
            const { id } = req.params;

            const deletedGiftCard = await GiftCards.destroy({ where: { id } });
            if (deletedGiftCard === 0) {
                const response = new Response(
                    false,
                    400,
                    "Failed to delete gift card."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Gift card deleted successfully."
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

export default GiftCardController;