import React from 'react';
import { addDays } from 'date-fns';

import './App.css';

import List from './components/List';
import Footer from './components/Footer';
import Header from './components/Header';
import Legend from './components/Legend';
import useFetch from './hooks/useFetch';

import url from './urlDict';

function App() {
  const getISODateFrom = num => addDays(new Date(), num).toISOString();

  const statsHook = useFetch(url.STATS, { from: getISODateFrom(-4) });
  const patientsHook = useFetch(url.PATIENTS, { from: getISODateFrom(-3) });
  const municipalitiesHook = useFetch(url.MUN, { from: getISODateFrom(-18) });
  const hospitalsListHook = useFetch(url.HOSPITALS_LIST);
  const labTestsHook = useFetch(url.LAB_TESTS, { from: getISODateFrom(-3) });
  const summaryHook = useFetch(url.SUMMARY);

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
