"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _response = _interopRequireDefault(require("../utils/response"));
var _models = _interopRequireDefault(require("../database/models"));
var _wallet_validator = _interopRequireDefault(require("../utils/validators/wallet_validator"));
var _datetime = _interopRequireDefault(require("../utils/datetime"));
var _send_email = _interopRequireDefault(require("../utils/send_email"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  Wallets,
  ReferralWallets,
  Users,
  Transactions,
  Settings
} = _models.default;

/**
 * @class UserController
 **/
class WalletController {}
/**
 *@function createWallet, (To create a new wallet).
 **/
_defineProperty(WalletController, "createWallet", async (req, res) => {
  try {
    const requestBody = req.body;
    // console.log("REQUEST BODY::: ", requestBody);

    //  Validate the Request Body.
    const {
      error,
      value
    } = _wallet_validator.default.createWalletSchema.validate({
      ...requestBody
    });
    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }

    //  Create a Wallet.
    const wallet = await Wallets.create({
      ...value
    });
    if (!wallet) {
      const response = new _response.default(false, 409, "Wallet creation failed.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 201, "Successfully created a new wallet.", {
      wallet
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
_defineProperty(WalletController, "createReferralWallet", async (req, res) => {
  try {
    const requestBody = req.body;
    // console.log("REQUEST BODY::: ", requestBody);

    //  Validate the Request Body.
    const {
      error,
      value
    } = _wallet_validator.default.createWalletSchema.validate({
      ...requestBody
    });
    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }

    //  Create a Wallet.
    const referralWallet = await ReferralWallets.create({
      ...value
    });
    if (!referralWallet) {
      const response = new _response.default(false, 409, "Referral wallet creation failed.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 201, "Successfully created a new referral wallet.", {
      referralWallet
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 *@function getWallets, (Get all wallets).
 **/
_defineProperty(WalletController, "getWallets", async (req, res) => {
  try {
    const wallets = await Wallets.findAll();
    if (!wallets.length) {
      const response = new _response.default(false, 404, "No wallet found.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, 'Wallets retrieved successfully.', {
      wallets
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
_defineProperty(WalletController, "getReferralWallets", async (req, res) => {
  try {
    const referralWallets = await ReferralWallets.findAll();
    if (!referralWallets.length) {
      const response = new _response.default(false, 404, "No referral wallet found.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, 'Referral wallets retrieved successfully.', {
      referralWallets
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 *@function getWallet, (Get single wallet).
 **/
_defineProperty(WalletController, "getWallet", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const wallet = await Wallets.findByPk(id);
    if (!wallet) {
      const response = new _response.default(false, 404, "Wallet not found.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, 'Wallet retrieved successfully.', {
      wallet
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
_defineProperty(WalletController, "getReferralWallet", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const referralWallet = await ReferralWallets.findByPk(id);
    if (!referralWallet) {
      const response = new _response.default(false, 404, "Referral wallet not found.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, 'Referral wallet retrieved successfully.', {
      referralWallet
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 *@function getUserWallet, (Get single wallet).
 **/
_defineProperty(WalletController, "getUserWallet", async (req, res) => {
  try {
    const {
      userID
    } = req.params;
    // console.log("USERS ID::: ", userID);

    const wallet = await Wallets.findOne({
      where: {
        user_id: userID
      }
    });
    if (!wallet) {
      const response = new _response.default(false, 404, "Wallet not found.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, 'Wallet retrieved successfully.', {
      wallet
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
_defineProperty(WalletController, "getUserReferralWallet", async (req, res) => {
  try {
    const {
      userID
    } = req.params;
    // console.log("USERS ID::: ", userID);

    const referralWallet = await ReferralWallets.findOne({
      where: {
        user_id: userID
      }
    });
    if (!referralWallet) {
      const response = new _response.default(false, 404, "Referral wallet not found.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, "Referral wallet retrieved successfully.", {
      referralWallet
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 *@function updateWallet, (Update single wallet).
 **/
_defineProperty(WalletController, "updateWallet", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      amount
    } = req.body;

    //  Get the previous Amount.
    const {
      amount: prevAmount
    } = await Wallets.findOne({
      where: {
        user_id: id
      }
    });
    const updatedWallet = await Wallets.update({
      amount: prevAmount + amount
    }, {
      where: {
        user_id: id
      }
    });
    if (updatedWallet[0] === 0) {
      const response = new _response.default(false, 404, "Failed to update wallet.");
      return res.status(response.code).json(response);
    }
    const newlyUpdatedWallet = await Wallets.findOne({
      where: {
        user_id: id
      }
    });
    const response = new _response.default(true, 200, 'Wallet updated successfully.', {
      wallet: newlyUpdatedWallet
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
_defineProperty(WalletController, "updateReferralWallet", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      amount
    } = req.body;

    //  Get the previous Amount.
    const {
      amount: prevAmount
    } = await ReferralWallets.findOne({
      where: {
        user_id: id
      }
    });
    const updatedWallet = await ReferralWallets.update({
      amount: prevAmount + amount
    }, {
      where: {
        user_id: id
      }
    });
    if (updatedWallet[0] === 0) {
      const response = new _response.default(false, 404, "Failed to update referral wallet.");
      return res.status(response.code).json(response);
    }
    const newlyUpdatedWallet = await ReferralWallets.findOne({
      where: {
        user_id: id
      }
    });
    const response = new _response.default(true, 200, 'Referral wallet updated successfully.', {
      wallet: newlyUpdatedWallet
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 *@function depositMoney, (Deposit money).
 **/
_defineProperty(WalletController, "depositMoney", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      amount
    } = req.body;

    //  Get the previous Amount.
    const wallet = await Wallets.findOne({
      where: {
        user_id: id
      }
    });

    // Insert transaction information into Transactions table
    const transactionPayload = {
      user_id: id,
      trnx_amount: amount,
      trnx_type: "Wallet Funding",
      trnx_desc: `Wallet funding with ${amount} naira.`,
      trnx_status: 0,
      trnx_rate: amount,
      trnx_address: wallet.id,
      trnx_image: "",
      to_receive: amount,
      currency: "NGN"
    };
    const transaction = await Transactions.create({
      ...transactionPayload
    });
    if (!transaction) {
      const response = new _response.default(false, 409, "Failed to create transaction.");
      return res.status(response.code).json(response);
    }

    // Get account settings
    const settings = await Settings.findByPk(1);
    if (!settings) {
      const response = new _response.default(false, 404, "Settings not found.");
      return res.status(response.code).json(response);
    }
    const response = new _response.default(true, 200, "Deposit initiated successfully.", {
      settings,
      transaction
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    return res.status(response.code).json(response);
  }
});
/**
*@function withdrawMoney, (Withdraw money).
**/
_defineProperty(WalletController, "withdrawMoney", async (req, res) => {
  try {
    const {
      amount,
      user_id,
      wchannel,
      account_number,
      account_name,
      bank_name
    } = req.body;
    let wallet;
    //check if user has the amount in their wallet
    if (wchannel === "main_wallet") {
      wallet = await Wallets.findOne({
        where: {
          user_id: user_id
        }
      });
    } else {
      wallet = await ReferralWallets.findOne({
        where: {
          user_id: user_id
        }
      });
    }
    if (wallet && wallet.amount < amount) {
      // Your logic here
      return res.status(409).json(new _response.default(false, 409, "You don't have sufficient funds in your wallet"));
    } else {
      const trnxDesc = `Withdrawal Request from  ${wchannel.replace("_", " ")} Account Number: ${account_number}, Account Name: ${account_name}, Bank: ${bank_name}`;

      //get userEmail
      const user = await Users.findOne({
        where: {
          id: user_id
        }
      });

      // Insert transaction information into Transactions table
      const transactionPayload = {
        user_id: user_id,
        trnx_amount: amount,
        trnx_type: wchannel === 'main_wallet' ? 'Wallet Fund Withdrawal' : 'Bonus Fund Withdrawal',
        trnx_desc: trnxDesc,
        trnx_status: 0,
        trnx_rate: amount,
        trnx_address: account_number,
        trnx_image: "",
        to_receive: amount,
        currency: "NGN"
      };

      //send email
      const subject = "Withdrawal Request";
      const userEmail = user.email;
      const message = `
                <h2>Your withdrawal request was successfull</h2>
                <p><b>Amount:</b> ₦${amount}</p>
                <p><b>Account Number:</b> ${account_number}</p> 
                <p><b>Account Name:</b> ${account_name}</p> 
                <p><b>Bank Name:</b> ${bank_name}</p> 
                <p><b>Description:</b> ${trnxDesc}</p> 
                <p><b>Date:</b> ${(0, _datetime.default)()}</p>`;
      const emailResponse = _send_email.default.handleSendMail(userEmail, message, subject);
      const mailData = await emailResponse;
      const transaction = await Transactions.create({
        ...transactionPayload
      });
      if (!transaction) {
        const response = new _response.default(false, 409, "Failed to create withdrawal transaction.");
        return res.status(response.code).json(response);
      }
      const response = new _response.default(true, 200, "Withdawal request sent.", {
        transaction
      });
      return res.status(response.code).json(response);
    }
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    return res.status(response.code).json(response);
  }
});
var _default = exports.default = WalletController;
//# sourceMappingURL=wallet_controller.js.map