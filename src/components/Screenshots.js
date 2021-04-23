import React from 'react';
import Screenshot from './Screenshot';
import './Screenshots.css';
import ZipLink from './ZipLink';

function Screenshots() {
  return (
    <div className="Screenshots">
      <div className="buttons-container">
        <ZipLink />
      </div>
      <h2>MULTI</h2>
      <div className="cards">
        <Screenshot params={{ type: 'multicard', screen: 'LAB' }} />
        <Screenshot params={{ type: 'multicard', screen: 'HOS' }} />
        <Screenshot params={{ type: 'multicard', screen: 'ALL' }} />
      </div>
      <h2>LAB</h2>
      <div className="cards">
        <Screenshot params={{ type: 'card', screen: 'testsToday' }} />
        <Screenshot params={{ type: 'card', screen: 'testsTodayHAT' }} />
        <Screenshot params={{ type: 'card', screen: 'casesActive' }} />
      </div>
      <h2>HOS</h2>
      <div className="cards">
        <Screenshot params={{ type: 'card', screen: 'hospitalizedCurrent' }} />
        <Screenshot params={{ type: 'card', screen: 'icuCurrent' }} />
        <Screenshot params={{ type: 'card', screen: 'deceasedToDate' }} />
      </div>
      <h2>Ostalo</h2>
      <div className="cards">
        <Screenshot params={{ type: 'card', screen: 'casesAvg7Days' }} />
        <Screenshot params={{ type: 'card', screen: 'vaccinationSummary' }} />
      </div>
      <div className="charts">
        <div className="chart">
          <h2>Hospitalizirani</h2>
          <Screenshot params={{ type: 'chart', screen: 'Patients' }} />
        </div>
        <div className="chart">
          <h2>Intezivna terapija</h2>
          <Screenshot params={{ type: 'chart', screen: 'IcuPatients' }} />
        </div>
        <div className="chart">
          <h2>Primeri po občinah</h2>
          <Screenshot params={{ type: 'chart', screen: 'Municipalities' }} />
        </div>
        <div className="chart">
          <h2>Zemljevid po občinah - tedenski prirast</h2>
          <Screenshot
            params={{ type: 'chart', screen: 'Map', custom: 'weeklyGrowth' }}
          />
        </div>
      </div>
    </div>
  );
}

export default Screenshots;
