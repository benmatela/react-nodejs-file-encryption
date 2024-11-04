import { AESBlockSize } from "./enums/encryption.enum";

/**
 * Response for an encrypted file
 */
export interface IEncryptedFileResponse {
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