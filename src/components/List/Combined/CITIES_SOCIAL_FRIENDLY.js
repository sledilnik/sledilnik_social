import React, { useState, useMemo } from 'react';

import Municipalities from './CITIES_SOCIAL_FRIENDLY/Municipalities';
import { Row } from '../../shared/ui/New';

function CITIES_SOCIAL_FRIENDLY({
  check_municipalities,
  title,
  municipalities,
  showIcons,
  weekly,
}) {
  const [icons, setIcons] = useState('FB');
  const [show, setShow] = useState(true);

  const munVer = useMemo(() => {
    return (
      <>
        <ul className="municipalities">
          <Municipalities
            data={municipalities}
            showTrend="y"
            icons={icons}
            showIcons={showIcons && show}
            weekly={weekly}
          ></Municipalities>
        </ul>
      </>
    );
  }, [icons, municipalities, showIcons, weekly, show]);

  const toggleSocialIcons = event => {
    const { target } = event;

    if (icons === 'FB') {
      setIcons('TW');
      target.innerText = 'Prikaži FB ikone';
      return;
    }
    if (icons === 'TW') {
      setIcons('FB');
      target.innerText = 'Prikaži TW ikone';
      return;
    }
  };

  const toggleShowIcons = event => {
    const { target } = event;
    setShow(prev => {
      target.innerText = !prev ? 'Skrij ikone' : 'Prikaži ikone';
      return !prev;
    });
  };

  return (
    <div className={`cities ${check_municipalities}`}>
      {showIcons && (
        <button
          id="cities-icons-show-btn"
          className="btn"
          onClick={toggleShowIcons}
        >
          Skrij ikone
        </button>
      )}
      {show && (
        <button
          id="cities-icons-btn"
          className="btn social"
          onClick={toggleSocialIcons}
        >
          Prikaži TW ikone
        </button>
      )}

      <Row end={false}>{title}: </Row>
      {munVer}
    </div>
  );
}

export default CITIES_SOCIAL_FRIENDLY;
