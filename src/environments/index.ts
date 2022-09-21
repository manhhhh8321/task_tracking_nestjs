import * as dotenv from 'dotenv';
dotenv.config();

// const NEED_TO_CONFIGURED = 'NEED TO CONFIGURED';

// environment
const NODE_ENV: string = process.env.NODE_ENV || 'dev';

// application
const SERVER_PORT: number = +process.env.SERVER_PORT || 3000;

// database
const DB_HOST: string = process.env.DB_HOST || 'localhost';
const DB_PORT: number = +process.env.DB_PORT || 27017;
const DB_NAME: string = process.env.DB_NAME || 'task-tracker';

export { NODE_ENV, SERVER_PORT, DB_HOST, DB_PORT, DB_NAME };
