import React from 'react';

import './Legend.css';
import Municipalities from './List/Combined/CITIES_SOCIAL_FRIENDLY/Municipalities';

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
        <span className="bold">{value[2].pathname}:</span> {value[1]}
      </li>
    );
  });

  // TODO move style to css file, when done with html
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
              <li className={css.labTests}>
                <span className="bold">PCR: </span>
                {dates.labTests.toString()} path: {paths.labTests.pathname}
              </li>
              <li className={css.labTests}>
                <span className="bold">HAT: </span>
                {dates.labTests.toString()} path: {paths.labTests.pathname}
              </li>
              <li className={css.summary}>
                <span className="bold">Aktivni primeri: </span>
                <i>summary: </i>
                {dates.summary.toString()} path: {paths.summary.pathname}
              </li>
            </ol>
          </li>
          <li>
            {/* <HOSPITALIZED_DECEASED/> */}
            <span className="bold">Hospitalizirani in preminuli:</span>
            <ol style={{ padding: '8px 24px' }}>
              <li className={css.patients}>
                <span className="bold">Hospitalizirani: </span>
                {dates.stats.toString()} path: {paths.stats.pathname},{' '}
                {dates.patients.toString()} path: {paths.patients.pathname}
              </li>
              <li className={css.patients}>
                <span className="bold">Na respiratorju: </span>
                {dates.stats.toString()} path: {paths.stats.pathname},{' '}
                {dates.patients.toString()} path: {paths.patients.pathname}
              </li>
              <li className={css.patients}>
                <span className="bold">Preminuli: </span>
                {dates.patients.toString()} path: {paths.patients.pathname}
              </li>
            </ol>
          </li>
          <li>
            <span className="bold">Kombiniran:</span>
            <ol style={{ padding: '8px 24px' }}>
              {/* <Vaccination/> */}
              <li className={css.stats}>
                <span className="bold">Cepljeni: </span>
                {dates.stats.toString()} path: {paths.stats.pathname}
              </li>
              {/* <Confirmed/> */}
              <li className={css.stats}>
                <span className="bold">Potrjeni primeri: </span>
                {dates.stats.toString()} path: {paths.stats.pathname}
              </li>
              {/* <PerAge/> */}
              <li className={css.stats}>
                <span className="bold">Po starosti: </span>
                {dates.stats.toString()} path: {paths.stats.pathname}
              </li>
              {/* <InHospitals/> */}
              <li className={css.patients}>
                <span className="bold">Po bonišnicah: </span>
                {dates.patients.toString()} path: {paths.patients.pathname}
              </li>
              {/* <CITIES_SOCIAL_FRIENDLY/> */}
              <li className={css.municipalities}>
                <span className="bold">Po krajih: </span>
                {dates.municipalities.toString()} path:{' '}
                {paths.municipalities.pathname}
              </li>
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
