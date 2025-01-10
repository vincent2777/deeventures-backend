"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _response = _interopRequireDefault(require("./response"));
var _models = _interopRequireDefault(require("../database/models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  Users
} = _models.default;
class TokenValidation {}
//  User Token Validation.
_defineProperty(TokenValidation, "userTokenValidation", async (req, res, next) => {
  try {
    //  Get the token from the "Header, Query or Body" if available.
    const bearerToken = req.headers.authorization || req.headers['x-access-token'] || req.query.token || req.body.token;
    if (!bearerToken) {
      const response = new _response.default(false, 401, "Unauthorized, you did not provide any token.");
      return res.status(response.code).json(response);
    }

    // Split the access token and remove the Bearer and pick only the jwt token
    const token = bearerToken.split(" ")[1];

    //  Get the Users "id".
    const {
      id
    } = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET_KEY);

    //  Make sure that the respective User exists in the DB.
    const user = await Users.findOne({
      where: {
        id
      }
    });
    if (!user) {
      const response = new _response.default(false, 401, "Unauthorized, this user does not exist.");
      return res.status(response.code).json(response);
    }

    //  Now append the decoded token to the request body.
    req.requestPayload = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET_KEY);
    return next();
  } catch (error) {
    const response = new _response.default(false, 401, "Unauthorized, you have an invalid token.");
    return res.status(response.code).json(response);
  }
});
var _default = exports.default = TokenValidation;
//# sourceMappingURL=token_validation.js.map