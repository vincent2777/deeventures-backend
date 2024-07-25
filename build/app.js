"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _response = _interopRequireDefault(require("./utils/response"));
var _routes = _interopRequireDefault(require("./routes"));
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();

//  Set Up Express App.
const app = (0, _express.default)();

// Create the directory "./public/images/transaction_proof" if the do not exist.
!_fs.default.existsSync(`./public/uploads/crypto_proofs`) && _fs.default.mkdirSync(`./public/uploads/crypto_proofs`, {
  recursive: true
});

//  Public Folder.
app.use(_express.default.static('./public'));

//  parse JSON-encoded bodies and URL-encoded bodies
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));

// To avoid CORS errors, we need to allow some Header accesses as done below
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//  Create a Default or Root Route.
app.get('/', (req, res) => {
  const response = new _response.default(true, 200, 'Welcome to DeeVentures API V1 Now.');
  res.status(response.code).json(response);
});

//  Create other Routes.
app.use('/api/v1', _routes.default);
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';
const BASE_URL = process.env.BASE_URL || `http://${HOST}:${PORT}`;
app.listen(PORT, () => {
  console.log(`Express server running on port: ${PORT}, Please kindly visit ${BASE_URL}`);
});
//# sourceMappingURL=app.js.map