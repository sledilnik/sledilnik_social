import React from 'react';
import Municipalities from '../shared/Municipalities';
import Outro from '../../shared/Outro';
import DataRow from '../shared/DataRow';

function CITIES_SOCIALFRIENDLY({ check_third_mun, municipalities }) {
  const munVer = iconsVersion => (
    <>
      <DataRow title={'Po krajih'} />
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

export default CITIES_SOCIALFRIENDLY;
