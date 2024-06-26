"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = _interopRequireDefault(require("../database/models"));
var _response = _interopRequireDefault(require("../utils/response"));
var _billPayment_validator = _interopRequireDefault(require("../utils/validators/billPayment_validator"));
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  Wallets,
  Transactions,
  CableTVs,
  CableTVPackages
} = _models.default;

/**
 * @class BillPaymentController
 **/
class BillPaymentController {}
/**
 * @function getDataBundles (Get Data Bundles).
 **/
_defineProperty(BillPaymentController, "getDataBundles", async (req, res) => {
  try {
    const {
      dataBundleURL
    } = req.body;
    // console.log("REQUEST BODY::: ", dataBundleURL);

    const dataBundleResponse = await _axios.default.get(dataBundleURL);
    const dataBundles = dataBundleResponse.data["MOBILE_NETWORK"];
    const internetServiceProviders = Object.entries(dataBundles).flatMap(([name, details]) => {
      return details.map(detail => ({
        NAME: name,
        ID: detail.ID,
        PRODUCT: detail.PRODUCT
      }));
    });
    const response = new _response.default(true, 200, "Cable TV retrieved successfully", {
      internetServiceProviders
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function getCableTV (Get Table TV).
 **/
_defineProperty(BillPaymentController, "getCableTV", async (req, res) => {
  try {
    const {
      cableTvURL
    } = req.body;
    // console.log("REQUEST BODY::: ", cableTvURL);

    const cableTVResponse = await _axios.default.get(cableTvURL);
    const cableTVs = cableTVResponse.data["TV_ID"];
    const channels = Object.values(cableTVs).flat();
    const response = new _response.default(true, 200, "Cable TV retrieved successfully", {
      channels
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function getElectricCompanies (Get Electric Companies).
 **/
_defineProperty(BillPaymentController, "getElectricCompanies", async (req, res) => {
  try {
    const {
      electricCompaniesURL
    } = req.body;
    // console.log("REQUEST BODY::: ", electricCompaniesURL);

    const electricCompaniesResponse = await _axios.default.get(electricCompaniesURL);
    const electricCompaniesData = electricCompaniesResponse.data["ELECTRIC_COMPANY"];
    const companiesData = Object.values(electricCompaniesData).flat();
    let electricCompanies = [];

    // Extract Electric companies
    Object.keys(companiesData).forEach(electricCompanyKey => {
      electricCompanies.push({
        "code": companiesData[electricCompanyKey]["ID"],
        "name": companiesData[electricCompanyKey]["NAME"]
      });
    });
    const response = new _response.default(true, 200, "Cable TV retrieved successfully", {
      electricCompanies
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function buyAirtime (Buy airtime).
 **/
_defineProperty(BillPaymentController, "buyAirtime", async (req, res) => {
  try {
    const {
      id
    } = req.requestPayload;
    const requestBody = req.body;
    const clubConnectAPIKey = process.env.CLUBCONNECT_API_KEY;
    const clubConnectUserID = process.env.CLUBCONNECT_USER_ID;
    const callBackURL = encodeURIComponent("http://localhost:5000/api/v1/bill_payment/buy_airtime");
    // console.log("REQUEST PAYLOAD::: ", requestBody);

    //  Validate the Request Body.
    const {
      error,
      value
    } = _billPayment_validator.default.buyAirtimeSchema.validate({
      ...requestBody
    });
    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }
    const {
      mobileNetwork,
      mobileNumber,
      airtimeAmount
    } = value;

    // Check user's wallet balance.
    const wallet = await Wallets.findOne({
      where: {
        user_id: id
      }
    });
    if (!wallet) {
      const response = new _response.default(false, 404, "Wallet not found.");
      return res.status(response.code).json(response);
    }
    if (wallet.amount < airtimeAmount) {
      const response = new _response.default(false, 300, "Insufficient wallet balance. Kindly top-up your wallet by selling crypto or gift card.");
      return res.status(response.code).json(response);
    }

    // Initiate and make payment for airtime.
    const initiatePaymentResponse = await _axios.default.post(`https://www.nellobytesystems.com/APIAirtimeV1.asp?UserID=${clubConnectUserID}&APIKey=${clubConnectAPIKey}&MobileNetwork=${mobileNetwork}&Amount=${airtimeAmount}&MobileNumber=${mobileNumber}`);
    if (initiatePaymentResponse.data.status !== "ORDER_RECEIVED") {
      const response = new _response.default(false, 409, "Failed to make payment. Please try again later.");
      return res.status(response.code).json(response);
    }

    // Confirm payment
    /*const confirmedPaymentResponse = await axios.post(`https://www.nellobytesystems.com/APIQueryV1.asp?UserID=${clubConnectUserID}&APIKey=${clubConnectAPIKey}&OrderID=${initiatePaymentResponse.data.orderid}`);
    if (confirmedPaymentResponse.data.status !== "ORDER_RECEIVED" || confirmedPaymentResponse.data.status !== "ORDER_COMPLETED") {
        const response = new Response(
            false,
            409,
            "Failed to make payment. Please try again later."
        );
        return res.status(response.code).json(response);
    }*/

    // Deduct airtime amount from user's wallet
    const prevWalletAmount = wallet.amount;
    await Wallets.update({
      amount: prevWalletAmount - airtimeAmount
    }, {
      where: {
        user_id: id
      }
    });

    // Insert transaction information into Transactions table
    const transaction = {
      user_id: id,
      trnx_amount: airtimeAmount,
      trnx_type: "Bill Payment",
      trnx_desc: `${mobileNumber} was topped with ${airtimeAmount} credit unit.`,
      trnx_status: 1,
      trnx_rate: airtimeAmount,
      trnx_address: mobileNumber,
      trnx_image: "",
      to_receive: airtimeAmount,
      currency: "NGN"
    };
    await Transactions.create({
      ...transaction
    });
    const response = new _response.default(true, 200, `You have successfully topped up ${airtimeAmount} credit unit to ${mobileNumber}.`, {
      transaction
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function buyDataBundle (Buy data bundle).
 **/
_defineProperty(BillPaymentController, "buyDataBundle", async (req, res) => {
  try {
    const {
      id
    } = req.requestPayload;
    const requestBody = req.body;
    const clubConnectAPIKey = process.env.CLUBCONNECT_API_KEY;
    const clubConnectUserID = process.env.CLUBCONNECT_USER_ID;
    const callBackURL = encodeURIComponent("http://localhost:5000/api/v1/bill_payment/buy_data_bundle");

    //  Validate the Request Body.
    const {
      error,
      value
    } = _billPayment_validator.default.buyDataBundleSchema.validate(requestBody);
    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }
    const {
      mobileNetwork,
      dataPlan,
      mobileNumber,
      dataBundleAmount
    } = value;

    // Check user's wallet balance.
    const wallet = await Wallets.findOne({
      where: {
        user_id: id
      }
    });
    if (!wallet) {
      const response = new _response.default(false, 404, "Wallet not found.");
      return res.status(response.code).json(response);
    }
    if (wallet.amount < dataBundleAmount) {
      const response = new _response.default(false, 300, "Insufficient wallet balance. Kindly top-up your wallet by selling crypto or gift card.");
      return res.status(response.code).json(response);
    }

    // Initiate and make payment for data.
    const initiatePaymentResponse = await _axios.default.post(`https://www.nellobytesystems.com/APIDatabundleV1.asp?UserID=${clubConnectUserID}&APIKey=${clubConnectAPIKey}&MobileNetwork=${mobileNetwork}&DataPlan=${dataPlan}&MobileNumber=${mobileNumber}`);
    if (initiatePaymentResponse.data.status !== "ORDER_RECEIVED") {
      const response = new _response.default(false, 409, "Failed to make payment. Please try again later.");
      return res.status(response.code).json(response);
    }

    // Confirm payment
    /*const confirmedPaymentResponse = await axios.post(`https://www.nellobytesystems.com/APIQueryV1.asp?UserID=${clubConnectUserID}&APIKey=${clubConnectAPIKey}&OrderID=${initiatePaymentResponse.data.orderid}`);
    if (confirmedPaymentResponse.data.status !== "ORDER_COMPLETED") {
        const response = new Response(
            false,
            409,
            "Failed to make payment. Please try again later."
        );
        return res.status(response.code).json(response);
    }*/

    // Deduct airtime amount from user's wallet
    const prevWalletAmount = wallet.amount;
    await Wallets.update({
      amount: prevWalletAmount - dataBundleAmount
    }, {
      where: {
        user_id: id
      }
    });

    // Insert transaction information into Transactions table
    const transaction = {
      user_id: id,
      trnx_amount: dataBundleAmount,
      trnx_type: "Bill Payment",
      trnx_desc: `${mobileNumber} was topped with ${initiatePaymentResponse.data.productname} data unit.`,
      trnx_status: 1,
      trnx_rate: dataBundleAmount,
      trnx_address: mobileNumber,
      trnx_image: "",
      to_receive: initiatePaymentResponse.data.productname.split(" ")[0],
      currency: "NGN"
    };
    await Transactions.create({
      ...transaction
    });
    const response = new _response.default(true, 200, `Your mobile number have successfully been topped with ${initiatePaymentResponse.data.productname} data unit.`, {
      transaction
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function buyCableTV (Buy cable-tv subscription).
 **/
_defineProperty(BillPaymentController, "buyCableTV", async (req, res) => {
  try {
    const {
      id
    } = req.requestPayload;
    const requestBody = req.body;
    const clubConnectAPIKey = process.env.CLUBCONNECT_API_KEY;
    const clubConnectUserID = process.env.CLUBCONNECT_USER_ID;
    const callBackURL = encodeURIComponent("http://localhost:5000/api/v1/bill_payment/buy_cable_tv");
    // console.log("CABLE TV::: ", cableTV, packageCode);

    //  Validate the Request Body.
    const {
      error,
      value
    } = _billPayment_validator.default.buyCableTVSchema.validate(requestBody);
    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }
    const {
      cableTV,
      packageCode,
      smartCardNo,
      mobileNumber,
      amount
    } = value;

    // Check user's wallet balance.
    const wallet = await Wallets.findOne({
      where: {
        user_id: id
      }
    });
    if (!wallet) {
      const response = new _response.default(false, 404, "Wallet not found.");
      return res.status(response.code).json(response);
    }
    if (wallet.amount < amount) {
      const response = new _response.default(false, 300, "Insufficient wallet balance. Kindly top-up your wallet by selling crypto or gift card.");
      return res.status(response.code).json(response);
    }

    // Initiate and make payment for data.
    const initiatePaymentResponse = await _axios.default.post(`https://www.nellobytesystems.com/APICableTVV1.asp?UserID=${clubConnectUserID}&APIKey=${clubConnectAPIKey}&CableTV=${cableTV}&Package=${packageCode}&SmartCardNo=${smartCardNo}&PhoneNo=${mobileNumber}&CallBackURL=${callBackURL}`);
    if (initiatePaymentResponse.data.status !== "ORDER_RECEIVED") {
      const response = new _response.default(false, 409, "Failed to initiate payment.");
      return res.status(response.code).json(response);
    }

    // Confirm payment
    const confirmedPaymentResponse = await _axios.default.post(`https://www.nellobytesystems.com/APICableTVV1.asp?UserID=${clubConnectUserID}&APIKey=${clubConnectAPIKey}&OrderID=${initiatePaymentResponse.data.orderid}`);
    if (confirmedPaymentResponse.data.status !== "ORDER_COMPLETED") {
      const response = new _response.default(false, 409, "Failed to make payment. Please try again later.");
      return res.status(response.code).json(response);
    }

    // Deduct cable tv amount from user's wallet
    const prevWalletAmount = wallet.amount;
    await Wallets.update({
      amount: prevWalletAmount - amount
    }, {
      where: {
        user_id: id
      }
    });

    // Insert transaction information into Transactions table
    const transaction = {
      user_id: id,
      trnx_amount: amount,
      trnx_type: "Bill Payment",
      trnx_desc: `Monthly subscription for ${packageCode} on ${smartCardNo}.`,
      trnx_status: 1,
      trnx_rate: amount,
      trnx_address: smartCardNo,
      trnx_image: "",
      to_receive: packageCode,
      currency: "NGN"
    };
    await Transactions.create({
      ...transaction
    });
    const response = new _response.default(true, 200, `Your subscription for ${packageCode} on ${smartCardNo} was successful.`, {
      transaction
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
/**
 * @function buyElectricity (Buy electricity subscription).
 **/
_defineProperty(BillPaymentController, "buyElectricity", async (req, res) => {
  try {
    const {
      id
    } = req.requestPayload;
    const requestBody = req.body;
    const clubConnectAPIKey = process.env.CLUBCONNECT_API_KEY;
    const clubConnectUserID = process.env.CLUBCONNECT_USER_ID;
    const callBackURL = encodeURIComponent("http://localhost:5000/api/v1/bill_payment/buy_cable_tv");
    console.log("REQUEST BODY::: ", requestBody);

    //  Validate the Request Body.
    const {
      error,
      value
    } = _billPayment_validator.default.buyElectricitySchema.validate(requestBody);
    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }
    const {
      electricCompanyCode,
      meterType,
      meterNumber,
      amount,
      mobileNumber
    } = value;

    // Check user's wallet balance.
    const wallet = await Wallets.findOne({
      where: {
        user_id: id
      }
    });
    if (!wallet) {
      const response = new _response.default(false, 404, "Wallet not found.");
      return res.status(response.code).json(response);
    }
    if (wallet.amount < amount) {
      const response = new _response.default(false, 300, "Insufficient wallet balance. Kindly top-up your wallet by selling crypto or gift card.");
      return res.status(response.code).json(response);
    }

    // Initiate and make payment for data.
    const initiatePaymentResponse = await _axios.default.post(`https://www.nellobytesystems.com/APIElectricityV1.asp?UserID=${clubConnectUserID}&APIKey=${clubConnectAPIKey}&ElectricCompany=${electricCompanyCode}&MeterType=${meterType}&MeterNo=${meterNumber}&Amount=${amount}&PhoneNo=${mobileNumber}&CallBackURL=${callBackURL}`);
    if (initiatePaymentResponse.data.status !== "ORDER_RECEIVED") {
      const response = new _response.default(false, 409, "Failed to initiate payment.");
      return res.status(response.code).json(response);
    }

    // Confirm payment
    const confirmedPaymentResponse = await _axios.default.post(`https://www.nellobytesystems.com/APIElectricityV1.asp?UserID=${clubConnectUserID}&APIKey=${clubConnectAPIKey}&OrderID=${initiatePaymentResponse.data.orderid}`);
    if (confirmedPaymentResponse.data.status !== "ORDER_COMPLETED") {
      const response = new _response.default(false, 409, "Failed to make payment. Please try again later.");
      return res.status(response.code).json(response);
    }

    // Deduct airtime amount from user's wallet
    const prevWalletAmount = wallet.amount;
    await Wallets.update({
      amount: prevWalletAmount - amount
    }, {
      where: {
        user_id: id
      }
    });

    // Insert transaction information into Transactions table
    const transaction = {
      user_id: id,
      trnx_amount: amount,
      trnx_type: "Bill Payment",
      trnx_desc: `Electricity purchase of ${amount} on ${meterNumber}.`,
      trnx_status: 1,
      trnx_rate: amount,
      trnx_address: meterNumber,
      trnx_image: "",
      to_receive: amount,
      currency: "NGN"
    };
    await Transactions.create({
      ...transaction
    });
    const response = new _response.default(true, 200, `Your electricity purchase of ${amount} on ${meterNumber} was successful.`, {
      transaction
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});
var _default = exports.default = BillPaymentController;
//# sourceMappingURL=billPayment_controller.js.map