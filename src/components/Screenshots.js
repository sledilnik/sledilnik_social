import React from 'react';
import ScreenshotGetUseLocalStorage, {
  ScreenshotNames,
} from '../dicts/ScreenshotGetUseLocalStorage';
import Screenshot from './Screenshot';
import './Screenshots.css';
import ZipLink from './ZipLink';

import CHARTS from '../dicts/ChartsDict';
import CARDS from '../dicts/CardsDict';
import MULTICARD from '../dicts/MulticardDict';

const typesDict = {
  CHARTS,
  CARDS,
  MULTICARD,
};

function ScreenshotsByType({ title, type, ...props }) {
  const names = ScreenshotNames[type.toUpperCase()];

  const screenshots = names.map(name => {
    const indexOf = name.indexOf('_');

    const types = typesDict[type.toUpperCase()];
    const [_name, _custom] = name.split('_');

    let text =
      indexOf < 0 ? types[name].text : types[_name].customCharts[_custom].text;

    return (
      <div key={`${type}-${name}`} className="screenshot-container">
        <Screenshot
          params={{ type: type, screen: name }}
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
  const filenames = Object.keys(ScreenshotGetUseLocalStorage);
  return (
    <div className="Screenshots">
      <div className="buttons-container">
        <ZipLink filenames={filenames} />
      </div>
      <ScreenshotsByType title="Multi" type="multicard" className="multicard" />
      <ScreenshotsByType
        title="Posamezne kartice"
        type="cards"
        className="cards"
      />
      <ScreenshotsByType title="Grafi" type="charts" className="charts" />
    </div>
  );
}

export default Screenshots;
