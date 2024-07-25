"use strict";

import multer from "multer";
import path from "path";
import fs from "fs";
import Response from "./response";

// Utility function to create multer storage configuration
const createStorage = (destinationDir, filePrefix) => {
    return multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, destinationDir);
        },
        filename: (req, file, callback) => {
            const trnx_reference = req.params.trnx_reference || new Date().getTime().toString();
            const extName = path.extname(file.originalname).toLowerCase();
            const newFileName = `${filePrefix}_${trnx_reference}${extName}`;

            // Check if file with the same "trnx_reference" already exists
            fs.readdir(destinationDir, (error, files) => {
                if (error) {
                    return callback(error, null);
                }

                // Loop through files and delete any that contain the "trnx_reference"
                files.forEach((existingFile) => {
                    if (existingFile.includes(trnx_reference)) {
                        fs.unlink(path.join(destinationDir, existingFile), (error) => {
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
    const extName = path.extname(file.originalname).toLowerCase();
    if (extName === ".jpg" || extName === ".jpeg" || extName === ".png") {
        return callback(null, true);
    }
    return callback({ message: 'ExtensionError; Only JPEG, JPG, and PNG files are allowed.' }, false);
};

// Create storage configurations
const transactionProofStorage = createStorage("./public/uploads/crypto_proofs", "crypto_payment");
const cardProofStorage = createStorage("./public/uploads/giftcard_proofs", "giftcard_proofs");

// Create multer upload instances
const transactionProofUpload = multer({
    storage: transactionProofStorage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 },
}).single("transactionProof");

const cardProofUpload = multer({
    storage: cardProofStorage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 },
}).array("trnx_image", 10); 

// Middleware functions
const uploadTransactionProof = (req, res, next) => {
    transactionProofUpload(req, res, (error) => {
        if (error) {
            const response = new Response(
                false,
                410,
                (error.message) ? `Error: ${error.message}` : error
            );
            return res.status(response.code).json(response);
        }
        return next();
    });
}

const uploadCardProof = (req, res, next) => {
    cardProofUpload(req, res, (error) => {
        if (error) {
            const response = new Response(
                false,
                410,
                (error.message) ? `Error: ${error.message}` : error
            );
            return res.status(response.code).json(response);
        }
        return next();
    });
}

export { uploadTransactionProof, uploadCardProof };
