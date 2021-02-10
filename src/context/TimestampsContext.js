import React, { createContext, useMemo, useState, useEffect } from 'react';
import { TIMESTAMP_URL } from '../dict/urlDict';
import useFetch from '../hooks/useFetch';

export const TimestampsContext = createContext();

export const TimestampsProvider = ({ children }) => {
  const [state, setState] = useState(null);

  const now = Date.now();
  const params = { nocache: now };
  const stats = useFetch(TIMESTAMP_URL.STATS, params);
  const patients = useFetch(TIMESTAMP_URL.PATIENTS, params);
  const municipalities = useFetch(TIMESTAMP_URL.MUN, params);
  const labTests = useFetch(TIMESTAMP_URL.LAB_TESTS, params);
  const cases = useFetch(TIMESTAMP_URL.CASES, params);
  const hospitals = useFetch(TIMESTAMP_URL.HOSPITALS, params);
  const icu = useFetch(TIMESTAMP_URL.ICU, params);
  const vaccination = useFetch(TIMESTAMP_URL.ICU, params);

  const timestamps = useMemo(
    () => ({
      stats: stats.data,
      patients: patients.data,
      municipalities: municipalities.data,
      'lab-tests': labTests.data,
      cases: cases.data,
      hospitals: hospitals.data,
      icu: icu.data,
      vaccination: vaccination.data,
    }),
    [
      stats.data,
      patients.data,
      municipalities.data,
      labTests.data,
      cases.data,
      hospitals.data,
      icu.data,
      vaccination.data,
    ]
  );

  useEffect(() => {
    setState(prev => {
      return {
        ...prev,
        ...timestamps,
      };
    });
  }, [timestamps]);

  return (
    <TimestampsContext.Provider value={state}>
      {children}
    </TimestampsContext.Provider>
  );
};
