const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

const getMilliseconds = days => days * DAY_IN_MILLISECONDS;

const createDateArray = date => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return [year, month, day];
};

const getTodayArray = () => {
  const date = new Date();
  return createDateArray(date);
};

// Default value for <daysBefore> is 18 because we need data for 18 days to calculate infection trends in municipalities
const getDateBefore = (daysBefore = 18) => {
  const todayArr = getTodayArray();
  const date = new Date(Date.UTC(...todayArr) - getMilliseconds(daysBefore));
  return date;
};

export default getDateBefore;
