import { addDays } from 'date-fns';
const getISODateFrom = num => addDays(new Date(), num).toISOString();

export const BASE_API_URL = 'https://api.sledilnik.org';
export const BASE_API_STAGE_URL = 'https://api-stage.sledilnik.org';

const BASE_TIMESTAMP_URL =
  'https://raw.githubusercontent.com/sledilnik/data/master/csv';

const getAPI_URL = (base_url = BASE_API_URL) => {
  return {
    SUMMARY: `${base_url}/api/summary`,
    PATIENTS: `${base_url}/api/patients`,
    STATS: `${base_url}/api/stats`,
    HOSPITALS_LIST: `${base_url}/api/hospitals-list`,
    MUN: `${base_url}/api/municipalities`,
    MUN_LIST: `${base_url}/api/municipalities-list`,
  };
};

export const API_URL = getAPI_URL();
export const API_STAGE_URL = getAPI_URL(BASE_API_STAGE_URL);
export const API_PARAMS = {
  PATIENTS: { from: getISODateFrom(-3) },
  STATS: { from: getISODateFrom(-4) },
  MUN: { from: getISODateFrom(-18) },
};
export const TIMESTAMP_URL = {
  LAB_TESTS: `${BASE_TIMESTAMP_URL}/lab-tests.csv.timestamp`,
  CASES: `${BASE_TIMESTAMP_URL}/cases.csv.timestamp`,
  PATIENTS: `${BASE_TIMESTAMP_URL}/patients.csv.timestamp`,
  STATS: `${BASE_TIMESTAMP_URL}/stats.csv.timestamp`,
  MUN: `${BASE_TIMESTAMP_URL}/municipality-confirmed.csv.timestamp`,
};

const URL_Dict = {
  BASE_API_URL,
  API_URL,
  API_PARAMS,
  TIMESTAMP_URL,
};

export default URL_Dict;
