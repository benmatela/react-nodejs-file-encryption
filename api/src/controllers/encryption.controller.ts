import { Response, Request, NextFunction } from 'express';
import * as encryptionService from '../services/encryption.service';
import loggingUtil from '../utils/logging.util';
import {
    IEncryptFileResponse,
    IEncryptFileRequest,
    IDecryptFileResponse,
    IDecryptFileRequest
} from '../models/encryption.model';
import { IHttpResponseWrapper } from '../models/http-response-wrapper.model';
import { HTTP_STATUS_CODE } from '../models/enums/http-status-code.enum';

const NAMESPACE = 'ENCRYPTION CONTROLLER';

/**
 * Encrypts a file using AES
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const encrypt = async (req: Request, res: Response) => {
    loggingUtil.info(NAMESPACE, 'encrypt() called.');
    const httpResponseWrapper: IHttpResponseWrapper<IEncryptFileResponse> = {
        data: {} as IEncryptFileResponse,
        currentPage: 0,
        status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        success: false,
        message: "",
        totalPages: 0,
        totalRecords: 0,
        errors: []
    }
    try {
        // Add model validation eg validator.ts
        const encryptFileRequest: IEncryptFileRequest = {
            aesBlockSize: parseInt(req.body.aesBlockSize),
            fileToEncryptPath: String(req.body.fileToEncryptPath),
            encryptionPassword: String(req.body.encryptionPassword)
        }

        const encryptFileResponse: IEncryptFileResponse = await encryptionService
            .encrypt(encryptFileRequest);

        // Build our response
        httpResponseWrapper.data = encryptFileResponse;
        httpResponseWrapper.success = true;
        httpResponseWrapper.status = HTTP_STATUS_CODE.OK;

        res.status(httpResponseWrapper.status).send(httpResponseWrapper);
    } catch (error: any) {
        loggingUtil.error(NAMESPACE, error.message);

        // Build our response
        httpResponseWrapper.message = "File encryption failed."
        httpResponseWrapper.errors.push(error.message);

        res.status(httpResponseWrapper.status).send(httpResponseWrapper);
    }
};

/**
 * Decrypts a file using AES
 * 
 * To decrypt a file, we need to do everything we did to encrypt it but in reverse.
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const decrypt = async (req: Request, res: Response) => {
    loggingUtil.info(NAMESPACE, 'decrypt() called.');
    const httpResponseWrapper: IHttpResponseWrapper<IDecryptFileResponse> = {
        data: {} as IDecryptFileResponse,
        currentPage: 0,
        status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        success: false,
        message: "",
        totalPages: 0,
        totalRecords: 0,
        errors: []
    }
    try {
        // Add model validation eg validator.ts
        const decryptFileRequest: IDecryptFileRequest = {
            aesBlockSize: parseInt(req.body.aesBlockSize),
            fileToDecryptPath: String(req.body.fileToDecryptPath),
            encryptionPassword: String(req.body.encryptionPassword)
        }

        const decryptFileResponse: IDecryptFileResponse = await encryptionService
            .decrypt(decryptFileRequest);

        // Build our response
        httpResponseWrapper.data = decryptFileResponse;
        httpResponseWrapper.success = true;
        httpResponseWrapper.status = HTTP_STATUS_CODE.OK;

        res.status(httpResponseWrapper.status).send(httpResponseWrapper);
    } catch (error: any) {
        loggingUtil.error(NAMESPACE, error.message);

        // Build our response
        httpResponseWrapper.message = "File decryption failed."
        httpResponseWrapper.errors.push(error.message);

        res.status(httpResponseWrapper.status).send(httpResponseWrapper);
    }
};

export default { encrypt, decrypt };