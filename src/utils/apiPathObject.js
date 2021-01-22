import { addDays } from 'date-fns';

const BASE_API_URL = 'https://api.sledilnik.org';
const baseURL = new URL(BASE_API_URL);

// dash "-" is not valid Object key unless declare explicity as string :)
// api path with dash must be later converted
// in case path has underscore, add key <noReplace> with truthy value
// example: path_with_underscore: {params: {...}, noReplace: true}
const pathsParamsObject = {
  stats: { params: { from: addDays(new Date(), -3).toISOString() } },
  patients: {
    params: { from: addDays(new Date(), -2).toISOString() },
  },
  municipalities: {
    params: { from: addDays(new Date(), -17).toISOString() },
  },
  hospitals_list: { params: {} },
  lab_tests: {
    params: { from: addDays(new Date(), -2).toISOString() }, // only for 2 days
  },
  summary: { params: {} },
};

const pathsArray = Object.entries(pathsParamsObject);

const replaceUnderscoreWithDash = val => val.replace('_', '-');

const apiPathObject = (paths = []) => {
  return paths.reduce((acc, [_path, { params, noReplace }]) => {
    const key = `${_path}Path`;
    const path = noReplace
      ? `api/${_path}`
      : `api/${replaceUnderscoreWithDash(_path)}`;

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
