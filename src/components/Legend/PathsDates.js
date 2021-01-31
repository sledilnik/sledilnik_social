import React from 'react';
import differenceInDays from 'date-fns/differenceInDays';
import { Emoji, Arrow, RowSkeleton } from '../shared/ui/New';
import { LegendSection } from '../Legend';
import { getDate, formatToLocaleDateString } from '../../utils/dates';
import url from '../../urlDict';

function PathsDates({
  css = {},
  dates = {},
  paths = {},
  errors = {},
  isLoading = {},
}) {
  const apiPathsDates = Object.keys(css).map((path, index) => {
    if (isLoading[path]) {
      return (
        <span key={`${index}-${path}`}>
          <RowSkeleton />;
        </span>
      );
    }
    const hasError = errors[path];
    const red = hasError || css[path] ? 'red' : '';
    return (
      <li key={`${path}-${index}`} className={red}>
        <span className="bold">
          {paths[path]}
          {path === 'summary' ? '.casesActive' : ''}:
        </span>{' '}
        {hasError ? (
          <span>Napaka pri pridobivanju podatkov!</span>
        ) : (
          dates[path]
        )}
      </li>
    );
  });

  const PathDate = ({ title, path }) => {
    if (isLoading[path]) {
      return <RowSkeleton />;
    }
    const hasError = errors[path];
    const red = hasError || css[path] ? 'red' : '';

    const markOk = <Emoji emoji={'✅'} ariaLabel="check mark" />;
    const markFail = <Emoji emoji={'❌'} ariaLabel="cross mark" />;
    // css[path] = '' || 'red'
    return (
      <li className={red}>
        {css[path] || hasError ? markFail : markOk}{' '}
        <span className="bold">{title}: </span>
        <span className={css[path] && 'bold'}>
          {paths[path]}
        </span> <Arrow />{' '}
        {hasError ? (
          <span>Napaka pri pridobivanju podatkov!</span>
        ) : (
          <span className={css[path] && 'bold'}>{dates[path]}</span>
        )}
      </li>
    );
  };

  const today = formatToLocaleDateString(new Date());
  return (
    <>
      <LegendSection title={'Osveženi podatki'}>
        <ul style={{ listStyle: 'none' }}>
          <li>
            <span className="bold">Danes: {today}</span>
          </li>
          <li>
            <span className="bold">API datumi:</span>
            <ol style={{ padding: '8px 24px' }}>{apiPathsDates}</ol>
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

    const compareDateDiffDict = {
      stats: 0,
      patients: 0,
      labTests: 1,
      municipalities: 1,
      summary: 1,
    };

    const newProps = Object.keys(compareDateDiffDict).reduce(
      (acc, key) => {
        const { errors, data: pathsData, isLoading: pathsIsLoading } = hooksObj;
        acc.errors[key] = errors[key];
        acc.isLoading[key] = pathsIsLoading[key];

        let pathKey = key.toUpperCase();
        pathKey = pathKey === 'MUNICIPALITIES' ? 'MUN' : pathKey; // ? refactor urlDict
        pathKey = pathKey === 'LABTESTS' ? 'LAB_TESTS' : pathKey;
        acc.paths[key] = url[pathKey].replace('https://api.sledilnik.org', '');

        const pathData = pathsData[key];
        if (pathData === null) {
          acc.dates[key] = null;
          acc.css[key] = null;
          return acc;
        }

        const data =
          key === 'summary' ? pathData.casesActive : pathData.slice(-1).pop();
        const date = getDate(data);
        acc.dates[key] = formatToLocaleDateString(date);

        // ? have to check if this condition is still needed; it is still used in Combined
        //  const isPerAgeDataUndefined = isUndefined(stats.slice(-2, -1).pop().statePerAgeToDate[0].allToDate);
        //  const statsCheck = isPerAgeDataUndefined || differenceInDays(new Date(), statsDate) > 0;

        const check =
          date && differenceInDays(new Date(), date) > compareDateDiffDict[key]
            ? 'red'
            : '';
        acc.css[key] = check;

        return acc;
      },
      { paths: {}, css: {}, dates: {}, errors: {}, isLoading: {} }
    );

    return <Component {...newProps} />;
  };
}
export default withPathsDatesHOC(PathsDates);
