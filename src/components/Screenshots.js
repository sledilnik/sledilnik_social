import React, { useContext, useEffect, useState } from 'react';
// import { formatRelative } from 'date-fns';
// import { sl } from 'date-fns/locale';

import { ScreenshotNames } from '../dicts/ScreenshotGetUseLocalStorage';
import Screenshot from './Screenshot';
import './Screenshots.css';
import ZipLink from './ZipLink';
import ScreenshotGetUseLocalStorage from '../dicts/ScreenshotGetUseLocalStorage';

import CHART from '../dicts/ChartsDict';
import CARD from '../dicts/CardsDict';
import MULTICARD from '../dicts/MulticardDict';
import EpiZipDict from '../dicts/EPI_ZipDict';
import { TimestampsContext } from '../context/TimestampsContext';
import useLocalStorage from '../hooks/useLocalStorage';

const typesDict = {
  CHART,
  CARD,
  MULTICARD,
};

const getTranslatedScreenshotName = (name, type, typesDict) => {
  const [screen, custom] = name.split('_');
  const types = typesDict[type.toUpperCase()];
  return !custom ? types[screen].text : types[screen].customCharts[custom].text;
};

const getHideLegendInScreenshot = (name, type, typesDict) => {
  const [screen, custom] = name.split('_');
  const types = typesDict[type.toUpperCase()];
  return !custom
    ? types[screen].hideLegendInScreenshots
    : types[screen].customCharts[custom].hideLegendInScreenshots;
};

const translatedNames = Object.entries(ScreenshotNames).reduce(
  (acc, [type, names]) => {
    const translated = names.reduce((nestedAcc, name) => {
      nestedAcc[name] = getTranslatedScreenshotName(name, type, typesDict);
      return nestedAcc;
    }, {});
    return { ...acc, ...translated };
  },
  {}
);

function ScreenshotsByType({ title, type, ...props }) {
  const names = ScreenshotNames[type.toUpperCase()];

  const screenshots = names.map(name => {
    const [screen, custom] = name.split('_');
    const text = getTranslatedScreenshotName(name, type, typesDict);
    const hideLegend = getHideLegendInScreenshot(name, type, typesDict);
    const immediateDownload = false;

    return (
      <div key={`${type}-${name}`} className="screenshot-container">
        <Screenshot
          params={{
            type,
            screen,
            custom: custom || '',
            hideLegend: hideLegend ? String(hideLegend) : '',
            immediateDownload,
          }}
          captionTop
          captionText={text}
        />
      </div>
    );
  });

  return (
    <div className={props.className}>
      <h2>{title || type}</h2>
      <div className="screenshots-container">{screenshots}</div>
    </div>
  );
}

function Screenshots() {
  const { stats } = useContext(TimestampsContext);
  const [localTs, setLocalTs] = useLocalStorage(stats.data, 'statsTimestamp');
  const [show, setShow] = useState(true);

  const screenshotsUseLocalStorageHooks = Object.entries(
    ScreenshotGetUseLocalStorage
  ).reduce((acc, [key, binddedUseLocalStorage]) => {
    acc[key] = binddedUseLocalStorage();
    return acc;
  }, {});

  const ts = stats.data;

  useEffect(() => {
    if (localTs < ts) {
      setLocalTs(ts);
      setShow(false);
    }

    if (localTs === null || localTs < ts) {
      for (let item of Object.entries(screenshotsUseLocalStorageHooks)) {
        item[1][1](null);
      }
    }

    if (localTs === ts) {
      setShow(true);
    }
  }, [localTs, ts, setLocalTs, screenshotsUseLocalStorageHooks]);

  // const relateiveDate = formatRelative(new Date(ts * 1000), new Date(), {
  //   locale: sl,
  // });

  return (
    <div className="Screenshots">
      {/* <span className="timestamp">{relateiveDate}</span> */}
      <div className="buttons-container">
        <ZipLink
          text="Vse"
          filenames={ScreenshotNames}
          translated={translatedNames}
          zipName={'All_screeenshots'}
        />
        <ZipLink
          text="EPI"
          filenames={EpiZipDict}
          translated={translatedNames}
          zipName={'EPI_screeenshots'}
        />
        <ZipLink
          text="Multi kartice"
          filenames={ScreenshotNames.MULTICARD}
          translated={translatedNames}
          zipName={'multicards_screeenshots'}
        />
        <ZipLink
          text="Grafi"
          filenames={ScreenshotNames.CHART}
          translated={translatedNames}
          zipName={'charts_screeenshots'}
        />
        <ZipLink
          text="Kartice"
          filenames={ScreenshotNames.CARD}
          translated={translatedNames}
          zipName={'cards_screeenshots'}
        />
      </div>
      {show && (
        <>
          <ScreenshotsByType
            title="Multi"
            type="multicard"
            className="multicard"
          />
          <ScreenshotsByType
            title="Posamezne kartice"
            type="card"
            className="cards"
          />
          <ScreenshotsByType title="Grafi" type="chart" className="charts" />
        </>
      )}
    </div>
  );
}

export default Screenshots;
