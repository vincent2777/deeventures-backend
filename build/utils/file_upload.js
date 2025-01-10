"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadTransactionProof = exports.uploadProfileImage = exports.uploadCardProof = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _response = _interopRequireDefault(require("./response"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Utility function to create multer storage configuration
const createStorage = (destinationDir, filePrefix) => {
  return _multer.default.diskStorage({
    destination: (req, file, callback) => callback(null, destinationDir),
    filename: (req, file, callback) => {
      const {
        id,
        trnx_reference
      } = req.params;
      const identifier = filePrefix === "profile_image" ? id : trnx_reference;
      const extName = _path.default.extname(file.originalname).toLowerCase();
      const newFileName = `${filePrefix}_${identifier || Date.now()}${extName}`;

      // Check if file with the same "trnx_reference" already exists
      _fs.default.readdir(destinationDir, (error, files) => {
        if (error) return callback(error);
        const pattern = new RegExp(`${filePrefix}_${identifier}`);
        const existingFile = files.find(file => pattern.test(file));
        if (existingFile) {
          const filePath = _path.default.join(destinationDir, existingFile);
          _fs.default.unlink(filePath, err => {
            if (err) console.error(`Error deleting file: ${existingFile}`, err);
          });
        }
        callback(null, newFileName);
      });

      /*fs.readdir(destinationDir, (error, files) => {
          if (error) return callback(error, null);
           // Loop through files and replace any that contain the "identifier"
          const pattern = new RegExp(`${filePrefix}_${identifier}`);
          const existingFile = files.find(file => pattern.test(file));
           if (existingFile) {
              const filePath = path.join(destinationDir, existingFile);
              fs.unlink(filePath, err => {
                  if (err) console.error(`Error deleting file: ${existingFile}`, err);
              });
          }
       });
       // Proceed with saving the new file
      callback(null, newFileName);*/
    }
  });
};

// File type validation
const fileFilter = (req, file, callback) => {
  const extName = _path.default.extname(file.originalname).toLowerCase();
  if (extName === ".jpg" || extName === ".jpeg" || extName === ".png") return callback(null, true);
  return callback({
    message: 'ExtensionError; Only JPEG, JPG, and PNG files are allowed.'
  }, false);
};

// Create storage configurations
const profileImageStorage = createStorage("./public/uploads/profile_image", "profile_image");
const transactionProofStorage = createStorage("./public/uploads/crypto_proofs", "crypto_payment");
const cardProofStorage = createStorage("./public/uploads/giftcard_proofs", "giftcard_proofs");

// Create multer upload instances
const profileImageUpload = (0, _multer.default)({
  storage: profileImageStorage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
}).single("profileImage");
const transactionProofUpload = (0, _multer.default)({
  storage: transactionProofStorage,
  fileFilter,
  limits: {
    fileSize: 15 * 1024 * 1024
  } // 15MB
}).array("transactionProof");
const cardProofUpload = (0, _multer.default)({
  storage: cardProofStorage,
  fileFilter,
  limits: {
    fileSize: 15 * 1024 * 1024
  } // 15MB
}).array("trnx_image", 10);

// Middleware functions
const uploadProfileImage = (req, res, next) => {
  profileImageUpload(req, res, error => {
    if (error) {
      const response = new _response.default(false, 410, error.message ? `Error: ${error.message}` : error);
      return res.status(response.code).json(response);
    }
    return next();
  });
};
exports.uploadProfileImage = uploadProfileImage;
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