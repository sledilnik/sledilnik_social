import useLocalStorage from '../hooks/useLocalStorage';

const createScreenshotUseLocalStorage = name =>
  useLocalStorage.bind(null, null, name);

export const ScreenshotNames = {
  CARD: [
    'testsToday',
    'testsTodayHAT',
    'casesActive',
    'hospitalizedCurrent',
    'icuCurrent',
    'deceasedToDate',
    'casesAvg7Days',
    'vaccinationSummary',
  ],
  CHART: [
    'Patients',
    'IcuPatients',
    'Municipalities',
    'Map_weeklyGrowth',
    'Map_absolute1Day',
    'Map_distribution1Day',
  ],
  MULTICARD: ['LAB', 'HOS', 'ALL'],
};

const screenshotTypes = Object.values(ScreenshotNames);

const createGetScreenshotUseLocalStorage = () => {
  const obj = screenshotTypes.reduce((acc, item) => {
    for (let name of item) {
      acc[name] = createScreenshotUseLocalStorage(name);
    }
    return acc;
  }, {});
  return obj;
};

const ScreenshotGetUseLocalStorage = createGetScreenshotUseLocalStorage();
export default ScreenshotGetUseLocalStorage;
