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

function Legend({ municipalities, isLoading, css = {}, dates = {} }) {
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
            <ol style={{ padding: '8px 24px' }}>
              <li className={css.check_stats}>
                <span className="bold">stats:</span> {dates.stats.toString()}
              </li>
              <li className={css.check_summary}>
                <span className="bold">summary:</span>{' '}
                {dates.summary.toString()}
              </li>
              <li className={css.check_patients}>
                <span className="bold">patients:</span>{' '}
                {dates.patients.toString()}
              </li>
              <li className={css.check_municipalities}>
                <span className="bold">municipalities:</span>{' '}
                {dates.municipalities.toString()}
              </li>
              <li className={css.check_lab_tests}>
                <span className="bold">lab-tests:</span>{' '}
                {dates.labTests.toString()}
              </li>
            </ol>
          </li>
          <li>
            {/* <TESTS_ACTIVE/> */}
            <span className="bold">Testi in aktivni primeri:</span>
            <ol style={{ padding: '8px 24px' }}>
              <li className={css.check_lab_tests}>
                <span className="bold">PCR: </span>
                <i>lab-tests: </i>
                {dates.labTests.toString()}
              </li>
              <li className={css.check_lab_tests}>
                <span className="bold">HAT: </span>
                <i>lab-tests: </i>
                {dates.labTests.toString()}
              </li>
              <li className={css.check_summary}>
                <span className="bold">Aktivni primeri: </span>
                <i>summary: </i>
                {dates.summary.toString()}
              </li>
            </ol>
          </li>
          <li>
            {/* <HOSPITALIZED_DECEASED/> */}
            <span className="bold">Hospitalizirani in preminuli:</span>
            <ol style={{ padding: '8px 24px' }}>
              <li className={css.check_patients}>
                <span className="bold">Hospitalizirani: </span>
                <i>stats: </i>
                {dates.stats.toString()}, <i>patients: </i>
                {dates.patients.toString()}
              </li>
              <li className={css.check_patients}>
                <span className="bold">Na respiratorju: </span>
                <i>stats: </i>
                {dates.stats.toString()}, <i>patients: </i>
                {dates.patients.toString()}
              </li>
              <li className={css.check_patients}>
                <span className="bold">Preminuli: </span>
                <i>patients: </i>
                {dates.patients.toString()}
              </li>
            </ol>
          </li>
          <li>
            <span className="bold">Kombiniran:</span>
            <ol style={{ padding: '8px 24px' }}>
              {/* <Vaccination/> */}
              <li className={css.check_stats}>
                <span className="bold">Cepljeni: </span>
                <i>stats: </i>
                {dates.stats.toString()}{' '}
              </li>
              {/* <Confirmed/> */}
              <li className={css.check_stats}>
                <span className="bold">Potrjeni primeri: </span>
                <i>stats: </i>
                {dates.stats.toString()}
              </li>
              {/* <PerAge/> */}
              <li className={css.check_stats}>
                <span className="bold">Po starosti: </span>
                <i>stats: </i>
                {dates.stats.toString()}{' '}
              </li>
              {/* <InHospitals/> */}
              <li className={css.check_patients}>
                <span className="bold">Po bonišnicah: </span>
                <i>patients: </i>
                {dates.patients.toString()}
              </li>
              {/* <CITIES_SOCIAL_FRIENDLY/> */}
              <li className={css.check_municipalities}>
                <span className="bold">Po krajih: </span>
                <i>municipalities: </i>
                {dates.municipalities.toString()}
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
