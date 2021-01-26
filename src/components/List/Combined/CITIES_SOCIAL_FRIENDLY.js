import React, { useState } from 'react';

import Municipalities from './CITIES_SOCIAL_FRIENDLY/Municipalities';
import { Row } from '../../shared/ui/New';

function CITIES_SOCIAL_FRIENDLY({
  check_municipalities,
  title,
  municipalities,
}) {
  const [icons, setIcons] = useState('FB');

  const munVer = iconsVersion => (
    <>
      <Row end={false}>{title}: </Row>
      <ul className="municipalities">
        <Municipalities
          data={municipalities}
          showTrend="y"
          icons={iconsVersion}
        ></Municipalities>
      </ul>
    </>
  );

  const clickHandler = event => {
    const { target } = event;

    if (icons === 'FB') {
      setIcons('TW');
      target.innerHTML = 'Show facebook icons';
      return;
    }
    if (icons === 'TW') {
      setIcons('FB');
      target.innerHTML = 'Show twitter icons';
      return;
    }
  };

  return (
    <div className="cities">
      <button
        onClick={clickHandler}
        style={{ marginTop: '1em', userSelect: 'none' }}
      >
        Show twitter icons
      </button>
      <span className={check_municipalities}>{munVer(icons)}</span>
    </div>
  );
}

export default CITIES_SOCIAL_FRIENDLY;
