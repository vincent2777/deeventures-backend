"use strict";

import models from "../database/models";
import Response from "../utils/response";
import SettingsValidator from "../utils/validators/setting_validator";

const { Settings } = models;

/**
 * @class SettingController
 **/
class SettingController {


    /**
     * @function getSettings (Get settings).
     **/
    static getSettings = async (req, res) => {
        try {

            const settings = await Settings.findByPk(1);
            if (!settings) {
                const response = new Response(
                    false,
                    404,
                    "Settings not found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Settings retrieved successfully.',
                { settings }
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
     * @function updateSettings (Update a settings).
     **/
    static updateSettings = async (req, res) => {
        try {
            const requestBody = req.body;

            //  Validate the Request Body.
            const {error, value} = SettingsValidator.updateSettingsSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            const updatedSettings = await Settings.update({ ...value }, { where: { id: 1 } });
            if (updatedSettings[0] === 0) {
                const response = new Response(
                    false,
                    400,
                    "Failed to update settings."
                );
                return res.status(response.code).json(response);
            }

            //  Get the updated transaction back.
            const transaction = await Settings.findByPk(id);

            const response = new Response(
                true,
                200,
                "Settings updated successfully.",
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
}

export default SettingController;