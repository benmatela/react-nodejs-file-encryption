import * as crypto from 'crypto';
import { EncryptionAlgorithm } from '../models/enums/encryption.enum';
import loggingUtil from './logging.util';

const NAMESPACE = 'ENCRYPTION UTIL';

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