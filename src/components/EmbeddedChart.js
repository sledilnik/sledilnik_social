import React, { useContext, useEffect, useRef, useState } from 'react';
import { addDays } from 'date-fns';
import './EmbeddedChart.css';

import CHARTS, { getChartUrl } from './../dicts/ChartsDict';
import Screenshot from './Screenshot';
import { formatToLocaleDateString } from '../utils/dates';
import { TimestampsContext } from './../context/TimestampsContext';
import { DataContext } from './../context/DataContext';

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

const DefaultHoverValues = {
  days: '0',
  municipalities: 'ajdovščina',
};

const replaceAll = (text, string, replaceValue) => {
  const newText = text.replace(string, replaceValue);
  const indexOf = newText.indexOf(string);
  if (indexOf > -1) {
    return replaceAll(newText, string, replaceValue);
  }
  return newText;
};

function EmbeddedChart() {
  const ts = useContext(TimestampsContext);
  const dataHooks = useContext(DataContext);
  const [src, setSrc] = useState(null);
  const chartPickerRef = useRef();
  const customChartPickerRef = useRef();
  const hoverIndexPickerRef = useRef();
  const hideLegendCheckboxRef = useRef();
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

  const chartPickerOptions = Object.entries(CHARTS)
    .filter(item => {
      return !item[1].noShow;
    })
    .map(([key, item]) => {
      const { name, text, shortText } = item;
      const displayName = shortText || text || name || key;
      const hasCustomCharts = !!item.customCharts;
      return (
        <option
          key={name || key}
          value={name || key}
          data-has-custom-charts={hasCustomCharts}
        >
          {displayName}
        </option>
      );
    });

  const chartPickerOptionsArchived = Object.entries(CHARTS)
    .filter(item => {
      return item[1].noShow;
    })
    .map(([key, item]) => {
      const { name, text, shortText } = item;
      const displayName = shortText || text || name || key;
      const hasCustomCharts = !!item.customCharts;
      return (
        <option
          key={name || key}
          value={name || key}
          data-has-custom-charts={hasCustomCharts}
        >
          {displayName}
        </option>
      );
    });

  const customChartPickerOptions = chartData?.customCharts
    ? Object.entries(chartData.customCharts)
        .filter(item => {
          return !item[1].noShow;
        })
        .map(([key, item]) => {
          const { name, text, shortText } = item;
          const displayName = shortText || text || name || key;
          return (
            <option key={name || key} value={name || key}>
              {displayName}
            </option>
          );
        })
    : null;

  const customChart =
    customChartPickerValue &&
    chartData?.customCharts &&
    chartData?.customCharts[customChartPickerValue];

  const getHoverIndexOptions = (customChart, tsHooks, custom) => {
    if (customChart.days) {
      const { days, tsName } = customChart;
      const { data: customTs } = tsHooks[tsName];
      const customTsDate = new Date(customTs * 1000);
      const addDaysToCalculateChartEndDate = AddDays[tsName];
      const chartEndDate = addDays(
        customTsDate,
        addDaysToCalculateChartEndDate
      );
      const daysToAddToSeries = chartEndDate.getDay();
      const seriesLength = SeriesLength[tsName](days(), daysToAddToSeries);

      const hoverSeries = [...Array(seriesLength).keys()];
      return hoverSeries.map(item => {
        const text = formatToLocaleDateString(
          addDays(chartEndDate, -seriesLength + item + 1)
        );

        return (
          <option key={`${screen}-${custom}-${item}`} value={item}>
            {text}
          </option>
        );
      });
    }

    if (customChart.municipalities) {
      const municipalities = dataHooks.municipalitiesList.data.slice(
        1,
        dataHooks.municipalitiesList.data.length
      );

      return municipalities.map(item => {
        const text = item.name;
        const value = replaceAll(item.id, '_', '-');
        return (
          <option key={`${screen}-${custom}-${item.id}`} value={value}>
            {text}
          </option>
        );
      });
    }
  };

  const customChartHoverIndexOptions = customChart?.hasHoverIndex
    ? getHoverIndexOptions(customChart, ts, custom)
    : null;

  const changeChartHandler = event => {
    setCustom('');
    setHoverIndex('');
    setScreen(event.target.value);
    setChartData(CHARTS[event.target.value]);
    setSrc(getChartUrl(event.target.value));
    setShow(false);
    setShowChartOptions(false);
  };

  const changeCustomChartHandler = event => {
    setCustom(event.target.value);
    const hasHoverIndex =
      chartData?.customCharts[event.target.value]?.hasHoverIndex;

    const defaultValuesKey =
      chartData?.customCharts[event.target.value]?.defaultValuesKey;

    let hoverValue = hasHoverIndex && DefaultHoverValues[defaultValuesKey];
    hasHoverIndex && hasHoverIndex
      ? setHoverIndex(hoverValue)
      : setHoverIndex('');
    setShow(false);
  };

  const changeCustomChartHoverIndexHandler = event => {
    setHoverIndex(event.target.value);
    setShow(false);
  };

  const showScreenshotHandler = () => setShow(true);

  const getCaptionText = () => {
    const chartValue = chartPickerRef.current?.selectedIndex;
    const customValue = customChartPickerRef.current?.selectedIndex;
    const hoverValue = hoverIndexPickerRef.current?.selectedIndex;

    const chartName = chartPickerRef.current?.options[chartValue]?.innerText;
    const customName =
      customValue !== 0
        ? customChartPickerRef.current?.options[customValue]?.innerText
        : '';
    let hoverName = hoverIndexPickerRef.current?.options[hoverValue]?.innerText;

    hoverName = hoverName && hoverName.split('.').join('_');

    let captionText = customName ? chartName + '_' + customName : chartName;
    captionText = hoverName ? captionText + '_' + hoverName : captionText;

    return captionText;
  };

  const resizeFrame = event => {
    if (event.data.type === 'embed-size') {
      console.log('resize event received', event.data);
      const iframe = document.querySelector(
        "iframe[name='" + event.data.name + "']"
      );
      if (iframe != null) {
        iframe.style.height = event.data.height + 'px';
      }
    }
  };

  const changeHideLegendHandler = () => {
    show && setShow(false);
  };

  window.addEventListener('message', resizeFrame);

  return (
    <div className="EmbeddedChart">
      <div className="button-container">
        <div className="select-container">
          <label htmlFor="chart-picker">
            Izberi graf{' '}
            <div className="option-legend has-custom-charts">Opcija</div>
            <div className="option-legend has-not-custom-charts">
              Brez opcij
            </div>
          </label>

          <select
            ref={chartPickerRef}
            name="chart-picker"
            id="chart-picker"
            onChange={changeChartHandler}
            defaultValue={screen}
          >
            <optgroup label="Aktivni">{chartPickerOptions}</optgroup>
            <optgroup label="Arhiv">{chartPickerOptionsArchived}</optgroup>
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
            <label htmlFor="custom-chart-hoverIndex-picker">
              {customChart.labelText}
            </label>
            <select
              ref={hoverIndexPickerRef}
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
      <div className="select-container">
        <label htmlFor="hide-label-checkbox">Brez legende</label>
        <input
          ref={hideLegendCheckboxRef}
          type="checkbox"
          onChange={changeHideLegendHandler}
        />
      </div>

      <div className="image-container">
        {!show && (
          <button onClick={showScreenshotHandler}>Naredi posnetek grafa</button>
        )}
        {show && screen && (
          <>
            <h2>Posnetek grafa</h2>
            <Screenshot
              params={{
                type: 'chart',
                screen: screen,
                custom: custom,
                hoverIndex: hoverIndex,
                hideLegend: hideLegendCheckboxRef?.current.checked,
              }}
              noSkip
              captionTop
              captionBottom
              captionText={getCaptionText()}
              pickers={{
                chartPickerRef,
                customChartPickerRef,
                hoverIndexPickerRef,
                hideLegendCheckboxRef,
              }}
            />
          </>
        )}
      </div>
      <h2>Vgrajen graf</h2>
      <figure>
        <figcaption>{chartData?.text || chartData?.name}</figcaption>
        <iframe
          id="embedded-chart"
          src={src}
          frameBorder="0"
          title="embedded-chart"
          width="100%"
          name="embedded-chart"
        ></iframe>
      </figure>
    </div>
  );
}

export default EmbeddedChart;
