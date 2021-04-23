import React, { useEffect, useRef, useState } from 'react';
import './EmbeddedChart.css';

import CHARTS, { getChartUrl } from './../dicts/ChartsDict';
import Screenshot from './Screenshot';

function EmbeddedChart() {
  const [src, setSrc] = useState(null);
  const ref = useRef();
  const [screen, setScreen] = useState(null);
  const [show, setShow] = useState(false);

  const value = ref.current?.value;

  useEffect(() => {
    setScreen(value);
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
    setScreen(event.target.value);
    setSrc(event.target.value);
    setShow(false);
  };

  const showHandler = () => setShow(true);

  return (
    <div className="EmbeddedChart">
      <div className="button-container">
        <label htmlFor="chart-picker">Izberi graf</label>
        <select
          ref={ref}
          name="chart-picker"
          id="chart-picker"
          onChange={changeHandler}
          defaultValue="Map"
        >
          {options}
        </select>
      </div>
      <button onClick={showHandler}>Show</button>
      {show && screen && (
        <Screenshot params={{ type: 'chart', screen: screen }} noSkip />
      )}
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
