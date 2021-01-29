import React from 'react';
import { addDays } from 'date-fns';

import './App.css';

import List from './components/List';
import Footer from './components/Footer';
import Header from './components/Header';
import Legend from './components/Legend';
import useFetch from './hooks/useFetch';

const BASE_API_URL = 'https://api.sledilnik.org';
const STATS_URL = `${BASE_API_URL}/api/stats`;
const PATIENTS_URL = `${BASE_API_URL}/api/patients`;
const MUN_URL = `${BASE_API_URL}/api/municipalities`;
const HOSPITALS_LIST_URL = `${BASE_API_URL}/api/hospitals-list`;
const LAB_TESTS_URL = `${BASE_API_URL}/api/lab-tests`;
const SUMMARY_URL = `${BASE_API_URL}/api/summary`;

function App() {
  const getISODateFrom = num => addDays(new Date(), num).toISOString();

  const statsHook = useFetch(STATS_URL, { from: getISODateFrom(-4) });
  const patientsHook = useFetch(PATIENTS_URL, { from: getISODateFrom(-3) });
  const municipalitiesHook = useFetch(MUN_URL, { from: getISODateFrom(-18) });
  const hospitalsListHook = useFetch(HOSPITALS_LIST_URL);
  const labTestsHook = useFetch(LAB_TESTS_URL, { from: getISODateFrom(-3) });
  const summaryHook = useFetch(SUMMARY_URL);

  return (
    <div className="App">
      <Header />
      <main className="main">
        <List
          statsHook={statsHook}
          municipalitiesHook={municipalitiesHook}
          patientsHook={patientsHook}
          hospitalsListHook={hospitalsListHook}
          labTestsHook={labTestsHook}
          summaryHook={summaryHook}
        />
        <Legend
          statsHook={statsHook}
          municipalitiesHook={municipalitiesHook}
          patientsHook={patientsHook}
          labTestsHook={labTestsHook}
          summaryHook={summaryHook}
        />
      </main>
      <Footer />
    </div>
  );
}
export default App;
