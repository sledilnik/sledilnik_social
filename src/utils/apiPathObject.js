import { addDays } from 'date-fns';

const dateFrom = addDays(new Date(), -18).toISOString();

const BASE_API_URL = 'https://api.sledilnik.org';
const baseURL = new URL(BASE_API_URL);

const pathsParamsObject = {
  stats: { from: dateFrom },
  patients: { from: dateFrom },
  municipalities: { from: dateFrom },
  hospitals_list: {},
  lab_tests: { from: dateFrom },
  summary: {},
};

const pathsArray = Object.entries(pathsParamsObject);

const replaceUnderscoreWithDash = val => val.replace('_', '-');

const apiPathObject = (paths = []) => {
  return paths.reduce((acc, [_path, params]) => {
    const key = `${_path}Path`;
    const path = `api/${replaceUnderscoreWithDash(_path)}`;

    const url = new URL(path, baseURL);

    const pathParams = Object.entries(params);
    for (const keyValuePair of pathParams) {
      url.searchParams.append(...keyValuePair);
    }

    acc[key] = url;
    return acc;
  }, {});
};

export default apiPathObject(pathsArray);
