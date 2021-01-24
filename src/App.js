import React from 'react';
import './App.css';
import List, {
  getDate,
  getLastUpdatedData,
  getChecks,
  formatToLocaleDateString,
} from './components/List';
import apiPathObject from './utils/apiPathObject';
import Footer from './components/Footer';
import Header from './components/Header';
import Legend from './components/Legend';
import useFetch from './hooks/useFetch';
import { addDays } from 'date-fns';

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

  const stats = statsHook.data;
  const patients = patientsHook.data;
  const municipalities = municipalitiesHook.data;
  const hospitalsList = hospitalsListHook.data;
  const labTests = labTestsHook.data;
  const summary = summaryHook.data;

  const loading =
    statsHook.isLoading ||
    patientsHook.isLoading ||
    municipalitiesHook.isLoading ||
    hospitalsListHook.isLoading ||
    labTestsHook.isLoading ||
    summaryHook.isLoading;

  const error =
    statsHook.hasError ||
    patientsHook.hasError ||
    municipalitiesHook.hasError ||
    hospitalsListHook.hasError ||
    labTestsHook.hasError ||
    summaryHook.hasError;

  // Legend props
  const allDataExists =
    !loading &&
    stats !== null &&
    patients !== null &&
    municipalities !== null &&
    labTests !== null &&
    summary !== null &&
    hospitalsList !== null;

  const legendProps =
    allDataExists &&
    getLegendData({ stats, patients, municipalities, labTests, summary });

  return (
    <div className="App">
      {error ? console.log(error) : ''}
      <Header />
      <main className="main">
        <List
          // isLoading={!allDataExists}
          statsHook={statsHook}
          municipalitiesHook={municipalitiesHook}
          patientsHook={patientsHook}
          hospitalsListHook={hospitalsListHook}
          labTestsHook={labTestsHook}
          summaryHook={summaryHook}
        />
        <Legend
          isLoading={!allDataExists}
          municipalities={municipalities}
          dates={legendProps?.dates}
          css={legendProps?.css}
          paths={legendProps?.paths}
          refreshData={legendProps?.refreshData}
        />
      </main>
      <Footer />
    </div>
  );
}
export default App;

function getLegendData(
  allData = {
    stats: [],
    patients: [],
    municipalities: [],
    labTests: [],
    summary: {},
  }
) {
  const dates = getDates(allData);

  const cssChecks = getChecks({ ...allData });

  const css = {
    stats: cssChecks.check_stats,
    patients: cssChecks.check_patients,
    labTests: cssChecks.check_lab_tests,
    municipalities: cssChecks.check_municipalities,
    summary: cssChecks.check_summary,
  };

  const paths = {
    stats: apiPathObject.statsPath,
    patients: apiPathObject.patientsPath,
    labTests: apiPathObject.lab_testsPath,
    municipalities: apiPathObject.municipalitiesPath,
    summary: apiPathObject.summaryPath,
  };

  const refreshData =
    dates & css &&
    paths &&
    [css, dates, paths].reduce((acc, obj) => {
      for (const [key, value] of Object.entries(obj)) {
        acc[key] = acc[key] ? [...acc[key], value] : [value];
      }
      return acc;
    }, {});

  return { dates, css, paths, refreshData };
}

function getDates(allData = {}) {
  const { stats, patients, municipalities, labTests, summary } = allData;

  const data = getLastUpdatedData({
    stats,
    patients,
    municipalities,
    labTests,
  });
  const statsDate = getDate(data.statsData);
  const patientsDate = getDate(data.patientsData);
  const municipalitiesDate = getDate(data.municipalitiesData);
  const labTestsDate = getDate(data.labTestsData);
  const summaryDate = getDate(summary.casesActive); // change here, change in List.getChecks

  const dates = {
    today: formatToLocaleDateString(new Date(), 'd.M.yyyy'),
    stats: formatToLocaleDateString(statsDate, 'd.M.yyyy'),
    patients: formatToLocaleDateString(patientsDate, 'd.M.yyyy'),
    municipalities: formatToLocaleDateString(municipalitiesDate, 'd.M.yyyy'),
    labTests: formatToLocaleDateString(labTestsDate, 'd.M.yyyy'),
    summary: formatToLocaleDateString(summaryDate, 'd.M.yyyy'),
  };

  return dates;
}
