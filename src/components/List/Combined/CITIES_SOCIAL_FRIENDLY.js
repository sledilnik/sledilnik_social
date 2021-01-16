import React from 'react';

import Municipalities from './CITIES_SOCIAL_FRIENDLY/Municipalities';
import Outro from '../../shared/ui/Outro';
import { Row, Text } from '../../shared/ui/New';

function CITIES_SOCIAL_FRIENDLY({ check_third_mun, title, municipalities }) {
  const munVer = iconsVersion => (
    <>
      <Row end={false}>
        <Text>{title}: </Text>
      </Row>
      <ul className="municipalities">
        <Municipalities
          data={municipalities}
          showTrend="y"
          icons={iconsVersion}
        ></Municipalities>
      </ul>
    </>
  );

  return (
    <span className={check_third_mun}>
      {munVer('FB')}
      <Outro />
      {munVer('TW')}
    </span>
  );
}

export default CITIES_SOCIAL_FRIENDLY;
