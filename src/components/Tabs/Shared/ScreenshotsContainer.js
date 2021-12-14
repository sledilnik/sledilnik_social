import React, { useContext, useEffect, useState } from 'react';

import './ScreenshotsContainer.css';
import ZipLink from '../../Shared/ZipLink';

import {
  EPI_ZipDict,
  ScreenshotNames,
  ScreenshotGetUseLocalStorage,
} from 'dicts';

import { TimestampsContext } from 'context/TimestampsContext';
import useLocalStorage from 'hooks/useLocalStorage';
import ScreenshotsByType, { translatedNames } from './ScreenshotsByType';

function ScreenshotsContainer() {
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

  return (
    <div className="Screenshots">
      <div className="buttons-container">
        <ZipLink
          text="Vse"
          filenames={ScreenshotNames}
          translated={translatedNames}
          zipName={'All_screeenshots'}
        />
        <ZipLink
          text="EPI"
          filenames={EPI_ZipDict}
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

export default ScreenshotsContainer;
