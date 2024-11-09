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
 * Response for a decrypted file
 */
export interface IDecryptFileResponse {
    /**
     * AES Encryption block size
     */
    aesBlockSize: AESBlockSize;
    /**
     * Path to the encrypted file
     */
    fileToDecryptPath: string;
    /**
     * Total time spent decrypting this file
     */
    decryptionDurationInMinutes: number;
    /**
     * Total size of the file decrypted
     */
    decryptedFileSize: number;
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
    /**
     * Password used to encrypt this file
     */
    encryptionPassword: string;
    /**
     * Selected file to upload
     */
    fileToUpload?: File
}

/**
 * Request body for a file to decrypt
 */
export interface IDecryptFileRequest {
    /**
     * AES Encryption block size
     */
    aesBlockSize: AESBlockSize;
    /**
     * Path to the file to be decrypted
     */
    fileToDecryptPath: string;
    /**
     * Password used to encrypt this file
     */
    encryptionPassword: string;
}