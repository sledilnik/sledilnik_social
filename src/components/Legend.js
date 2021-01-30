import React from 'react';
import differenceInDays from 'date-fns/differenceInDays';

import './Legend.css';
import apiPathObject from '../utils/apiPathObject';
import { getDate, formatToLocaleDateString } from '../utils/dates';
import RatioTrends from './Legend/RatioTrends';
import PathsDates from './Legend/PathsDates';

export const LegendSection = ({ title, children }) => (
  <section className="legend-section">
    <h3 className="bold legend-section-title">{title}:</h3>
    {children}
  </section>
);

function Legend({ pathsDatesData, municipalitiesHook }) {
  return (
    <div className="Legend">
      <h2 id="legenda">Legenda</h2>
      <PathsDates
        css={pathsDatesData?.css}
        dates={pathsDatesData?.dates}
        paths={pathsDatesData?.paths}
        refreshData={pathsDatesData?.refreshData}
      />
      <RatioTrends municipalitiesHook={municipalitiesHook} />
    </div>
  );
}

function withLegendHOC(Component) {
  return ({ ...props }) => {
    const stats = props.statsHook.data;
    const patients = props.patientsHook.data;
    const municipalities = props.municipalitiesHook.data;
    // const hospitalsList = props.hospitalsListHook.data;
    const labTests = props.labTestsHook.data;
    const summary = props.summaryHook.data;

    const isLoading =
      props.statsHook.isLoading ||
      props.patientsHook.isLoading ||
      props.municipalitiesHook.isLoading ||
      props.labTestsHook.isLoading ||
      props.summaryHook.isLoading;

    const allDataExists =
      !isLoading &&
      stats !== null &&
      patients !== null &&
      municipalities !== null &&
      labTests !== null &&
      summary !== null;

    // ? move logic to <PathsDates/>
    const pathsDatesData =
      allDataExists &&
      getPathsDatesData({ stats, patients, municipalities, labTests, summary });

    const legendProps = {
      pathsDatesData,
      municipalitiesHook: props.municipalitiesHook,
    };

    return <Component {...legendProps} />;
  };
}

export default withLegendHOC(Legend);

function getPathsDatesData(
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

  // TODO find better name
  const refreshData =
    dates & css &&
    paths &&
    [css, dates, paths].reduce((acc, obj) => {
      for (const [key, value] of Object.entries(obj)) {
        acc[key] = acc[key] ? [...acc[key], value] : [value];
      }
      return acc;
    }, {});

  return {
    dates,
    css,
    paths,
    refreshData,
    municipalities: allData.municipalities,
  };
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
