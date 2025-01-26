"use strict";

import { Router } from "express";
import TokenValidation from "../utils/token_validation";
import SettingController from "../controllers/setting_controller";

//  Set up Express Router.
const settingRouter = Router();


//  Get settings.
settingRouter.get(
    "/setting",
    TokenValidation.userTokenValidation,
    SettingController.getSettings
);

//  Update settings.
settingRouter.put(
    "/update_settings",
    TokenValidation.userTokenValidation,
    SettingController.updateSettings
);

export default settingRouter;