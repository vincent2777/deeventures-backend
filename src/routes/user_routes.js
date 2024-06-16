"use strict";

import { Router } from 'express';
import UsersController from "../controllers/user_controller";
import TokenValidation from "../utils/token_validation";

//  Set up Express Router.
const userRouter = Router();

//  Users SignUp.
userRouter.post(
    "/signup",
    UsersController.signUpUser
);

//  User Login.
userRouter.post(
    "/login",
    UsersController.loginUser
);

//  Get all Users.
userRouter.get(
    "/all_users",
    TokenValidation.userTokenValidation,
    UsersController.getUsers
);

//  Get a single User.
userRouter.get(
    "/single_user/:id",
    TokenValidation.userTokenValidation,
    UsersController.getUser
);

//  Update a User.
userRouter.put(
    "/update_user/:id",
    TokenValidation.userTokenValidation,
    UsersController.updateUser
);

//  Get top ten traders.
userRouter.get(
    "/get_top_traders",
    TokenValidation.userTokenValidation,
    UsersController.getTopTraders
);

export default userRouter;