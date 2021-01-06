const BASE_API_URL = 'https://api.sledilnik.org/api';

const getURLPath = baseURL => (path, params = {}) => {
  let apiPath = `${baseURL}/${path}`;
  if (Object.keys(params).length === 0) {
    return apiPath;
  }

  apiPath += '?';

  const apiPathWithParams = Object.entries(params)
    .map(([key, value]) => {
      return `${key}=${value}`;
    })
    .reduce((acc, curVal) => {
      return `${acc}${curVal}&`;
    }, apiPath);

  return apiPathWithParams.slice(0, -1);
};

const getSledilnikApiPath = getURLPath(BASE_API_URL);

export default getSledilnikApiPath;
