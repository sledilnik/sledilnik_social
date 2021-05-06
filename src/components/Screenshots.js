import React from 'react';
import { ScreenshotNames } from '../dicts/ScreenshotGetUseLocalStorage';
import Screenshot from './Screenshot';
import './Screenshots.css';
import ZipLink from './ZipLink';

import CHART from '../dicts/ChartsDict';
import CARD from '../dicts/CardsDict';
import MULTICARD from '../dicts/MulticardDict';

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

const translatedNames = Object.entries(ScreenshotNames).reduce(
  (acc, [type, names]) => {
    const translated = names.reduce((nestedAcc, name) => {
      nestedAcc[name] = getTranslatedScreenshotName(name, type, typesDict);
      return nestedAcc;
    }, {});
    acc = { ...acc, ...translated };
    return acc;
  },
  {}
);

function ScreenshotsByType({ title, type, ...props }) {
  const names = ScreenshotNames[type.toUpperCase()];

  const screenshots = names.map(name => {
    const [screen, custom] = name.split('_');
    const text = getTranslatedScreenshotName(name, type, typesDict);

    return (
      <div key={`${type}-${name}`} className="screenshot-container">
        <Screenshot
          params={{
            type: type,
            screen: screen,
            custom: custom || '',
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
      <ScreenshotsByType title="Multi" type="multicard" className="multicard" />
      <ScreenshotsByType
        title="Posamezne kartice"
        type="card"
        className="cards"
      />
      <ScreenshotsByType title="Grafi" type="chart" className="charts" />
    </div>
  );
}

export default Screenshots;