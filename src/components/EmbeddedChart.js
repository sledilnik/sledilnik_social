import React, { useEffect, useRef, useState } from 'react';
import './EmbeddedChart.css';

import CHARTS, { getChartUrl } from './../dicts/ChartsDict';

function EmbeddedChart() {
  const [src, setSrc] = useState(null);
  const ref = useRef();

  const value = ref.current?.value;

  useEffect(() => {
    setSrc(getChartUrl(value));
  }, [value]);

  const options = Object.entries(CHARTS).map(([key, item]) => {
    const { name, text } = item;
    const displayName = text || name;
    return (
      <option key={name} value={name}>
        {displayName}
      </option>
    );
  });

  const changeHandler = event => {
    console.log(event.target.value);
    setSrc(event.target.value);
  };

  return (
    <div className="EmbeddedChart">
      <div>
        <label htmlFor="chart-picker">Izberi graf</label>
        <select
          ref={ref}
          name="chart-picker"
          id="chart-picker"
          onChange={changeHandler}
          defaultValue="MetricsComparison"
        >
          {options}
        </select>
      </div>
      <iframe
        src={src}
        frameBorder="0"
        title="embedded chart"
        width="100%"
      ></iframe>
    </div>
  );
}

export default EmbeddedChart;
