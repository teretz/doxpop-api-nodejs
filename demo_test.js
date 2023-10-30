require('dotenv').config();

const axios = require('axios');

// Production API credentials from .env file
const username = process.env.DOXPOP_USERNAME;
const password = process.env.DOXPOP_PASSWORD;

// Base URL for the production API
const baseURL = 'https://api.doxpop.com';

// Function to test actors_cases endpoint
async function testActorsCases() {
  try {
    const response = await axios.get(`${baseURL}/actors_cases.json?fullname=rifkind,+david`, {
      auth: {
        username,
        password
      }
    });
    console.log('Actors Cases Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

testActorsCases();