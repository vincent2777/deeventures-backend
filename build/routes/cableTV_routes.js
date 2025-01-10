"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _cableTV_controller = _interopRequireDefault(require("../controllers/cableTV_controller"));
var _token_validation = _interopRequireDefault(require("../utils/token_validation"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//  Set up Express Router.
const cableTVRouter = (0, _express.Router)();

//  Create cable tv.
cableTVRouter.post("/create_cable_tv", _token_validation.default.userTokenValidation, _cableTV_controller.default.createCableTV);

//  Get all cable tv.
cableTVRouter.get("/all_cable_tv", _token_validation.default.userTokenValidation, _cableTV_controller.default.getCableTVs);

//  Get single cable tv.
cableTVRouter.get("/single_cable_tv/:code", _token_validation.default.userTokenValidation, _cableTV_controller.default.getCableTV);
var _default = exports.default = cableTVRouter;
//# sourceMappingURL=cableTV_routes.js.map