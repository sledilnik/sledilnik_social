import React from 'react';
import Municipalities from './Municipalities';

function Legend({ municipalities }) {
  return (
    <div>
      <p className="bold">
        Legenda trenda rasti potrjenih primerov v posamezni občini:
      </p>
      <p>
        - Trend potrjenih primerov v občini pada{' '}
        <span role="img" aria-label="up">
          ⤵
        </span>
      </p>
      <p>
        - Ni sprememb v trendu potrjenih primerov{' '}
        <i>(trend v območju -0,03 do +0,03)</i>{' '}
        <span role="img" aria-label="neutral">
          ➖
        </span>
      </p>
      <p>
        - Trend potrjenih primerov v občini raste{' '}
        <span role="img" aria-label="down">
          ⤴
        </span>
      </p>
      <p>
        - Trenda ni mogoče izračunati : ni simbola (ena od vrednosti y1, y2, y3
        je enaka 0)
      </p>
      <br />
      <br />
      <p className="bold">Formula za izračun trenda</p>
      <p>trend = ( log(y1)+3*log(y3) - 4*log(y2) ) / 8</p>
      <p>..</p>
      <p>y1=vsota novih primerov za dneve (-14..-8)</p>
      <p>y2=vsota novih primerov za dneve (-10..-4)</p>
      <p>y3=vsota novih primerov za dneve (-6..0)</p>
      <br />
      <br />
      <p className="bold">Občine CHECK ratio</p>
      <ul className="municipalities">
        <Municipalities data={municipalities} showTrend="n"></Municipalities>
      </ul>
    </div>
  );
}

export default Legend;
