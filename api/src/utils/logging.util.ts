import chalk from 'chalk';

/**
 * Displays normal logs.
 * @param namespace 
 * @param message 
 * @param object 
 */
const info = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.info(chalk.cyan(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object));
    } else {
        console.info(chalk.cyan(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`));
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
        console.warn(chalk.yellowBright(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object));
    } else {
        console.warn(chalk.yellowBright(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`));
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
        console.error(chalk.red(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object));
    } else {
        console.error(chalk.red(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`));
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
        console.debug(chalk.blue(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object));
    } else {
        console.debug(chalk.blue(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`));
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