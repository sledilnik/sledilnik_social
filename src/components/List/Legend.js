import React from 'react';
import Municipalities from './shared/Municipalities';

import './Legend.css';

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
      symbol: 'ni simbola',
      attr: { role: 'img', ariaLabel: 'no symbol' },
    },
  },
];

function Legend({ municipalities, isLoading }) {
  // if (isLoading || !municipalities) {
  //   return 'Legend loading...';
  // }

  const LegendSection = ({ title, children }) => (
    <>
      <p className="bold">{title}:</p>
      {children}
    </>
  );

  const LegendTable = ({ data = [{}] }) => {
    const tableBody = data.map(({ description, icon }, i) => {
      const { symbol, attr } = icon;
      const { role, ariaLabel } = attr;
      return (
        <tr key={`${i}-${ariaLabel}`}>
          <td style={{ textAlign: 'center' }}>
            <span role={role} aria-label={ariaLabel}>
              {symbol}
            </span>
          </td>
          <td>{description}</td>
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

  return (
    <div className="Legend">
      <h2 id="legenda">Legenda</h2>
      <LegendSection
        title={'Trend rasti potrjenih primerov v posamezni občini'}
      >
        <LegendTable data={municipalitiesTrend} />
      </LegendSection>
      <br />
      <br />
      <LegendSection title={'Formula za izračun trenda'}>
        <p>trend = ( log(y1)+3*log(y3) - 4*log(y2) ) / 8</p>
        <p>..</p>
        <p>y1=vsota novih primerov za dneve (-14..-8)</p>
        <p>y2=vsota novih primerov za dneve (-10..-4)</p>
        <p>y3=vsota novih primerov za dneve (-6..0)</p>
      </LegendSection>
      <br />
      <br />
      <LegendSection title={'Občine CHECK ratio'}>
        <ul className="municipalities">
          <Municipalities data={municipalities} showTrend="n"></Municipalities>
        </ul>
      </LegendSection>
    </div>
  );
}

export default Legend;
