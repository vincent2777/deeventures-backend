"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _response = _interopRequireDefault(require("./response"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Define storage location and filename format
const storage = _multer.default.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/uploads/crypto_proofs");
  },
  filename: (req, file, callback) => {
    const {
      trnx_reference
    } = req.params || new Date().getTime();
    const extName = _path.default.extname(file.originalname).toLowerCase();
    const newFileName = `crypto_payment_${trnx_reference}${extName}`;

    // Check if file with the same "trnx_reference" already exists
    const directoryPath = "./public/uploads/crypto_proofs";
    _fs.default.readdir(directoryPath, (error, files) => {
      if (error) {
        return callback(error, null);
      }

      // Loop through files and delete any that contain the "trnx_reference"
      files.forEach(existingFile => {
        if (existingFile.includes(trnx_reference)) {
          _fs.default.unlink(_path.default.join(directoryPath, existingFile), error => {
            if (error) {
              callback(error, null);
            }
          });
        }
      });
    });

    // Proceed with saving the new file
    callback(null, newFileName);
  }
});

// File type validation
const fileFilter = (req, file, callback) => {
  //  Get the File Extension name.
  const extName = _path.default.extname(file.originalname).toLowerCase();
  if (extName === ".jpg" || extName === ".jpeg" || extName === ".png") {
    return callback(null, true);
  }
  return callback({
    message: 'ExtensionError; Only JPEG, JPG, and PNG files are allowed.'
  }, false);
};
const transactionProofUpload = (0, _multer.default)({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024
  }
}).single("transactionProof");
const uploadTransactionProof = (req, res, next) => {
  transactionProofUpload(req, res, error => {
    if (error) {
      const response = new _response.default(false, 410, error.message ? `Error: ${error.message}` : error);
      return res.status(response.code).json(response);
    }
    return next();
  });
};
var _default = exports.default = uploadTransactionProof;
//# sourceMappingURL=file_upload.js.map