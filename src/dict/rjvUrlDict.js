const BASE_API_URL = 'https://api.sledilnik.org';
export default {
  STATS: { url: `${BASE_API_URL}/api/stats`, params: { from: -2, to: 0 } },
  PATIENTS: {
    url: `${BASE_API_URL}/api/patients`,
    params: { from: -2, to: 0 },
  },
  MUN: {
    url: `${BASE_API_URL}/api/municipalities`,
    params: { from: -3, to: 0 },
  },
  HOSPITALS_LIST: { url: `${BASE_API_URL}/api/hospitals-list`, params: {} },
  LAB_TESTS: {
    url: `${BASE_API_URL}/api/lab-tests`,
    params: { from: -3, to: 0 },
  },
  SUMMARY: { url: `${BASE_API_URL}/api/summary`, params: { toDate: 0 } },
};
