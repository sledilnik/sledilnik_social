import { addDays } from 'date-fns';
const getISODateFrom = num => addDays(new Date(), num).toISOString();

export const BASE_API_URL = 'https://api.sledilnik.org';

export const API_URL = {
  SUMMARY: `${BASE_API_URL}/api/summary`,
  PATIENTS: `${BASE_API_URL}/api/patients`,
  STATS: `${BASE_API_URL}/api/stats`,
};

export const API_PARAMS = {
  PATIENTS: { from: getISODateFrom(-2) },
  STATS: { from: getISODateFrom(-4) },
};

export default {
  BASE_API_URL,
  API_URL,
  API_PARAMS,
};
