import React from 'react';
import Posts from './components/Posts';
import { DataProvider } from './context/DataContext';
import { TimestampsProvider } from './context/TimestampsContext';

// import './App.css';

function App() {
  // const getISODateFrom = num => addDays(new Date(), num).toISOString();

  // const statsHook = useFetch(url.STATS, { from: getISODateFrom(-4) });
  // const municipalitiesHook = useFetch(url.MUN, { from: getISODateFrom(-18) });
  // const hospitalsListHook = useFetch(url.HOSPITALS_LIST);
  // const labTestsHook = useFetch(url.LAB_TESTS, { from: getISODateFrom(-3) });

  return (
    <div className="App">
      <header>Header</header>
      <TimestampsProvider>
        <main>
          <DataProvider>
            <Posts />
          </DataProvider>
        </main>
      </TimestampsProvider>
      <footer>Footer</footer>
    </div>
  );
}
export default App;
