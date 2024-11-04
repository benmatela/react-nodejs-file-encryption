/**
 * Displays normal logs.
 * @param namespace 
 * @param message 
 * @param object 
 */
const info = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
    } else {
        console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
    }
};

/**
 * Displays warning logs.
 * @param namespace 
 * @param message 
 * @param object 
 */
const warn = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);
    } else {
        console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
    }
};

/**
 * Displays error logs.
 * @param namespace 
 * @param message 
 * @param object 
 */
const error = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object);
    } else {
        console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
    }
};

/**
 * Displays debug logs.
 * @param namespace 
 * @param message 
 * @param object 
 */
const debug = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object);
    } else {
        console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
    }
};

const getTimeStamp = (): string => {
    return new Date().toISOString();
};

export default {
    info,
    error,
    debug,
    warn
};