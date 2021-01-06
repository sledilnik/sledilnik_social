import React from 'react';
import Arrow from './Arrow';
import Municipalities from './Municipalities';
import Outro from './Outro';

function MunicipalitiesLines({ check_third_mun, municipalities }) {
  const munVer = iconsVersion => (
    <>
      <p className="text">
        <Arrow /> Po krajih:
      </p>
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
      <br />
      <br />
      {munVer('TW')}
    </span>
  );
}

export default MunicipalitiesLines;
