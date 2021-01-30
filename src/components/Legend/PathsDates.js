import React from 'react';
import differenceInDays from 'date-fns/differenceInDays';
import { Emoji, Arrow, RowSkeleton, RowError } from '../shared/ui/New';
import { LegendSection } from '../Legend';
import { getDate, formatToLocaleDateString } from '../../utils/dates';
import apiPathObject from '../../utils/apiPathObject';

function PathsDates({ css = {}, dates = {}, paths = {}, refreshData = {} }) {
  const apiDates = Object.entries(refreshData).map(([key, value], index) => {
    if (key === 'today') {
      return '';
    }
    return (
      <li key={`${key}-${index}`} className={value[0]}>
        <span className="bold">
          {value[2].pathname}
          {key === 'summary' ? '.casesActive' : ''}:
        </span>{' '}
        {value[1]}
      </li>
    );
  });

  const PathDate = ({ title, path }) => {
    const markOk = <Emoji emoji={'✅'} ariaLabel="check mark" />;
    const markFail = <Emoji emoji={'❌'} ariaLabel="cross mark" />;
    // css[path] = '' || 'red'
    return (
      <li className={css[path]}>
        {css[path] ? markFail : markOk} <span className="bold">{title}: </span>
        <span className={css[path] && 'bold'}>{paths[path].pathname}</span>{' '}
        <Arrow />{' '}
        <span className={css[path] && 'bold'}>{dates[path].toString()}</span>
      </li>
    );
  };
  return (
    <>
      <LegendSection title={'Osveženi podatki'}>
        <ul style={{ listStyle: 'none' }}>
          <li>
            <span className="bold">Danes: {dates.today.toString()}</span>
          </li>
          <li>
            <span className="bold">API datumi:</span>
            <ol style={{ padding: '8px 24px' }}>{apiDates}</ol>
          </li>
          <li>
            {/* <TESTS_ACTIVE/> */}
            <span className="bold">Testi in aktivni primeri:</span>
            <ol style={{ padding: '8px 24px' }}>
              <PathDate title={'PCR'} path={'labTests'} />
              <PathDate title={'HAT'} path={'labTests'} />
              <PathDate title={'Aktivni primeri'} path={'summary'} />
            </ol>
          </li>
          <li>
            {/* <HOSPITALIZED_DECEASED/> */}
            <span className="bold">
              Hospitalizirani, negovani in preminuli:
            </span>{' '}
            <ol className={css.patients} style={{ padding: '8px 24px' }}>
              <PathDate title={'Hospitalizirani'} path={'patients'} />
              <PathDate title={'Na respiratorju'} path={'patients'} />
              <PathDate title={'Negovalne bolnišnice'} path={'patients'} />
              <PathDate title={'Preminuli'} path={'patients'} />
            </ol>
          </li>
          <li>
            <span className="bold">Kombiniran:</span>
            <ol style={{ padding: '8px 24px' }}>
              {/* <Vaccination/> */}
              <PathDate title={'Cepljeni'} path={'stats'} />
              {/* <Confirmed/> */}
              <PathDate title={'Potrjeni primeri'} path={'stats'} />
              {/* <PerAge/> */}
              <PathDate title={'Po starosti'} path={'stats'} />
              {/* <InHospitals/> */}
              <PathDate title={'Po bonišnicah'} path={'patients'} />
              {/* <CITIES_SOCIAL_FRIENDLY/> */}
              <PathDate title={'Po krajih'} path={'municipalities'} />
            </ol>
          </li>
        </ul>
      </LegendSection>
    </>
  );
}

function withPathsDatesHOC(Component) {
  return ({ ...props }) => {
    const { hooks } = props;
    const hooksObj = Object.entries(hooks).reduce(
      (acc, [hookName, hook]) => {
        const key = hookName.replace('Hook', '');
        acc.isLoading[key] = hook.isLoading;
        acc.data[key] = hook.data;
        acc.errors[key] = hook.hasError;
        return acc;
      },
      { isLoading: {}, data: {}, errors: {} }
    );

    const isLoading = Object.values(hooksObj.isLoading).some(item => item);
    const hasError = Object.values(hooksObj.errors).some(item => item);
    const allDataExists = Object.values(hooksObj.data).every(
      item => item !== null
    );

    if (!isLoading && !hasError && !allDataExists) {
      return <RowSkeleton />;
    }

    if (isLoading) {
      return <RowSkeleton />;
    }

    if (hasError) {
      return <RowError />;
    }

    const pathsDatesData =
      allDataExists && getPathsDatesData({ ...hooksObj.data });

    return <Component {...pathsDatesData} />;
  };
}
export default withPathsDatesHOC(PathsDates);

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
    !!dates & !!css &&
    !!paths &&
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
