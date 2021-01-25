import React from 'react';
import { addDays } from 'date-fns';
import differenceInDays from 'date-fns/differenceInDays';

import './App.css';

import List from './components/List';
import apiPathObject from './utils/apiPathObject';
import Footer from './components/Footer';
import Header from './components/Header';
import Legend from './components/Legend';
import useFetch from './hooks/useFetch';

import { getDate, formatToLocaleDateString } from './utils/dates';

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

function getLastUpdatedData({ stats, municipalities, patients, labTests }) {
  return {
    patientsData: patients.slice(-1).pop(),
    statsData: stats.slice(-1).pop(),
    municipalitiesData: municipalities.slice(-1).pop(),
    labTestsData: labTests.slice(-1).pop(),
  };
}

function getChecks({ stats, municipalities, patients, summary, labTests }) {
  const isUndefined = val => val === undefined;
  // data
  const lastUpdatedData = getLastUpdatedData({
    stats,
    patients,
    municipalities,
    labTests,
  });

  // dates
  const patientsDate = getDate(lastUpdatedData.patientsData);
  const statsDate = getDate(lastUpdatedData.statsData);
  const municipalitiesDate = getDate(lastUpdatedData.municipalitiesData);
  const labTestsDate = getDate(lastUpdatedData.labTestsData);
  const summaryDate = getDate(summary.casesActive); // before labTests

  // checks
  const patientsCheck = differenceInDays(new Date(), patientsDate) > 0;

  const isPerAgeDataUndefined = isUndefined(
    stats.slice(-2, -1).pop().statePerAgeToDate[0].allToDate
  );
  const statsCheck =
    isPerAgeDataUndefined || differenceInDays(new Date(), statsDate) > 0;

  const municipalitiesCheck =
    differenceInDays(new Date(), municipalitiesDate) > 1;

  const labTestsCheck = differenceInDays(new Date(), labTestsDate) > 1;

  const summaryCheck = differenceInDays(new Date(), summaryDate) > 1;

  return {
    check_summary: summaryCheck ? 'red' : '',
    check_patients: patientsCheck ? 'red' : '',
    check_stats: statsCheck ? 'red' : '',
    check_municipalities: municipalitiesCheck ? 'red' : '',
    check_lab_tests: labTestsCheck ? 'red' : '',
  };
}
