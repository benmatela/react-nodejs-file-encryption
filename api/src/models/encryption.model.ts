import { AESBlockSize } from "./enums/encryption.enum";

/**
 * Response for an encrypted file
 */
export interface IEncryptFileResponse {
    /**
     * AES Encryption block size
     */
    aesBlockSize: AESBlockSize;
    /**
     * Path to the file to be encrypted
     */
    fileToEncryptPath: string;
    /**
     * Path to the encrypted file
     */
    encryptedFilePath: string;
    /**
     * Total time spent encrypting this file
     */
    encryptionDurationInMinutes: number;
    /**
     * Total size of the file to be encrypted
     */
    fileToEncryptSize: number;
    /**
     * Total size of the encrypted file
     */
    encryptedFileSize: number;
}

/**
 * Request body for a file to encrypt
 */
export interface IEncryptFileRequest {
    /**
     * AES Encryption block size
     */
    aesBlockSize: AESBlockSize;
    /**
     * Path to the file to be encrypted
     */
    fileToEncryptPath: string;
}