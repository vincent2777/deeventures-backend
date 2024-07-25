"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _sequelize = require("sequelize");
var _models = _interopRequireDefault(require("../database/models"));
var _response = _interopRequireDefault(require("../utils/response"));
var _auth_validator = _interopRequireDefault(require("../utils/validators/auth_validator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const crypto = require('crypto');
const {
  Users,
  Wallets,
  ReferralWallets,
  Transactions
} = _models.default;

/**
 * @class UserController
 **/
class UserController {}
/**
 *@function signUpUser, (To create a user account).
 **/
_defineProperty(UserController, "signUpUser", async (req, res) => {
  try {
    const requestBody = req.body;
    // console.log("REQUEST BODY::: ", requestBody);

    //  Validate the Request Body.
    const {
      error,
      value
    } = _auth_validator.default.signUpUserSchema.validate(requestBody);
    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }

    // Generate a Six digits OTP.
    /*const otp = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    });
    console.log("GEN OTP::: ", otp);*/

    //  Send OTP to users mail.
    // await SendOTPMail.sendMail(value.name, value.email, otp);
    // const emailResponse = await SendOTPMail.sendMail(name, email, otp);
    // console.log("EMAIL RESPONSE::: ", emailResponse.response);

    //  Check if User already exist and create a new Users.
    const [user, created] = await Users.findOrCreate({
      where: {
        email: value.email
      },
      defaults: {
        ...value
      }
    });
    if (!created) {
      const response = new _response.default(false, 409, "User already registered. Kindly login with your credentials.");
      return res.status(response.code).json(response);
    }
    const {
      id
    } = user;

    // console.log('id :::: ' + id)

    //  Create a Wallet and ReferralWallets.
    await Wallets.create({
      amount: 0.0,
      currency_symbol: "₦",
      user_id: id
    });
    await ReferralWallets.create({
      amount: 0.0,
      currency_symbol: "₦",
      user_id: id
    });

    // Update the referrer's wallet with ₦50 bonus.
    // const { amount: prevAmount } = await ReferralWallets.findOne({
    //     where: { user_id: value.referred_by },
    // });
    // await ReferralWallets.update({ amount: prevAmount + 50 }, { where: { user_id: value.referred_by } });

    // TODO
    // You can notify the referrer about the added referrer's bonus

    //  Get the user back.
    const returnedUser = await Users.findOne({
      where: {
        id
      },
      attributes: {
        exclude: ["password"]
      },
      include: {
        model: Wallets,
        as: "wallet",
        attributes: {
          exclude: ["user_id", "createdAt", "updatedAt"]
        }
      }
    });
    const response = new _response.default(true, 201, "Successfully registered. Kindly check your email for your validation link.", {
      user: returnedUser.dataValues
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function loginUser, (To login a user).
 **/
_defineProperty(UserController, "loginUser", async (req, res) => {
  try {
    const requestBody = req.body;

    //  Validate the Request Body.
    const {
      error,
      value
    } = _auth_validator.default.loginUserSchema.validate(requestBody);
    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }

    //  Find the user.
    const user = await Users.findOne({
      where: {
        email: value.email
      },
      include: {
        model: Wallets,
        as: "wallet",
        attributes: ["id", "user_id", "amount", "currency_symbol"]
      }
    });
    if (!user) {
      const response = new _response.default(false, 404, "Incorrect email. Please check your email and try again.");
      return res.status(response.code).json(response);
    }
    const {
      id,
      name,
      email,
      phone
    } = user;

    //  Check if users account is active.
    if (user.account_status !== "active") {
      const response = new _response.default(true, 200, "Account is pending. Kindly check your email for your validation link or complete your account creation process.");
      return res.status(response.code).json(response);
    }

    //  Compare the encrypted password.

    const inputPasswordHash = crypto.createHash('md5').update(value.password).digest('hex');
    const isPasswordMatched = inputPasswordHash === user.password;
    // const isPasswordMatched = bCrypt.compareSync(value.password, user.password);
    if (!isPasswordMatched) {
      const response = new _response.default(false, 401, "Incorrect password. Please check your password and try again.");
      return res.status(response.code).json(response);
    }

    //  Create a Token that will be passed to the response.
    const token = _jsonwebtoken.default.sign({
      id,
      name,
      email,
      phone
    }, `${process.env.JWT_SECRET_KEY}`);

    //  Now remove the "password" before returning the User.
    const userDataValues = user.dataValues;
    delete userDataValues.password;
    const response = new _response.default(true, 200, "You're logged in successfully.", {
      user: userDataValues,
      token
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function getUsers, (To get all users).
 **/
_defineProperty(UserController, "getUsers", async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: {
        exclude: ["password"]
      }
    });
    if (!users.length) {
      const response = new _response.default(false, 404, "No user found.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, 'Users retrieved successfully.', {
      users
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function getUser, (To get a single user).
 **/
_defineProperty(UserController, "getUser", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const user = await Users.findByPk(id, {
      attributes: {
        exclude: ["password"]
      },
      include: {
        model: Wallets,
        as: "wallet",
        attributes: ["id", "user_id", "amount", "currency_symbol"]
      }
    });
    if (!user) {
      const response = new _response.default(false, 404, "User does not exist.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, 'User retrieved successfully.', {
      user
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function getTopTraders (Get top ten users with highest transaction amount).
 **/
_defineProperty(UserController, "getTopTraders", async (req, res) => {
  try {
    const {
      type,
      duration
    } = req.query;
    let whereClause = {};
    if (type) {
      if (type.toLowerCase() === "cryptocurrency") {
        whereClause.trnx_type = {
          [_sequelize.Op.or]: [{
            [_sequelize.Op.eq]: "Coin Purchase"
          }, {
            [_sequelize.Op.eq]: "Coin Sale"
          }]
        };
      } else if (type === "gift_card") {
        whereClause.trnx_type = "Gift Card Sale";
      }
    }
    if (duration) {
      const now = new Date();
      switch (duration.toLowerCase()) {
        case "day":
          whereClause.createdAt = {
            [_sequelize.Op.gte]: new Date(now.setDate(now.getDate() - 1))
          };
          break;
        case "week":
          whereClause.createdAt = {
            [_sequelize.Op.gte]: new Date(now.setDate(now.getDate() - 7))
          };
          break;
        case "month":
          whereClause.createdAt = {
            [_sequelize.Op.gte]: new Date(now.setMonth(now.getMonth() - 1))
          };
          break;
      }
    }
    const topTraders = await Transactions.findAll({
      where: whereClause,
      attributes: [[_sequelize.Sequelize.fn("SUM", _sequelize.Sequelize.col("trnx_amount")), "total_amount"], [_sequelize.Sequelize.fn("COUNT", _sequelize.Sequelize.col("user_id")), "transaction_count"]],
      order: [[_sequelize.Sequelize.fn("SUM", _sequelize.Sequelize.col("trnx_amount")), "DESC"]],
      include: {
        model: Users,
        as: "user",
        attributes: ["id", "full_name", "username", "country"]
      },
      group: ["user.id"],
      limit: 10
    });
    if (!topTraders.length) {
      const response = new _response.default(false, 404, "No top traders found.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, 'Top traders retrieved successfully.', {
      topTraders
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function updateUser, (To update a user).
 **/
_defineProperty(UserController, "updateUser", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const requestBody = req.body;

    //  Validate the Request Body.
    const {
      error,
      value
    } = _auth_validator.default.updateUserSchema.validate(requestBody);
    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }
    const updatedUser = await Users.update({
      ...value
    }, {
      where: {
        id
      }
    });
    if (updatedUser[0] === 0) {
      const response = new _response.default(false, 400, "Failed to update user.");
      return res.status(response.code).json(response);
    }

    //  Get the updated user back.
    const user = await Users.findOne({
      where: {
        id
      },
      attributes: {
        exclude: ["password"]
      }
    });
    const {
      name,
      email,
      phone,
      role
    } = user;

    //  Create a token.
    const token = _jsonwebtoken.default.sign({
      id,
      name,
      email,
      phone,
      role
    }, `${process.env.JWT_SECRET_KEY}`);
    const response = new _response.default(true, 200, "Profile updated successfully.", {
      user,
      token
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
* @function updateUserPassword, (To update a user password).
**/
_defineProperty(UserController, "updateUserPassword", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const requestBody = req.body;

    //  Validate the Request Body.
    const {
      error,
      value
    } = _auth_validator.default.updateUserPasswordSchema.validate(requestBody);
    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }
    if (value.old_password) {
      //hash old password
      const oldPassHash = crypto.createHash('md5').update(value.old_password).digest('hex');
      const user = await Users.findOne({
        where: {
          id
        }
      });
      if (!user) {
        const response = new _response.default(false, 404, "User not found.");
        return res.status(response.code).json(response);
      }

      // Check if the old password matches
      if (user.password !== oldPassHash) {
        const response = new _response.default(false, 400, "Old password is incorrect.");
        return res.status(response.code).json(response);
      }

      // Hash the new password
      const newPassHash = crypto.createHash('md5').update(value.new_password).digest('hex');
      // Update the password in the database
      user.password = newPassHash;
      await user.save();
    }
    const response = new _response.default(true, 200, "Password updated successfully.");
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
* @function deleteUser, (To delete a user).
**/
_defineProperty(UserController, "deleteUser", async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const user = await Users.findOne({
      where: {
        id
      }
    });
    if (!user) {
      const response = new _response.default(false, 404, "User not found.");
      return res.status(response.code).json(response);
    }
    await user.destroy();
    const response = new _response.default(true, 200, "Your account has been deleted!");
    return res.status(response.code).json(response);
  } catch (error) {
    console.error('Error deleting user:', error);
    const response = new _response.default(false, 500, "An error occurred while deleting the user.");
    return res.status(response.code).json(response);
  }
});
var _default = exports.default = UserController;
//# sourceMappingURL=user_controller.js.map