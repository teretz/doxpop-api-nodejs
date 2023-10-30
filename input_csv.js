const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { logger } = require('./utils/logger');  // Correctly importing the custom logger

const inputExcelPath = './input.xlsx';
const outputExcelPath = './output.xlsx';
const outputCSVPath = './output.csv';

async function fetchCaseData(caseNumber) {
  try {
    logger.info(`Fetching data for caseNumber: ${caseNumber}`);
    const response = await axios.get(`http://api.doxpop.com/case/${caseNumber}/charges.json`);
    return response.data;
  } catch (error) {
    logger.error(`Error fetching data for caseNumber: ${caseNumber}`, error);
  }
}

async function processInputFile() {
  const workbook = xlsx.readFile(inputExcelPath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const records = xlsx.utils.sheet_to_json(worksheet);
  logger.info(`Found ${records.length} records in the input file.`);

  const outputRecords = [];

  for (const record of records) {
    logger.info(`Processing record: ${JSON.stringify(record)}`);
    const caseData = await fetchCaseData(record.CaseNumber);
    const outputRecord = {
      LastName: record.LastName,
      FirstName: record.FirstName,
      CaseNumber: record.CaseNumber,
      Address: record.Address,
      City: record.City,
      Offense1: caseData ? caseData.offense1 : 'N/A'
    };
    outputRecords.push(outputRecord);
  }

  const newWorkbook = xlsx.utils.book_new();
  const newWorksheet = xlsx.utils.json_to_sheet(outputRecords);
  xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');
  xlsx.writeFile(newWorkbook, outputExcelPath);
  logger.info(`Written ${outputRecords.length} records to Excel.`);

  const csvOutput = xlsx.utils.sheet_to_csv(newWorksheet);
  fs.writeFileSync(outputCSVPath, csvOutput);
  logger.info(`Written ${outputRecords.length} records to CSV.`);
}

processInputFile();