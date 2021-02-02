import React, { useState, useMemo } from 'react';

import Municipalities from './CITIES_SOCIAL_FRIENDLY/Municipalities';
import { Row } from '../../shared/ui/New';

function CITIES_SOCIAL_FRIENDLY({
  check_municipalities,
  title,
  municipalities,
}) {
  const [icons, setIcons] = useState('FB');

  const munVer = useMemo(() => {
    return (
      <>
        <ul className="municipalities">
          <Municipalities
            data={municipalities}
            showTrend="y"
            icons={icons}
          ></Municipalities>
        </ul>
      </>
    );
  }, [icons, municipalities]);

  const clickHandler = event => {
    const { target } = event;

    if (icons === 'FB') {
      setIcons('TW');
      target.innerHTML = 'Prikaži FB ikone';
      return;
    }
    if (icons === 'TW') {
      setIcons('FB');
      target.innerHTML = 'Prikaži TW ikone';
      return;
    }
  };

  return (
    <div className={`cities ${check_municipalities}`}>
      <button
        className="btn"
        onClick={clickHandler}
        style={{
          margin: '16px 8px 0',
          color: 'var(--white)',
          backgroundColor: '#1877f2',
        }}
      >
        Prikaži TW ikone
      </button>
      <Row end={false}>{title}: </Row>
      {munVer}
    </div>
  );
}

export default CITIES_SOCIAL_FRIENDLY;
