"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _cableTV_controller = _interopRequireDefault(require("../controllers/cableTV_controller"));
var _token_validation = _interopRequireDefault(require("../utils/token_validation"));
var _electricCompany_controller = _interopRequireDefault(require("../controllers/electricCompany_controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//  Set up Express Router.
const electricityVRouter = (0, _express.Router)();

//  Create electricity company.
/*electricityVRouter.post(
    "/create_electricity_company",
    TokenValidation.userTokenValidation,
    ElectricController.createElectricCompany
);*/

//  Create meter type.
electricityVRouter.post("/create_meter_type", _token_validation.default.userTokenValidation, _electricCompany_controller.default.createMeterType);

//  Get all electricity companies.
electricityVRouter.get("/all_electricity_companies", _token_validation.default.userTokenValidation, _electricCompany_controller.default.getElectricCompanies);

//  Get all cable tv.
electricityVRouter.get("/all_meter_types", _token_validation.default.userTokenValidation, _electricCompany_controller.default.getMeterTypes);

//  Get single electricity company.
electricityVRouter.get("/single_electricity_company/:code", _token_validation.default.userTokenValidation, _electricCompany_controller.default.getElectricCompany);

//  Get single electricity company.
electricityVRouter.get("/single_meter_type/:code", _token_validation.default.userTokenValidation, _electricCompany_controller.default.getMeterType);
var _default = exports.default = electricityVRouter;
//# sourceMappingURL=electricity_routes.js.map