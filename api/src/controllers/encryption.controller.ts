import { Response, Request, NextFunction } from 'express';
import loggingUtil from '../utils/logging.util';

const NAMESPACE = 'ENCRYPTION CONTROLLER';

const encrypt = async (req: Request, res: Response, next: NextFunction) => {
    loggingUtil.info(NAMESPACE, 'encrypt() called.');
    try {

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