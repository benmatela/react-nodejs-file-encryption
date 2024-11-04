import dotenv from 'dotenv';

// Initialize .env
dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME as string || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT as any || 3000;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
};

const configs = {
    server: SERVER
};

export default configs;