import React, { useState } from 'react';
import Municipalities from '../List/Combined/CITIES_SOCIAL_FRIENDLY/Municipalities';
import trendsLegendDict from '../../dict/trendsLegendDict';
import { LegendSection } from '../Legend';
import Error from '../shared/Error';
import { Row } from '../shared/ui/New';

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

function RatioTrends({ municipalities, errors, weekly }) {
  const [show, setShow] = useState(false);
  const munVer = (
    <Municipalities data={municipalities} showTrend="n" weekly={weekly} />
  );
  return (
    <Error hasData={!!municipalities} hasError={errors.municipalities}>
      {!weekly && (
        <>
          <LegendSection
            title={'Trend rasti potrjenih primerov v posamezni občini'}
          >
            <LegendTable data={trendsLegendDict} />
          </LegendSection>
          <LegendSection title={'Formula za izračun trenda'}>
            <h4>trend = ( log(y1) + 3 * log(y3) - 4*log(y2) ) / 8</h4>
            <p className="text">y1 = vsota novih primerov za dneve (-14..-8)</p>
            <p className="text">y2 = vsota novih primerov za dneve (-10..-4)</p>
            <p className="text">y3 = vsota novih primerov za dneve (-6..0)</p>
          </LegendSection>
        </>
      )}
      <LegendSection title={'Občine CHECK ratio'}>
        <button className="btn" onClick={() => setShow(prev => !prev)}>
          {show ? 'Zapri' : 'Odpri'}
        </button>
        {show && (
          <>
            <Row end={false}>Po krajih: </Row>
            <ul className="municipalities">{munVer}</ul>
          </>
        )}
      </LegendSection>
    </Error>
  );
}

function withRatioTrendsHOC(Component) {
  return ({ municipalitiesHook, ...props }) => {
    const errors = { municipalities: municipalitiesHook.hasError };

    const data = {
      municipalities: municipalitiesHook.data,
      errors,
      ...props,
    };

    return <Component {...data} />;
  };
}
export default withRatioTrendsHOC(RatioTrends);
