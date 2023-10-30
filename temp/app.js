process.env.NODE_ENV = 'development';

require('dotenv').config();

const Logger = require('./logger');

const sourceDir = process.env.SOURCE_DIR;
const targetDir = process.env.TARGET_DIR;

const logger = new Logger();

// Log initialization
logger.info('Application initialized.');

// Log: Starting application logic
logger.info('Starting application logic');

// Add your application logic here

// Log: Application logic completed
logger.info('Application logic completed.');