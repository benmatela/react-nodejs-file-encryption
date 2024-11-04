import * as crypto from 'crypto';
import { EncryptionAlgorithm } from '../models/enums/encryption.enum';
import loggingUtil from './logging.util';
import { Transform, TransformOptions, Writable, WritableOptions } from "stream";
import { EventEmitterAsyncResourceOptions } from 'events';

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
export const getCipherKey = (password: string): Buffer => {
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
 * Modifies stream data(file chunks)
 * 
 * There are four stream types within Node.js:
 * 
 * `Readable` — streams from which data can be read (for example `fs.createReadStream()`).
 * 
 * `Writable` — streams to which data can be written (for example `fs.createWriteStream()`).
 * 
 * `Duplex` — streams that are both Readable and Writable (for example `net.Socket`).
 * 
 * `Transform` — Duplex streams that can modify or transform the data as it is written and read (for example `zlib.createDeflate()`).
 * 
 * @param {Buffer[]} allChunks 
 * @param {Buffer} chunk 
 * @param {string} encoding 
 */
export const transformStreamFileChunks = (allChunks: Buffer[], chunk: Buffer, encoding: string, initVect: Buffer) => {
    try {
        if (!allChunks.includes(chunk)) {

        }
    } catch (error: any) {
        loggingUtil.error(NAMESPACE, error.message);
        throw new Error(error.message);
    }
}

/**
 * Since we will be modifying the stream data(chunks), we will need to 
 * use a Transform stream.
 */
export class AppendInitVect extends Transform {
    initVector: Buffer;
    appended: boolean;

    constructor(initVector: Buffer, opts?: TransformOptions) {
        super(opts);
        this.initVector = initVector;
        this.appended = false;
    }

    _transform(chunk: Buffer, encoding: BufferEncoding, callback: () => void) {
        console.log("initVector: ", this.initVector);
        console.log("chunk: ", chunk);
        callback();
    }
}

