import React from 'react';
import Screenshot from './Screenshot';
import './Screenshots.css';

function Screenshots() {
  return (
    <div className="Screenshots">
      <div className="cards">
        <Screenshot params={{ type: 'card', screen: 'testsToday' }} />
        <Screenshot params={{ type: 'card', screen: 'testsTodayHAT' }} />
        <Screenshot params={{ type: 'card', screen: 'casesActive' }} />
      </div>
      <div className="cards">
        <Screenshot params={{ type: 'card', screen: 'hospitalizedCurrent' }} />
        <Screenshot params={{ type: 'card', screen: 'icuCurrent' }} />
        <Screenshot params={{ type: 'card', screen: 'deceasedToDate' }} />
      </div>
      <div className="cards">
        <Screenshot params={{ type: 'card', screen: 'casesAvg7Days' }} />
        <Screenshot params={{ type: 'card', screen: 'vaccinationSummary' }} />
      </div>
      <div className="charts">
        <Screenshot params={{ type: 'chart', screen: 'Patients' }} />
        <Screenshot params={{ type: 'chart', screen: 'IcuPatients' }} />
      </div>
    </div>
  );
}

export default Screenshots;
