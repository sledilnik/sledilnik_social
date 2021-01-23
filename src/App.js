import React, { useEffect, useState } from 'react';
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

function App() {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [patients, setPatients] = useState(null);
  const [municipalities, setMunicipalities] = useState(null);
  const [hospitalsList, setHospitalsList] = useState(null);
  const [error, setError] = useState(false);
  const [labTests, setLabTests] = useState(null);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function fetchData(url, setState) {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setState(data);
      } catch (error) {
        setError(true);
      }
    }

    setLoading(true);
    // const timer = setTimeout(() => { // timer
    const {
      statsPath,
      patientsPath,
      municipalitiesPath,
      hospitals_listPath,
      lab_testsPath,
      summaryPath,
    } = apiPathObject;

    Promise.all([
      fetchData(statsPath, setStats),
      fetchData(patientsPath, setPatients),
      fetchData(municipalitiesPath, setMunicipalities),
      fetchData(hospitals_listPath, setHospitalsList),
      fetchData(lab_testsPath, setLabTests),
      fetchData(summaryPath, setSummary),
    ])
      .catch(() => setError(true))
      .finally(() => setLoading(false)); // show data
    // }, 800);
    // return () => clearTimeout(timer);
  }, []);

  // Legend props
  const allDataExists =
    !loading &&
    stats !== null &&
    patients !== null &&
    municipalities !== null &&
    labTests !== null &&
    summary !== null &&
    hospitalsList !== null;

  console.log({ allDataExists });
  const legendProps =
    allDataExists &&
    getLegendData({ stats, patients, municipalities, labTests, summary });

  return (
    <div className="App">
      {error ? console.log(error) : ''}
      <Header />
      <main className="main">
        <List
          isLoading={!allDataExists}
          stats={stats}
          municipalities={municipalities}
          patients={patients}
          hospitalsList={hospitalsList}
          labTests={labTests}
          summary={summary}
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
