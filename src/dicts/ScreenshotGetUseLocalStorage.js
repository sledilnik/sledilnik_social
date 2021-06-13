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
    'casesActive100k',
  ],
  CHART: [
    'MetricsComparison_casesConfirmed7DaysAvgFourMonths',
    'DailyComparison_casesConfirmed',
    'DailyComparison_casesActive',
    'DailyComparison_performedPCR',
    'DailyComparison_sharePCR',
    'DailyComparison_testsHAT',
    'DailyComparison_vaccinesUsed',
    'AgeGroupsTimeline_newCasesFourMonths',
    'AgeGroupsTimeline_newCasesRelativeFourMonths',
    'Schools_activeAbsolutePupilsFourMonths',
    'Patients',
    'IcuPatients',
    'Regions100k_casesConfirmed7DayAvg',
    'Regions100k_vaccinated7DayAvg',
    'Municipalities',
    'Map_absolute1Day',
    'Map_distribution1Day',
    'Map_weeklyGrowth',
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
