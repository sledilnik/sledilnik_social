import React from 'react';
import { addDays } from 'date-fns';

import './App.css';

import List from './components/List';
import Footer from './components/Footer';
import Header from './components/Header';
import Legend from './components/Legend';
import useFetch from './hooks/useFetch';

const BASE_API_URL = 'https://api.sledilnik.org';

function App() {
  const statsHook = useFetch(BASE_API_URL + '/api/stats', {
    from: addDays(new Date(), -4).toISOString(),
  });
  const patientsHook = useFetch(BASE_API_URL + '/api/patients', {
    from: addDays(new Date(), -3).toISOString(),
  });
  const municipalitiesHook = useFetch(BASE_API_URL + '/api/municipalities', {
    from: addDays(new Date(), -18).toISOString(),
  });
  const hospitalsListHook = useFetch(BASE_API_URL + '/api/hospitals-list');
  const labTestsHook = useFetch(BASE_API_URL + '/api/lab-tests', {
    from: addDays(new Date(), -3).toISOString(),
  });
  const summaryHook = useFetch(BASE_API_URL + '/api/summary');

  const error =
    statsHook.hasError ||
    patientsHook.hasError ||
    municipalitiesHook.hasError ||
    hospitalsListHook.hasError ||
    labTestsHook.hasError ||
    summaryHook.hasError;

  return (
    <div className="App">
      {error ? console.log(error) : ''}
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
          hospitalsListHook={hospitalsListHook}
          labTestsHook={labTestsHook}
          summaryHook={summaryHook}
        />
      </main>
      <Footer />
    </div>
  );
}
export default App;
