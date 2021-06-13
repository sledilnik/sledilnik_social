import React, { createContext } from 'react';
import { API_URL, API_PARAMS } from '../dicts/URL_Dict';
import useFetch from '../hooks/useFetch';

export const DataContext = createContext();

const api_url = API_URL;

export const DataProvider = ({ children }) => {
  const summary = useFetch(api_url.SUMMARY);
  const patients = useFetch(api_url.PATIENTS, API_PARAMS.PATIENTS);
  const stats = useFetch(api_url.STATS, API_PARAMS.STATS);
  const hospitalsList = useFetch(api_url.HOSPITALS_LIST);
  const municipalities = useFetch(api_url.MUN, API_PARAMS.MUN);
  const municipalitiesList = useFetch(api_url.MUN_LIST);

  const value = {
    summary,
    patients,
    stats,
    hospitalsList,
    municipalities,
    municipalitiesList,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
