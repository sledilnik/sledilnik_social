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

function Legend({ municipalities, isLoading }) {
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
            Testi & Aktivni primer:
            <ol className="red" style={{ paddingLeft: '24px' }}>
              <li>PCR</li>
              <li>HAT</li>
              <li>Aktivni primeri</li>
            </ol>
          </li>
          <li>
            Hospitalizirani in preminuli:
            <ol className="red" style={{ paddingLeft: '24px' }}>
              <li>Hospitalizirani</li>
              <li>Intezivna nega - na respiratorju</li>
              <li>Preminuli</li>
            </ol>
          </li>
          <li>
            Kombinirani
            <ol className="red" style={{ paddingLeft: '24px' }}>
              <li>Cepljeni</li>
              <li>Potrjeni primeri</li>
              <li>Potrjeni primeri po starosti</li>
              <li>Po bonišnicah</li>
              <li>Po krajih</li>
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
