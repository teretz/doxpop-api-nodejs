// Functions for reading Excel files.
const path = require('path');
const ExcelJS = require('exceljs');
const { logger, detailedLogging } = require('../../utils/logger');

const readExcel = async () => {
  const records = [];
  if (detailedLogging) logger.info('Starting to read Excel');
  try {
    const workbook = new ExcelJS.Workbook();
    const filePath = path.resolve(__dirname, '../../input.xlsx');
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {
        records.push(row.values);
      }
    });
    if (detailedLogging) logger.info('Successfully completed reading Excel');
    return records;
  } catch (error) {
    logger.error(`Error reading Excel: ${error.message}`);
    throw error;
  }
};

module.exports = { readExcel };