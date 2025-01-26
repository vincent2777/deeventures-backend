"use strict";

import jwt from 'jsonwebtoken';
import Response from './response.mjs';
import models from "../database/models/index.mjs";

const { Users } = models;

class TokenValidation {

    //  User Token Validation.
    static userTokenValidation = async (req, res, next) => {
        try {
            //  Get the token from the "Header, Query or Body" if available.
            const bearerToken = req.headers.authorization ||
                req.headers['x-access-token'] ||
                req.query.token ||
                req.body.token;
            if (!bearerToken) {
                const response = new Response(
                    false,
                    401,
                    "Unauthorized, you did not provide any token."
                );
                return res.status(response.code).json(response);
            }

            // Split the access token and remove the Bearer and pick only the jwt token
            const token = bearerToken.split(" ")[1];

            //  Get the Users "id".
            const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

            //  Make sure that the respective User exists in the DB.
            const user = await Users.findOne({
                where: { id }
            });
            if (!user) {
                const response = new Response(
                    false,
                    401,
                    "Unauthorized, this user does not exist.",
                );
                return res.status(response.code).json(response);
            }

            //  Now append the decoded token to the request body.
            req.requestPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
            return next();

        } catch (error) {
            const response = new Response(
                false,
                401,
                "Unauthorized, you have an invalid token."
            );
            return res.status(response.code).json(response);
        }
    };
}

export default TokenValidation;
