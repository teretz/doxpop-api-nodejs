// Functions for writing to CSV files.
const csvWriter = require('../../csvWriterModule');
const { logger, detailedLogging } = require('../../utils/logger');

const writeCsv = async (records) => {
  if (detailedLogging) logger.info('Starting to write to CSV');
  try {
    csvWriter.writeRecords(records);
    if (detailedLogging) logger.info('Successfully completed writing to CSV');
  } catch (error) {
    logger.error(`Error writing to CSV: ${error.message}`);
    throw error;
  }
};

module.exports = { writeCsv };