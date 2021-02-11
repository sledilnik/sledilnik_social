import React from 'react';
// import urlDict from './clean-start/dicts/urlDict';
import Posts from './clean-start/components/Posts';
// import { addDays } from 'date-fns';

// import './App.css';

// import List from './components/List';
// import Footer from './components/Footer';
// import Header from './components/Header';
// import Legend from './components/Legend';
// import useFetch from './hooks/useFetch';

// import url from './dict/urlDict';

// import RJV from './components/RJV';
// import Fold from './components/Fold';

// import Timestamps from './components/Timestamps';
// import { TimestampsProvider } from './context/TimestampsContext';

function App() {
  // const getISODateFrom = num => addDays(new Date(), num).toISOString();

  // const statsHook = useFetch(url.STATS, { from: getISODateFrom(-4) });
  // const patientsHook = useFetch(url.PATIENTS, { from: getISODateFrom(-3) });
  // const municipalitiesHook = useFetch(url.MUN, { from: getISODateFrom(-18) });
  // const hospitalsListHook = useFetch(url.HOSPITALS_LIST);
  // const labTestsHook = useFetch(url.LAB_TESTS, { from: getISODateFrom(-3) });
  // const summaryHook = useFetch(url.SUMMARY);

  return (
    <div className="App">
      <header>Header</header>
      <main>
        <Posts />
      </main>
      <footer>Footer</footer>
    </div>
  );
}
export default App;
