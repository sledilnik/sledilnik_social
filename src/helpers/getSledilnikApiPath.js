const BASE_API_URL = 'https://api.sledilnik.org/api';

const getURLPath = baseURL => (path, params = {}) => {
  let apiPath = `${baseURL}/${path}`;
  const url = new URL(apiPath);
  if (Object.keys(params).length === 0) {
    return url;
  }

  const pathParams = Object.entries(params);
  for (const keyValuePair of pathParams) {
    url.searchParams.append(...keyValuePair);
  }

  return url;
};

const getSledilnikApiPath = getURLPath(BASE_API_URL);

export default getSledilnikApiPath;
