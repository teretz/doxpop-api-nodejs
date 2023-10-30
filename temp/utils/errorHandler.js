const fs = require('fs');
const Logger = require('../logger');
const logger = new Logger();

function logError(error) {
  // Log: Writing to error.log
  logger.info('Writing to error.log');
  try {
    fs.appendFileSync('error.log', `${new Date().toISOString()} - ${error}\n`);
    // Log: Successfully wrote to error.log
    logger.info('Successfully wrote to error.log');
  } catch (e) {
    // Log: Could not write to error.log
    logger.error('Could not write to error.log:', e);
  }
}

function handleError(err) {
  // Log: Handling error
  logger.info('Handling error');
  console.error(err);
  logError(err);
  if (err.code === 'ERR_UNESCAPED_CHARACTERS') {
    // Log: Additional Info
    logger.info('Additional Info: This error usually occurs when a URL contains characters that should be percent-encoded.');
  }
}

module.exports = { handleError };