// Functions for writing to Excel files.
const ExcelJS = require('exceljs');
const { logger, detailedLogging } = require('../../utils/logger');

const writeExcel = async (records) => {
  if (detailedLogging) logger.info('Starting to write to Excel');
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('My Sheet');
    worksheet.columns = require('../excelColumns');
    for (const record of records) {
      worksheet.addRow(record);
    }
    await workbook.xlsx.writeFile('output.xlsx');
    if (detailedLogging) logger.info('Successfully completed writing to Excel');
  } catch (error) {
    logger.error(`Error writing to Excel: ${error.message}`);
    throw error;
  }
};

module.exports = { writeExcel };