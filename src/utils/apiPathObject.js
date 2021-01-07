import getSledilnikApiPath from '../helpers/getSledilnikApiPath';
import { addDays } from 'date-fns';

const dateFrom = addDays(new Date(), -18).toISOString();

const pathsParamsObject = {
  stats: { from: dateFrom },
  patients: { from: dateFrom },
  municipalities: { from: dateFrom },
  hospitals_list: {},
  lab_tests: { from: dateFrom },
  summary: {},
};

const pathsArray = Object.entries(pathsParamsObject);

const apiPathObject = (paths = []) => {
  return paths.reduce((acc, curVal) => {
    const key = `${curVal[0]}Path`;
    const path = curVal[0].replace('_', '-');
    const params = curVal[1];
    acc[key] = getSledilnikApiPath(path, params);
    return acc;
  }, {});
};

export default apiPathObject(pathsArray);
