import { AESBlockSize } from "../models/enums/encryption.enum";
import loggingUtil from "../utils/logging.util"
import * as fs from 'fs';

const NAMESPACE = 'ENCRYPTION SERVICE';

/**
 * Encrypts a file using a chosen AES block size
 * 
 * @param {string} fileToEncryptPath 
 * @param {AESBlockSize} aesBlockSize 
 */
export const encrypt = (fileToEncryptPath: string, aesBlockSize: AESBlockSize) => {
    try {
        /**
         * Streams are a powerful tool that allows us to write programs which deal with 
         * small amounts of data in an asynchronous manner.
         */
        const readStream = fs.createReadStream('./file.txt');

        readStream.on('data', (chunk) => {
            console.log(chunk.toString('utf8'));
        });
    } catch (error: any) {
        loggingUtil.error(NAMESPACE, error.message);
        throw new Error(error.message);
    }
}

export const decrypt = () => {
    try {

    } catch (error: any) {
        loggingUtil.error(NAMESPACE, error.message);
        throw new Error(error.message);
    }
}