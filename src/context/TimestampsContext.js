import React, { createContext, useEffect } from 'react';
import ScreenshotGetUseLocalStorage from '../dicts/ScreenshotGetUseLocalStorage';
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

  const [localTs, setLocalTs] = useLocalStorage(stats.data, 'statsTimestamp');

  const screenshotsUseLocalStorageHooks = Object.entries(
    ScreenshotGetUseLocalStorage
  ).reduce((acc, [key, binddedUseLocalStorage]) => {
    acc[key] = binddedUseLocalStorage();
    return acc;
  }, {});

  const ts = stats.data;

  useEffect(() => {
    if (localTs < ts) {
      setLocalTs(ts);
    }

    if (localTs === null || localTs < ts) {
      for (let item of Object.entries(screenshotsUseLocalStorageHooks)) {
        item[1][1](null);
      }
    }
  }, [localTs, ts, setLocalTs, screenshotsUseLocalStorageHooks]);

  return (
    <TimestampsContext.Provider
      value={{ patients, stats, labTests, cases, munActive }}
    >
      {children}
    </TimestampsContext.Provider>
  );
};
