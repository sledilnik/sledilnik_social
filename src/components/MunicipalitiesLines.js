import React from 'react';
import Municipalities from './Municipalities';
import Outro from './Outro';
import TitleLine from './TitleLine';

function MunicipalitiesLines({ check_third_mun, municipalities }) {
  const munVer = iconsVersion => (
    <>
      <TitleLine title={'Po krajih'} />
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
