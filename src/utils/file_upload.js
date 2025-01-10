"use strict";

import multer from "multer";
import path from "path";
import fs from "fs";
import Response from "./response";

// Utility function to create multer storage configuration
const createStorage = (destinationDir, filePrefix) => {
    return multer.diskStorage({
        destination: (req, file, callback) => callback(null, destinationDir),

        filename: (req, file, callback) => {
            const { id, trnx_reference } = req.params;
            const identifier = (filePrefix === "profile_image") ? id : trnx_reference;
            const extName = path.extname(file.originalname).toLowerCase();
            const newFileName = `${filePrefix}_${identifier || Date.now()}${extName}`;

            // Check if file with the same "trnx_reference" already exists
            fs.readdir(destinationDir, (error, files) => {
                if (error) return callback(error);

                const pattern = new RegExp(`${filePrefix}_${identifier}`);
                const existingFile = files.find(file => pattern.test(file));

                if (existingFile) {
                    const filePath = path.join(destinationDir, existingFile);
                    fs.unlink(filePath, err => {
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
    const extName = path.extname(file.originalname).toLowerCase();
    if (extName === ".jpg" || extName === ".jpeg" || extName === ".png") return callback(null, true);
    return callback({ message: 'ExtensionError; Only JPEG, JPG, and PNG files are allowed.' }, false);
};

// Create storage configurations
const profileImageStorage = createStorage("./public/uploads/profile_image", "profile_image");
const transactionProofStorage = createStorage("./public/uploads/crypto_proofs", "crypto_payment");
const cardProofStorage = createStorage("./public/uploads/giftcard_proofs", "giftcard_proofs");

// Create multer upload instances
const profileImageUpload = multer({
    storage: profileImageStorage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 },
}).single("profileImage");

const transactionProofUpload = multer({
    storage: transactionProofStorage,
    fileFilter,
    limits: { fileSize: 100 * 1024 * 1024 }, // 15MB
}).array("transactionProof");

const cardProofUpload = multer({
    storage: cardProofStorage,
    fileFilter,
    limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
}).array("trnx_image", 10); 

// Middleware functions
const uploadProfileImage = (req, res, next) => {
    profileImageUpload(req, res, (error) => {
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

const uploadTransactionProof = (req, res, next) => {
    transactionProofUpload(req, res, (error) => {
        if (error) {
            console.error("Multer Error:", error.message || error);
            const response = new Response(
                false,
                410,
                (error.message) ? `Error: ${error.message}` : error
            );
            return res.status(response.code).json(response);
        }
        console.log("Files successfully uploaded:", req.files);
        return next();
    });
};

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

export { uploadProfileImage, uploadTransactionProof, uploadCardProof };
