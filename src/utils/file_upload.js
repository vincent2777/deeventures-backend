"use strict";

import multer from "multer";
import path from "path";
import fs from "fs";
import Response from "./response";

// Define storage location and filename format
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads/crypto_proofs");
    },
    filename: (req, file, callback) => {
        const { trnx_reference } = req.params || new Date().getTime();
        const extName = path.extname(file.originalname).toLowerCase();
        const newFileName = `crypto_payment_${trnx_reference}${extName}`;

        // Check if file with the same "trnx_reference" already exists
        const directoryPath = "./public/uploads/crypto_proofs";
        fs.readdir(directoryPath, (error, files) => {
            if (error) {
                return callback(error, null)
            }

            // Loop through files and delete any that contain the "trnx_reference"
            files.forEach((existingFile) => {
                if (existingFile.includes(trnx_reference)) {
                    fs.unlink(path.join(directoryPath, existingFile), (error) => {
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
    const extName = path.extname(file.originalname).toLowerCase();

    if (extName === ".jpg" || extName === ".jpeg" || extName === ".png") {
        return callback(null, true);
    }
    return callback({ message: 'ExtensionError; Only JPEG, JPG, and PNG files are allowed.' }, false);
};


const transactionProofUpload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 },
}).single("transactionProof");

const uploadTransactionProof = (req, res, next) => {
    transactionProofUpload(req, res, (error) => {
        if(error) {
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

export default uploadTransactionProof;