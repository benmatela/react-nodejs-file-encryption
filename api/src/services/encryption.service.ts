import {
    IDecryptFileRequest,
    IDecryptFileResponse,
    IEncryptFileRequest,
    IEncryptFileResponse
} from "../models/encryption.model";
import loggingUtil from "../utils/logging.util"
import * as fs from 'fs';
import * as zlib from 'zlib';
import * as crypto from 'crypto';
import { AppendInitVector, getCipherKey } from "../utils/encryption.util";
import { EncryptionAlgorithm } from "../models/enums/encryption.enum";

const NAMESPACE = 'ENCRYPTION SERVICE';

/**
 * Encrypts a file using a chosen AES block size.
 * 
 * `AES` is a `symmetric-key` algorithm. This means that we need to know about all the input into our cipher in order to decrypt the ciphertext. 
 * 
 * The `user` keeps track of their `password`, and we’re using a deterministic hash function to generate our key.
 * 
 * More info: https://www.moserware.com/2009/09/stick-figure-guide-to-advanced.html
 * 
 * @param {IEncryptFileRequest} encryptFileRequest 
 * 
 * @returns {Buffer} buffer
 * 
 * @throws {Error} error
 */
export const encrypt = async (encryptFileRequest: IEncryptFileRequest): Promise<IEncryptFileResponse> => {
    try {
        const encryptFileResponse: IEncryptFileResponse = {
            aesBlockSize: encryptFileRequest.aesBlockSize,
            fileToEncryptPath: encryptFileRequest.fileToEncryptPath,
            encryptedFilePath: "/newfile.txt",
            encryptionDurationInMinutes: 0,
            fileToEncryptSize: 0,
            encryptedFileSize: 0,
        }
        /**
        * Generate a secure, pseudo random initialization vector.
        * 
        * The most important aspect of an `initialization vector` is that it is never reused. 
        * 
        * We can ensure this will be the case by generating a `random initialization vector` for each file we encrypt.
        * 
        * So long as the initialization vector is generated using a cryptographically secure 
        * random (or pseudo-random) number generator, getting the same initialization vector is extremely unlikely.
        */
        const initVect = crypto.randomBytes(16);
        /**
         * Generate a cipher key from the password.
         * 
         * This key will be used to encrypt a file
         */
        const cipherKey = getCipherKey(encryptFileRequest.encryptionPassword);
        /**
         * Streams are a powerful tool that allows us to write programs which deal with 
         * small amounts of data in an asynchronous manner.
         */
        const readStream = fs.createReadStream(`${__dirname}${encryptFileRequest.fileToEncryptPath}`);
        const gzipStream = zlib.createGzip();
        const cipher = crypto.createCipheriv(EncryptionAlgorithm.AES256, cipherKey, initVect);
        const appendInitVector = new AppendInitVector(initVect);
        // Create a write stream with a different file extension.
        const writeStream = fs.createWriteStream(`${__dirname}${encryptFileResponse.encryptedFilePath}.enc`);
        /**
         * Read data chunk, pass that chunk to the gzip stream to be compressed, then write 
         * that compressed chunk to a new file. 
         * 
         * Do that until there are no more chunks to read from the original file.
         */
        readStream
            .pipe(gzipStream)
            .pipe(cipher)
            .pipe(appendInitVector)
            .pipe(writeStream);

        return encryptFileResponse;
    } catch (error: any) {
        loggingUtil.error(NAMESPACE, error.message);
        throw new Error(error.message);
    }
}

/**
 * Decrypts a file
 * 
 * @param {IDecryptFileResponse} decryptFileRequest 
 * 
 * @returns {IDecryptFileResponse} decryptFileResponse
 * 
 * @throws {Error} error
 */
export const decrypt = async (decryptFileRequest: IDecryptFileRequest): Promise<IDecryptFileResponse> => {
    const decryptFileResponse: IDecryptFileResponse = {
        aesBlockSize: decryptFileRequest.aesBlockSize,
        fileToDecryptPath: decryptFileRequest.fileToDecryptPath,
        decryptionDurationInMinutes: 0,
        decryptedFileSize: 0,
    }
    try {
        /**
         * Get the initialization vector from the file.
         * 
         * `createReadStream` takes two arguments: `path` and `options`. 
         * 
         * Using the `options` argument, we can tell the stream where to `start` and `end`. 
         * 
         * So, rather than using one stream, we can use `two` streams: one for the `initVect` and the other for the `cipher text`.
         */
        const readInitVect = fs.createReadStream(decryptFileRequest.fileToDecryptPath, { end: 15 });
        let initVect: Buffer;
        readInitVect.on('data', (chunk) => {
            initVect = chunk as Buffer;
        });

        // Once we’ve got the initialization vector, we can decrypt the file.
        readInitVect.on('close', () => {
            const cipherKey = getCipherKey(decryptFileRequest.encryptionPassword);
            /**
             * Since we know that the initialization vector for `AES-256` is `16` bytes, we can tell the 
             * stream to only read the first `16` bytes. 
             * 
             * Once we’ve captured the initialization vector, and the read stream has closed, we can start 
             * decrypting the cipher text.
             */
            const readStream = fs.createReadStream(decryptFileRequest.fileToDecryptPath, { start: 16 });
            /**
             * Similar to how we encrypted the file using `createCipheriv`, we’re going to use a new method: `createDecipheriv`. 
             * 
             * It takes the same arguments as `createCipheriv`
             */
            const decipher = crypto.createDecipheriv(EncryptionAlgorithm.AES256, cipherKey, initVect);
            /**
             * Next step is decompressing the file. 
             * 
             * In the same way that we created a gzip stream using the createGzip method, we’ll be 
             * using its inverse: `createUnzip`.
             */
            const unzip = zlib.createUnzip();
            /**
             * Create a new writeStream so we can write our `decrypted`, `decompressed` file.
             */
            const writeStream = fs.createWriteStream(decryptFileRequest.fileToDecryptPath + '.unenc');

            readStream
                .pipe(decipher)
                .pipe(unzip)
                .pipe(writeStream);
        });

        return decryptFileResponse;
    } catch (error: any) {
        loggingUtil.error(NAMESPACE, error.message);
        throw new Error(error.message);
    }
}