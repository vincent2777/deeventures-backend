"use strict";


import { Router } from "express";
import TokenValidation from "../utils/token_validation.mjs";
import GiftCardController from "../controllers/giftCard_controller.mjs";
import {uploadCardProof} from "../utils/file_upload.mjs";

//  Set up Express Router.
const giftCardRouter = Router();


//  Get all Gift cards.
giftCardRouter.get(
    "/all_gift_cards",
    TokenValidation.userTokenValidation,
    GiftCardController.getGiftCards
);

//  Get single gift card.
giftCardRouter.get(
    "/single_gift_card/:id",
    TokenValidation.userTokenValidation,
    GiftCardController.getGiftCard
);

//  Update a gift card.
giftCardRouter.put(
    "/update_gift_card",
    TokenValidation.userTokenValidation,
    GiftCardController.updateGiftCard
);

//  Delete a gift card.
giftCardRouter.delete(
    "/delete_gift_card",
    TokenValidation.userTokenValidation,
    GiftCardController.deleteGiftCard
);

//get gift card rates
giftCardRouter.get(
    "/gift_card_rates/:id",
    TokenValidation.userTokenValidation,
    GiftCardController.getGiftCardRates
);

//get gift card rates
giftCardRouter.post(
    "/sell_gift_card",
    TokenValidation.userTokenValidation,
    uploadCardProof,
    GiftCardController.sellGiftCard
);



export default giftCardRouter;