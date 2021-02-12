import React, { createContext } from 'react';
import { API_URL, API_PARAMS } from '../dicts/urlDict';
import useFetch from '../hooks/useFetch';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const summary = useFetch(API_URL.SUMMARY);
  const patients = useFetch(API_URL.PATIENTS, API_PARAMS.PATIENTS);
  const stats = useFetch(API_URL.STATS, API_PARAMS.STATS);
  const hospitalsList = useFetch(API_URL.HOSPITALS_LIST);

  const value = { summary, patients, stats, hospitalsList };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
