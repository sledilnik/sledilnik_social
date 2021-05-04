import React, { useContext, useEffect, useRef, useState } from 'react';
import { addDays } from 'date-fns';
import './EmbeddedChart.css';

import CHARTS, { getChartUrl } from './../dicts/ChartsDict';
import Screenshot from './Screenshot';
import { formatToLocaleDateString } from '../utils/dates';
import { TimestampsContext } from './../context/TimestampsContext';

const AddDays = {
  patients: 0,
  labTests: -1,
  cases: -1,
};

const SeriesLength = {
  patients: days => days,
  labTests: (days, num) => days + num,
  cases: days => days,
};

function EmbeddedChart() {
  const ts = useContext(TimestampsContext);
  const [src, setSrc] = useState(null);
  const chartPickerRef = useRef();
  const customChartPickerRef = useRef();
  const [screen, setScreen] = useState(null);
  const [custom, setCustom] = useState('');
  const [hoverIndex, setHoverIndex] = useState('');
  const [show, setShow] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [showChartOptions, setShowChartOptions] = useState(false);

  const chartPickerValue = chartPickerRef.current?.value;
  const customChartPickerValue = customChartPickerRef.current?.value;

  useEffect(() => {
    setScreen(chartPickerValue);
    setChartData(CHARTS[chartPickerValue]);
    setSrc(getChartUrl(chartPickerValue));
  }, [chartPickerValue]);

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

  const customChartPickerOptions = chartData?.customCharts
    ? Object.entries(chartData.customCharts).map(([key, item]) => {
        const { name, text } = item;
        const displayName = text || name || key;
        return (
          <option key={name || key} value={name || key}>
            {displayName}
          </option>
        );
      })
    : null;

  const customChart =
    customChartPickerValue && chartData?.customCharts[customChartPickerValue];

  const getHoverIndexOptions = (customChart, tsHooks, custom) => {
    const { days, tsName } = customChart;
    const { data: customTs } = tsHooks[tsName];
    const customTsDate = new Date(customTs * 1000);
    const addDaysToCalculateChartEndDate = AddDays[tsName];
    const chartEndDate = addDays(customTsDate, addDaysToCalculateChartEndDate);
    const daysToAddToSeries = chartEndDate.getDay();
    const seriesLength = SeriesLength[tsName](days, daysToAddToSeries);

    const newArray = [...Array(seriesLength).keys()];
    return newArray.map(item => {
      const text = formatToLocaleDateString(
        addDays(chartEndDate, -seriesLength + item + 1)
      );

      return (
        <option key={`${screen}-${custom}-${item}`} value={item}>
          {text}
        </option>
      );
    });
  };

  const customChartHoverIndexOptions = customChart?.hasHoverIndex
    ? getHoverIndexOptions(customChart, ts, custom)
    : null;

  const changeChartHandler = event => {
    setCustom('');
    setHoverIndex('');
    setChartData(CHARTS[event.target.value]);
    setScreen(event.target.value);
    setSrc(getChartUrl(event.target.value));
    setShow(false);
    setShowChartOptions(false);
  };

  const changeCustomChartHandler = event => {
    setCustom(event.target.value);
    const hasHoverIndex =
      chartData?.customCharts[event.target.value]?.hasHoverIndex;

    hasHoverIndex ? setHoverIndex(0) : setHoverIndex('');
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
        <div className="select-container">
          <label htmlFor="chart-picker">Izberi graf</label>
          <select
            ref={chartPickerRef}
            name="chart-picker"
            id="chart-picker"
            onChange={changeChartHandler}
            defaultValue={screen}
          >
            {chartPickerOptions}
          </select>
        </div>
        {showChartOptions && (
          <div className="select-container">
            <label htmlFor="custom-chart-picker">Opcija</label>
            <select
              ref={customChartPickerRef}
              name="custom-chart-picker"
              id="custom-chart-picker"
              onChange={changeCustomChartHandler}
              defaultValue={custom}
            >
              <option value="">osnoven</option>
              {customChartPickerOptions}
            </select>
          </div>
        )}
        {showChartOptions && customChartHoverIndexOptions && (
          <div className="select-container">
            <label htmlFor="custom-chart-hoverIndex-picker">Dan</label>
            <select
              name="custom-chart-hoverIndex-picker"
              id="custom-chart-hoverIndex-picker"
              onChange={changeCustomChartHoverIndexHandler}
              defaultValue={hoverIndex}
            >
              {customChartHoverIndexOptions}
            </select>
          </div>
        )}
      </div>

      <div className="image-container">
        {!show && (
          <button onClick={showScreenshotHandler}>Naredi posnetek grafa</button>
        )}
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
        id="embedded-chart"
        src={src}
        frameBorder="0"
        title="embedded-chart"
        width="100%"
      ></iframe>
    </div>
  );
}

export default EmbeddedChart;
