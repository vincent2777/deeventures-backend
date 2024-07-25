"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadTransactionProof = exports.uploadCardProof = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _response = _interopRequireDefault(require("./response"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Utility function to create multer storage configuration
const createStorage = (destinationDir, filePrefix) => {
  return _multer.default.diskStorage({
    destination: (req, file, callback) => {
      callback(null, destinationDir);
    },
    filename: (req, file, callback) => {
      const trnx_reference = req.params.trnx_reference || new Date().getTime().toString();
      const extName = _path.default.extname(file.originalname).toLowerCase();
      const newFileName = `${filePrefix}_${trnx_reference}${extName}`;

      // Check if file with the same "trnx_reference" already exists
      _fs.default.readdir(destinationDir, (error, files) => {
        if (error) {
          return callback(error, null);
        }

        // Loop through files and delete any that contain the "trnx_reference"
        files.forEach(existingFile => {
          if (existingFile.includes(trnx_reference)) {
            _fs.default.unlink(_path.default.join(destinationDir, existingFile), error => {
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
};

// File type validation
const fileFilter = (req, file, callback) => {
  const extName = _path.default.extname(file.originalname).toLowerCase();
  if (extName === ".jpg" || extName === ".jpeg" || extName === ".png") {
    return callback(null, true);
  }
  return callback({
    message: 'ExtensionError; Only JPEG, JPG, and PNG files are allowed.'
  }, false);
};

// Create storage configurations
const transactionProofStorage = createStorage("./public/uploads/crypto_proofs", "crypto_payment");
const cardProofStorage = createStorage("./public/uploads/giftcard_proofs", "giftcard_proofs");

// Create multer upload instances
const transactionProofUpload = (0, _multer.default)({
  storage: transactionProofStorage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024
  }
}).single("transactionProof");
const cardProofUpload = (0, _multer.default)({
  storage: cardProofStorage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024
  }
}).array("trnx_image", 10);

// Middleware functions
const uploadTransactionProof = (req, res, next) => {
  transactionProofUpload(req, res, error => {
    if (error) {
      const response = new _response.default(false, 410, error.message ? `Error: ${error.message}` : error);
      return res.status(response.code).json(response);
    }
    return next();
  });
};
exports.uploadTransactionProof = uploadTransactionProof;
const uploadCardProof = (req, res, next) => {
  cardProofUpload(req, res, error => {
    if (error) {
      const response = new _response.default(false, 410, error.message ? `Error: ${error.message}` : error);
      return res.status(response.code).json(response);
    }
    return next();
  });
};
exports.uploadCardProof = uploadCardProof;
//# sourceMappingURL=file_upload.js.map