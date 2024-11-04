import { IEncryptFileResponse } from "../models/encryption.model";
import { AESBlockSize } from "../models/enums/encryption.enum";
import loggingUtil from "../utils/logging.util"
import * as fs from 'fs';
import * as zlib from 'zlib';

const NAMESPACE = 'ENCRYPTION SERVICE';

/**
 * Encrypts a file using a chosen AES block size
 * 
 * More info: https://www.moserware.com/2009/09/stick-figure-guide-to-advanced.html
 * 
 * @param {string} fileToEncryptPath 
 * @param {AESBlockSize} aesBlockSize 
 */
export const encrypt = async (fileToEncryptPath: string, aesBlockSize: AESBlockSize): Promise<IEncryptFileResponse> => {
    try {
        const encryptFileResponse: IEncryptFileResponse = {
            aesBlockSize: aesBlockSize,
            fileToEncryptPath: fileToEncryptPath,
            encryptedFilePath: "/newfile.txt",
            encryptionDurationInMinutes: 0,
            fileToEncryptSize: 0,
            encryptedFileSize: 0,
        }

        /**
         * Streams are a powerful tool that allows us to write programs which deal with 
         * small amounts of data in an asynchronous manner.
         */
        const readStream = fs.createReadStream(`${__dirname}${fileToEncryptPath}`);

        /**
         * Read a chunk of data, pass that chunk to the gzip stream to be compressed, then write 
         * that compressed chunk to a new file. 
         * 
         * Do that until there are no more chunks to read from the original file.
         */
        const writeStream = fs.createWriteStream(`${__dirname}${encryptFileResponse.encryptedFilePath}`);
        const gzipStream = zlib.createGzip();
        readStream.pipe(gzipStream).pipe(writeStream);

        return encryptFileResponse;
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