// The main script that ties everything together.
const excelReader = require('./modules/excelReader');
const apiCaller = require('./modules/apiCaller');
const csvWriter = require('./modules/csvWriter');
const excelWriter = require('./modules/excelWriter');
const { logger, detailedLogging } = require('../utils/logger');

// Main function
const main = async () => {
  if (detailedLogging) logger.info('Starting main function');
  try {
    const records = await excelReader.readExcel();
    const processedRecords = [];
    for (const record of records) {
      const caseNumber = record[1];
      const apiData = await apiCaller.simulateApiCall(caseNumber);
      const processedRecord = {
        // Processed Record Details
      };
      processedRecords.push(processedRecord);
    }
    await csvWriter.writeCsv(processedRecords);
    await excelWriter.writeExcel(processedRecords);
    logger.info(`Successfully processed ${processedRecords.length} records.`);
    if (detailedLogging) logger.info('Successfully completed main function');
  } catch (error) {
    logger.error(`Main function error: ${error.message}`);
  }
};

// Execute Main Function
main();