import React, { createContext, useEffect } from 'react';
import { TIMESTAMP_URL } from '../dicts/URL_Dict';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';

export const TimestampsContext = createContext();

export const TimestampsProvider = ({ children }) => {
  const now = Date.now();
  const params = { nocache: now };
  const patients = useFetch(TIMESTAMP_URL.PATIENTS, params);
  const stats = useFetch(TIMESTAMP_URL.STATS, params);
  const labTests = useFetch(TIMESTAMP_URL.LAB_TESTS, params);
  const cases = useFetch(TIMESTAMP_URL.CASES, params);
  const munActive = useFetch(TIMESTAMP_URL.MUN, params);

  const [value, setValue] = useLocalStorage(stats.data, 'statsTimestamp');
  const testsToday = useLocalStorage(null, 'testsToday');
  const testsTodayHAT = useLocalStorage(null, 'testsTodayHAT');
  const casesActive = useLocalStorage(null, 'casesActive');
  const hospitalizedCurrent = useLocalStorage(null, 'hospitalizedCurrent');
  const icuCurrent = useLocalStorage(null, 'icuCurrent');
  const deceasedToDate = useLocalStorage(null, 'deceasedToDate');
  const casesAvg7Days = useLocalStorage(null, 'casesAvg7Days');
  const vaccinationSummary = useLocalStorage(null, 'vaccinationSummary');
  const Patients = useLocalStorage(null, 'Patients');
  const IcuPatients = useLocalStorage(null, 'IcuPatients');
  const Municipalities = useLocalStorage(null, 'Municipalities');

  const screenshotsStateHooks = [
    testsToday,
    testsTodayHAT,
    casesActive,
    hospitalizedCurrent,
    icuCurrent,
    deceasedToDate,
    casesAvg7Days,
    vaccinationSummary,
    Patients,
    IcuPatients,
    Municipalities,
  ];

  const ts = stats.data;

  useEffect(() => {
    if (value < ts) {
      setValue(ts);
    }

    if (value === null || value < ts) {
      const screenshotsSetState = screenshotsStateHooks.map(item => {
        return item[1];
      });

      for (let setState of screenshotsSetState) {
        setState(null);
      }
    }
  }, [value, ts, setValue, screenshotsStateHooks]);

  return (
    <TimestampsContext.Provider
      value={{ patients, stats, labTests, cases, munActive }}
    >
      {children}
    </TimestampsContext.Provider>
  );
};
