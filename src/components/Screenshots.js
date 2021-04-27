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
        <Screenshot
          params={{ type: 'multicard', screen: 'LAB' }}
          captionBottom
        />
        <Screenshot
          params={{ type: 'multicard', screen: 'HOS' }}
          captionBottom
        />
        <Screenshot
          params={{ type: 'multicard', screen: 'ALL' }}
          captionBottom
        />
      </div>
      <h2>LAB</h2>
      <div className="cards">
        <Screenshot
          params={{ type: 'card', screen: 'testsToday' }}
          captionBottom
        />
        <Screenshot
          params={{ type: 'card', screen: 'testsTodayHAT' }}
          captionBottom
        />
        <Screenshot
          params={{ type: 'card', screen: 'casesActive' }}
          captionBottom
        />
      </div>
      <h2>HOS</h2>
      <div className="cards">
        <Screenshot
          params={{ type: 'card', screen: 'hospitalizedCurrent' }}
          captionBottom
        />
        <Screenshot
          params={{ type: 'card', screen: 'icuCurrent' }}
          captionBottom
        />
        <Screenshot
          params={{ type: 'card', screen: 'deceasedToDate' }}
          captionBottom
        />
      </div>
      <h2>Ostalo</h2>
      <div className="cards">
        <Screenshot
          params={{ type: 'card', screen: 'casesAvg7Days' }}
          captionBottom
        />
        <Screenshot
          params={{ type: 'card', screen: 'vaccinationSummary' }}
          captionBottom
        />
      </div>
      <div className="charts">
        <div className="chart">
          <h2>Hospitalizirani</h2>
          <Screenshot
            params={{ type: 'chart', screen: 'Patients' }}
            captionBottom
          />
        </div>
        <div className="chart">
          <h2>Intezivna terapija</h2>
          <Screenshot
            params={{ type: 'chart', screen: 'IcuPatients' }}
            captionBottom
          />
        </div>
        <div className="chart">
          <h2>Primeri po občinah</h2>
          <Screenshot
            params={{ type: 'chart', screen: 'Municipalities' }}
            captionBottom
          />
        </div>
        <div className="chart">
          <h2>Zemljevid po občinah - tedenski prirast</h2>
          <Screenshot
            params={{ type: 'chart', screen: 'Map', custom: 'weeklyGrowth' }}
            captionBottom
          />
        </div>
        <div className="chart">
          <h2>Zemljevid po občinah - absolutno 1 dan</h2>
          <Screenshot
            params={{ type: 'chart', screen: 'Map', custom: 'absolute1Day' }}
            captionBottom
          />
        </div>
        <div className="chart">
          <h2>Zemljevid po občinah - porazdelitev 1 dan</h2>
          <Screenshot
            params={{
              type: 'chart',
              screen: 'Map',
              custom: 'distribution1Day',
            }}
            captionBottom
          />
        </div>
      </div>
    </div>
  );
}

export default Screenshots;
