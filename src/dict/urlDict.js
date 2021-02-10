const BASE_API_URL = 'https://api.sledilnik.org';

const BASE_TIMESTAMP_URL =
  'https://raw.githubusercontent.com/sledilnik/data/master/csv';

export const TIMESTAMP_URL = {
  STATS: `${BASE_TIMESTAMP_URL}/stats.csv.timestamp`,
  PATIENTS: `${BASE_TIMESTAMP_URL}/patients.csv.timestamp`,
  MUN: `${BASE_TIMESTAMP_URL}/municipality-active.csv.timestamp`,
  LAB_TESTS: `${BASE_TIMESTAMP_URL}/lab-tests.csv.timestamp`,
  CASES: `${BASE_TIMESTAMP_URL}/cases.csv.timestamp`,
  HOSPITALS: `${BASE_TIMESTAMP_URL}/hospitals.csv.timestamp`,
  ICU: `${BASE_TIMESTAMP_URL}/icu.csv.timestamp`,
  VACCINATION: `${BASE_TIMESTAMP_URL}/vaccination.csv.timestamp`,
};
export default {
  STATS: `${BASE_API_URL}/api/stats`,
  PATIENTS: `${BASE_API_URL}/api/patients`,
  MUN: `${BASE_API_URL}/api/municipalities`,
  HOSPITALS_LIST: `${BASE_API_URL}/api/hospitals-list`,
  LAB_TESTS: `${BASE_API_URL}/api/lab-tests`,
  SUMMARY: `${BASE_API_URL}/api/summary`,
};
