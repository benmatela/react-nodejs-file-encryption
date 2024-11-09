/**
 * AES variants/block sizes
 * 
 * The bigger the block size the slower and stronger the encryption will be.
 */
export enum AESBlockSize {
    AES_128 = 128,
    AES_192 = 192,
    AES_256 = 256
}

/**
 * Encryption algorithms
 */
export enum EncryptionAlgorithm {
    SHA_256 = "sha256",
    AES_256 = "aes256"
}