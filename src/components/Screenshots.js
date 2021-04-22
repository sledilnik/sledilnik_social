import React from 'react';
import Screenshot from './Screenshot';
import './Screenshots.css';

function Screenshots() {
  return (
    <div className="Screenshots">
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
        <h2>Hospitalizirani</h2>
        <Screenshot params={{ type: 'chart', screen: 'Patients' }} />
        <h2>Intezivna terapija</h2>
        <Screenshot params={{ type: 'chart', screen: 'IcuPatients' }} />
      </div>
    </div>
  );
}

export default Screenshots;
