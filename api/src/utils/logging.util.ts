import { cyan, yellowBright, red, blueBright, green, blue } from 'chalk';

/**
 * Displays normal logs.
 * @param namespace 
 * @param message 
 * @param object 
 */
const info = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.info(cyan(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object));
    } else {
        console.info(cyan(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`));
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
        console.warn(yellowBright(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object));
    } else {
        console.warn(yellowBright(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`));
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
        console.error(red(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object));
    } else {
        console.error(red(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`));
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
        console.debug(blue(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object));
    } else {
        console.debug(blue(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`));
    }
};

const getTimeStamp = (): string => {
    return new Date().toISOString();
};

export default {
    info,
    warn,
    error,
    debug
};