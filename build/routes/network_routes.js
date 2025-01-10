"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _network_controller = _interopRequireDefault(require("../controllers/network_controller"));
var _token_validation = _interopRequireDefault(require("../utils/token_validation"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//  Set up Express Router.
const networkRouter = (0, _express.Router)();

//  Create cable tv.
networkRouter.post("/create_airtime", _token_validation.default.userTokenValidation, _network_controller.default.createAirtime);

//  Get all cable tv.
networkRouter.get("/all_airtime", _token_validation.default.userTokenValidation, _network_controller.default.getAirTimes);

//  Get single cable tv.
networkRouter.get("/single_airtime/:code", _token_validation.default.userTokenValidation, _network_controller.default.getAirTime);
var _default = exports.default = networkRouter;
//# sourceMappingURL=network_routes.js.map