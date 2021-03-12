import React, { createContext } from 'react';
import { TIMESTAMP_URL } from '../dicts/URL_Dict';
import useFetch from '../hooks/useFetch';

export const TimestampsContext = createContext();

export const TimestampsProvider = ({ children }) => {
  const now = Date.now();
  const params = { nocache: now };
  const patients = useFetch(TIMESTAMP_URL.PATIENTS, params);
  const stats = useFetch(TIMESTAMP_URL.STATS, params);
  const labTests = useFetch(TIMESTAMP_URL.LAB_TESTS, params);
  const cases = useFetch(TIMESTAMP_URL.CASES, params);
  const munActive = useFetch(TIMESTAMP_URL.MUN, params);

  return (
    <TimestampsContext.Provider
      value={{ patients, stats, labTests, cases, munActive }}
    >
      {children}
    </TimestampsContext.Provider>
  );
};
