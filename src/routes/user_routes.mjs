"use strict";

import { Router } from 'express';
import UsersController from "../controllers/user_controller.mjs";
import TokenValidation from "../utils/token_validation.mjs";
import {uploadProfileImage} from "../utils/file_upload.mjs";
import TransactionController from "../controllers/transaction_controller.mjs";
import transactionRouter from "./transaction_routes.mjs";

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

//  Forgot Password.
userRouter.post(
    "/forgot_password",
    UsersController.forgotUserPassword
);

//  Reset Password.
userRouter.post(
    "/reset_password",
    UsersController.resetUserPassword
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

//Update user password
userRouter.post(
    "/update_password/:id",
    UsersController.updateUserPassword
);

//Delete user
userRouter.delete(
    "/delete_user/:id",
    UsersController.deleteUser
);

//  Upload Profile Image.
userRouter.post(
    "/upload_profile_image/:id",
    TokenValidation.userTokenValidation,
    uploadProfileImage,
    UsersController.uploadUserProfileImage
);

export default userRouter;