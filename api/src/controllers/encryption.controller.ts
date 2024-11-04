import { Response, Request, NextFunction } from 'express';
import * as encryptionService from '../services/encryption.service';
import loggingUtil from '../utils/logging.util';
import { IEncryptedFileResponse } from '../models/encryption.model';
import { IHttpResponseWrapper } from '../models/http-response-wrapper.model';
import { HTTP_STATUS_CODE } from '../models/enums/http-status-code.enum';

const NAMESPACE = 'ENCRYPTION CONTROLLER';

/**
 * Encrypts a file
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const encrypt = async (req: Request, res: Response, next: NextFunction) => {
    loggingUtil.info(NAMESPACE, 'encrypt() called.');
    const httpResponseWrapper: IHttpResponseWrapper<IEncryptedFileResponse> = {
        data: {} as IEncryptedFileResponse,
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
        
        const encryptedFileResponse: IEncryptedFileResponse = await encryptionService
            .encrypt(String(req.body.fileToEncryptPath), parseInt(req.body.aesBlockSize));

        // Build our response
        httpResponseWrapper.data = encryptedFileResponse;
        httpResponseWrapper.success = true;
        httpResponseWrapper.status = HTTP_STATUS_CODE.OK;

        res.status(httpResponseWrapper.status).send(httpResponseWrapper);
    } catch (error: any) {
        loggingUtil.error(NAMESPACE, error.message);
    }
};

const decrypt = async (req: Request, res: Response, next: NextFunction) => {
    loggingUtil.info(NAMESPACE, 'decrypt() called.');
    try {

    } catch (error: any) {
        loggingUtil.error(NAMESPACE, error.message);
    }
};

export default { encrypt, decrypt };