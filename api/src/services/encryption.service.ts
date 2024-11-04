import { IDecryptFileRequest, IDecryptFileResponse, IEncryptFileRequest, IEncryptFileResponse } from "../models/encryption.model";
import { EncryptionAlgorithm } from "../models/enums/encryption.enum";
import loggingUtil from "../utils/logging.util"
import * as fs from 'fs';
import * as zlib from 'zlib';
import * as crypto from 'crypto';

const NAMESPACE = 'ENCRYPTION SERVICE';

/**
 * Encrypts a file using a chosen AES block size
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
        const encryptionKey = getCipherKey(encryptFileRequest.encryptionPassword);
        /**
         * The most important aspect of an `initialization vector` is that it is never reused. 
         * 
         * We can ensure this will be the case by generating a `random initialization vector` for each file we encrypt.
         * 
         * So long as the initialization vector is generated using a cryptographically secure random (or pseudo-random) number generator, getting 
         * the same initialization vector is extremely unlikely.
         */
        const initVect = crypto.randomBytes(16);

        /**
         * Streams are a powerful tool that allows us to write programs which deal with 
         * small amounts of data in an asynchronous manner.
         */
        const readStream = fs.createReadStream(`${__dirname}${encryptFileRequest.fileToEncryptPath}`);

        /**
         * Read a chunk of data, pass that chunk to the gzip stream to be compressed, then write 
         * that compressed chunk to a new file. 
         * 
         * Do that until there are no more chunks to read from the original file.
         */
        const writeStream = fs.createWriteStream(`${__dirname}${encryptFileResponse.encryptedFilePath}`);
        const gzipStream = zlib.createGzip();
        readStream
            .pipe(gzipStream)
            .pipe(writeStream);

        return encryptFileResponse;
    } catch (error: any) {
        loggingUtil.error(NAMESPACE, error.message);
        throw new Error(error.message);
    }
}

/**
 * Easily get a cipher key for any password.
 * 
 * It is `one-way`, meaning it’s very difficult, given a hash, to reverse it and 
 * figure out what went in.
 * 
 * It produces a fixed output length. For `sha256`, it will always produce a `32` byte 
 * buffer, which just happens to be the size we needed for our `AES-256` cipher.
 * 
 * It’s deterministic. That is, the hash function will `always` produce the same hash for 
 * the same plaintext.
 * 
 * @param {string} password
 *  
 * @returns {Buffer} buffer
 */
export const getCipherKey = (password: string) => {
    try {
        return crypto
            .createHash(EncryptionAlgorithm.SHA_256)
            .update(password)
            .digest();
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
    try {
        return {} as IDecryptFileResponse;
    } catch (error: any) {
        loggingUtil.error(NAMESPACE, error.message);
        throw new Error(error.message);
    }
}