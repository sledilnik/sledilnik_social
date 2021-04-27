import React, { useEffect, useRef, useState } from 'react';
import { addDays } from 'date-fns';
import './EmbeddedChart.css';

import CHARTS, { getChartUrl } from './../dicts/ChartsDict';
import Screenshot from './Screenshot';
import { formatToLocaleDateString } from '../utils/dates';

function EmbeddedChart() {
  const [src, setSrc] = useState(null);
  const chartPickerRef = useRef();
  const customChartPickerRef = useRef();
  const iframeRef = useRef();
  const [screen, setScreen] = useState(null);
  const [custom, setCustom] = useState('');
  const [hoverIndex, setHoverIndex] = useState('');
  const [show, setShow] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [showChartOptions, setShowChartOptions] = useState(false);

  const value = chartPickerRef.current?.value;

  useEffect(() => {
    setScreen(value);
    setChartData(CHARTS[value]);
    setSrc(getChartUrl(value));
  }, [value]);

  useEffect(() => {
    setShowChartOptions(!!chartData?.customCharts);
  }, [chartData]);

  const chartPickerOptions = Object.entries(CHARTS).map(([key, item]) => {
    const { name, text } = item;
    const displayName = text || name || key;
    return (
      <option key={name || key} value={name || key}>
        {displayName}
      </option>
    );
  });

  const customChartOptions = chartData?.customCharts
    ? Object.entries(chartData?.customCharts).map(([key, item]) => {
        const { name, text } = item;
        const displayName = text || name || key;
        return (
          <option key={name || key} value={name || key}>
            {displayName}
          </option>
        );
      })
    : null;

  const hasHoverIndex =
    customChartPickerRef?.current?.value &&
    chartData?.customCharts &&
    chartData?.customCharts[customChartPickerRef.current?.value]?.hasHoverIndex;

  const customChartHoverIndexOptions = hasHoverIndex
    ? [...Array(chartData.customCharts[custom].days).keys()].map(item => {
        const { days } = chartData?.customCharts[
          customChartPickerRef.current.value
        ];
        const text = formatToLocaleDateString(
          addDays(new Date(), -days + item + 1)
        );

        return (
          <option key={`${screen}-${custom}-${item}`} value={item}>
            {text}
          </option>
        );
      })
    : null;

  const changeChartHandler = event => {
    setScreen(event.target.value);
    setSrc(event.target.value);
    setShow(false);
    setShowChartOptions(false);
  };

  const changeCustomChartHandler = event => {
    setCustom(event.target.value);
    const { hasHoverIndex, days } = chartData?.customCharts[
      event.target.value
    ] || { hasHoverIndex: 'false', days: 0 };
    hasHoverIndex && setHoverIndex(days - 1);
    setShow(false);
  };

  const changeCustomChartHoverIndexHandler = event => {
    setHoverIndex(event.target.value);
    setShow(false);
  };

  const showScreenshotHandler = () => setShow(true);

  return (
    <div className="EmbeddedChart">
      <div className="button-container">
        <label htmlFor="chart-picker">Izberi graf</label>
        <select
          ref={chartPickerRef}
          name="chart-picker"
          id="chart-picker"
          onChange={changeChartHandler}
          defaultValue="Map"
        >
          {chartPickerOptions}
        </select>
        {showChartOptions && (
          <>
            <label htmlFor="custom-chart-picker">Custom</label>
            <select
              ref={customChartPickerRef}
              name="custom-chart-picker"
              id="custom-chart-picker"
              onChange={changeCustomChartHandler}
            >
              <option value="">default</option>
              {customChartOptions}
            </select>
          </>
        )}
        {showChartOptions && customChartHoverIndexOptions && (
          <>
            <label htmlFor="custom-chart-hoverIndex-picker">Day</label>
            <select
              name="custom-chart-hoverIndex-picker"
              id="custom-chart-hoverIndex-picker"
              onChange={changeCustomChartHoverIndexHandler}
              defaultValue={hoverIndex}
            >
              {customChartHoverIndexOptions}
            </select>
          </>
        )}
      </div>
      <button onClick={showScreenshotHandler}>Show screenshot</button>
      <div className="image-container">
        {show && screen && (
          <Screenshot
            params={{
              type: 'chart',
              screen: screen,
              custom: custom,
              hoverIndex: hoverIndex,
            }}
            noSkip
            captionTop
            captionBottom
          />
        )}
      </div>
      <iframe
        ref={iframeRef}
        id="neki"
        src={src}
        frameBorder="0"
        title="embedded-chart"
        width="100%"
      ></iframe>
    </div>
  );
}

export default EmbeddedChart;
