const dotenv = require('dotenv');
dotenv.config();

// Amo CRM
const AMOCRM_REFRESH_TOKEN = process.env.NODE_AMOCRM_REFRESH_TOKEN;
const AMOCRM_API_URL = process.env.NODE_AMOCRM_API_URL;
const AMOCRM_CLIENT_ID = process.env.NODE_AMOCRM_CLIENT_ID;
const AMOCRM_CLIENT_SECRET = process.env.NODE_AMOCRM_CLIENT_SECRET;
const AMOCRM_REDIRECT_URI = process.env.NODE_AMOCRM_REDIRECT_URI;
const STORAGE_TOKEN = 'server/storage/tokens.json';

// Send pulse
const API_USER_ID = process.env.NODE_SENDPULSE_API_USER_ID;
const API_KEY = process.env.NODE_SENDPULSE_API_KEY;
const TOKEN_STORAGE = '/tmp/';

module.exports = {
  AMOCRM_REFRESH_TOKEN,
  AMOCRM_API_URL,
  AMOCRM_CLIENT_ID,
  AMOCRM_CLIENT_SECRET,
  AMOCRM_REDIRECT_URI,
  STORAGE_TOKEN,
  API_USER_ID,
  API_KEY,
  TOKEN_STORAGE
};