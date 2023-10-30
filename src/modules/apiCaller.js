// Functions for making API calls.
const axios = require('axios');
const { logger, detailedLogging } = require('../../utils/logger');
const config = require('../../utils/config');

const simulateApiCall = async (caseNumber) => {
  if (detailedLogging) logger.info(`Starting API call for ${caseNumber}`);
  try {
    const caseNumberFormatted = caseNumber.replace(/-/g, '');
    const response = await axios.get(`http://demo-api.doxpop.com/case/${caseNumberFormatted}/charges.json`, {
      auth: {
        username: config.API_USERNAME,
        password: config.API_PASSWORD
      }
    });
    if (detailedLogging) logger.info(`Successfully completed API call for ${caseNumber}`);
    return response.data;
  } catch (error) {
    logger.error(`API Error for ${caseNumber}: ${error.message}`);
    throw error;
  }
};

module.exports = { simulateApiCall };