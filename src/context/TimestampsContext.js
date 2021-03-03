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
  // const municipalities = useFetch(TIMESTAMP_URL.MUN, params);
  // const hospitals = useFetch(TIMESTAMP_URL.HOSPITALS, params);
  // const icu = useFetch(TIMESTAMP_URL.ICU, params);
  // const vaccination = useFetch(TIMESTAMP_URL.ICU, params);

  return (
    <TimestampsContext.Provider value={{ patients, stats, labTests, cases }}>
      {children}
    </TimestampsContext.Provider>
  );
};
