"use strict";


import { Router } from "express";
import TokenValidation from "../utils/token_validation";
import GiftCardController from "../controllers/giftCard_controller";

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

export default giftCardRouter;