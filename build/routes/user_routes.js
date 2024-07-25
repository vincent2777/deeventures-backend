"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _user_controller = _interopRequireDefault(require("../controllers/user_controller"));
var _token_validation = _interopRequireDefault(require("../utils/token_validation"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//  Set up Express Router.
const userRouter = (0, _express.Router)();

//  Users SignUp.
userRouter.post("/signup", _user_controller.default.signUpUser);

//  User Login.
userRouter.post("/login", _user_controller.default.loginUser);

//  Get all Users.
userRouter.get("/all_users", _token_validation.default.userTokenValidation, _user_controller.default.getUsers);

//  Get a single User.
userRouter.get("/single_user/:id", _token_validation.default.userTokenValidation, _user_controller.default.getUser);

//  Update a User.
userRouter.put("/update_user/:id", _token_validation.default.userTokenValidation, _user_controller.default.updateUser);

//  Get top ten traders.
userRouter.get("/get_top_traders", _token_validation.default.userTokenValidation, _user_controller.default.getTopTraders);

//Update user password
userRouter.post("/update_password/:id", _user_controller.default.updateUserPassword);

//Delete user
userRouter.delete("/delete_user/:id", _user_controller.default.deleteUser);
var _default = exports.default = userRouter;
//# sourceMappingURL=user_routes.js.map