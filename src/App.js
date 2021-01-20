import React, { useEffect, useState } from 'react';
import './App.css';
import List, {
  getDate,
  getLastUpdatedData,
  getChecks,
  formatToLocaleDateString,
} from './components/List';
import withListLoading from './components/withListLoading';
import apiPathObject from './utils/apiPathObject';
import Footer from './components/Footer';
import Header from './components/Header';
import Legend from './components/Legend';

function App() {
  const ListLoading = withListLoading(List);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [patients, setPatients] = useState(null);
  const [municipalities, setMunicipalities] = useState(null);
  const [hospitalsList, setHospitalsList] = useState(null);
  const [error, setError] = useState(false);
  const [labTests, setLabTests] = useState(false);
  const [summary, setSummary] = useState(false);

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

  const getDatesAndCss = isLoading => {
    if (isLoading || !stats) {
      return;
    }

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
      today: formatToLocaleDateString(new Date(), 'E, d.M.yyyy'),
      stats: formatToLocaleDateString(statsDate, 'E, d.M.yyyy'),
      patients: formatToLocaleDateString(patientsDate, 'E, d.M.yyyy'),
      municipalities: formatToLocaleDateString(
        municipalitiesDate,
        'E, d.M.yyyy'
      ),
      labTests: formatToLocaleDateString(labTestsDate, 'E, d.M.yyyy'),
      summary: formatToLocaleDateString(summaryDate, 'E, d.M.yyyy'),
    };

    const css = getChecks({
      stats,
      municipalities,
      patients,
      summary,
      labTests,
    });

    return {
      dates,
      css: {
        stats: css.check_stats,
        patients: css.check_patients,
        labTests: css.check_lab_tests,
        municipalities: css.check_municipalities,
        summary: css.check_summary,
      },
    };
  };

  const paths = {
    stats: apiPathObject.statsPath,
    patients: apiPathObject.patientsPath,
    labTests: apiPathObject.lab_testsPath,
    municipalities: apiPathObject.municipalitiesPath,
    summary: apiPathObject.summaryPath,
  };

  const datesAndCss = getDatesAndCss(loading);

  const refreshData =
    datesAndCss &&
    paths &&
    [datesAndCss?.css, datesAndCss?.dates, paths].reduce((acc, obj) => {
      for (const [key, value] of Object.entries(obj)) {
        acc[key] = acc[key] ? [...acc[key], value] : [value];
      }
      return acc;
    }, {});

  return (
    <div className="App">
      {error ? console.log(error) : ''}
      <Header />
      <main className="main">
        <ListLoading
          isLoading={loading}
          stats={stats}
          municipalities={municipalities}
          patients={patients}
          hospitalsList={hospitalsList}
          labTests={labTests}
          summary={summary}
        />
        <Legend
          isLoading={loading}
          municipalities={municipalities}
          dates={datesAndCss?.dates}
          css={datesAndCss?.css}
          paths={paths}
          refreshData={refreshData}
        />
      </main>
      <Footer />
    </div>
  );
}
export default App;
