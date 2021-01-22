import React from 'react';

import './Legend.css';
import Municipalities from './List/Combined/CITIES_SOCIAL_FRIENDLY/Municipalities';
import { Arrow } from './shared/ui/New';

const municipalitiesTrend = [
  {
    description: 'Trend potrjenih primerov v občini pada.',
    icon: { symbol: '⤵', attr: { role: 'img', ariaLabel: 'up' } }, // down?
  },
  {
    description:
      'Ni sprememb v trendu potrjenih primerov (trend v območju -0,03 do +0,03).',
    icon: { symbol: '➖', attr: { role: 'img', ariaLabel: 'neutral' } },
  },
  {
    description: 'Trend potrjenih primerov v občini raste.',
    icon: { symbol: '⤴', attr: { role: 'img', ariaLabel: 'down' } }, // up?
  },
  {
    description:
      'Trenda ni mogoče izračunati (ena od vrednosti y1, y2, y3 je enaka 0).',
    icon: {
      symbol: 'brez',
      attr: { role: 'img', ariaLabel: 'no symbol' },
    },
  },
];

function Legend({
  municipalities,
  isLoading,
  css = {},
  dates = {},
  paths = {},
  refreshData = {},
}) {
  // should render different for each condition?
  if (isLoading || !municipalities) {
    return '';
  }

  const LegendSection = ({ title, children }) => (
    <section className="legend-section">
      <h3 className="bold legend-section-title">{title}:</h3>
      {children}
    </section>
  );

  const LegendTable = ({ data = [{}] }) => {
    const tableBody = data.map(({ description, icon }, i) => {
      const { symbol, attr } = icon;
      const { role, ariaLabel } = attr;
      return (
        <tr key={`${i}-${ariaLabel}`}>
          <td className="table-symbol">
            <span role={role} aria-label={ariaLabel}>
              {symbol}
            </span>
          </td>
          <td className="table-description">{description}</td>
        </tr>
      );
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Simbol</th>
            <th>Opis</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    );
  };

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

  const PathDate = ({ title, path }) => (
    <li className={css[path]}>
      <span className="bold">{title}: </span>
      <span className="bold">{paths[path].pathname}</span> <Arrow />{' '}
      <span className="bold">{dates[path].toString()}</span>
    </li>
  );

  // TODO move inline style to css file, when done with html
  // ? add data date?
  return (
    <div className="Legend">
      <h2 id="legenda">Legenda</h2>
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
      <LegendSection
        title={'Trend rasti potrjenih primerov v posamezni občini'}
      >
        <LegendTable data={municipalitiesTrend} />
      </LegendSection>
      <LegendSection title={'Formula za izračun trenda'}>
        <p>trend = ( log(y1) + 3 * log(y3) - 4*log(y2) ) / 8</p>
        <p>y1 = vsota novih primerov za dneve (-14..-8)</p>
        <p>y2 = vsota novih primerov za dneve (-10..-4)</p>
        <p>y3 = vsota novih primerov za dneve (-6..0)</p>
      </LegendSection>
      <LegendSection title={'Občine CHECK ratio'}>
        <ul className="municipalities">
          <Municipalities data={municipalities} showTrend="n"></Municipalities>
        </ul>
      </LegendSection>
    </div>
  );
}

export default Legend;
