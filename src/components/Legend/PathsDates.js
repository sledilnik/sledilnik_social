import React from 'react';
import { Emoji, Arrow } from '../shared/ui/New';

const LegendSection = ({ title, children }) => (
  <section className="legend-section">
    <h3 className="bold legend-section-title">{title}:</h3>
    {children}
  </section>
);

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
    console.log('withPathDatesHOC: ', props);
    if (props.css === undefined) {
      return null;
    }

    return <Component {...props} />;
  };
}
export default withPathsDatesHOC(PathsDates);
