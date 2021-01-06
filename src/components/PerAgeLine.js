import React from 'react';
import Arrow from './Arrow';
import Delta from './Delta';

function PerAgeLine({ check_third_age, todayPerAge, yesterdayPerAge }) {
  const deltas = [];

  for (let i = 0; i < 10; i++) {
    const { ageFrom, ageTo } = todayPerAge[i];
    const ageRange = `${ageFrom}${ageTo ? '-' + ageTo : '+'}`;
    const key = `${i}_${ageRange}`;
    const today = todayPerAge[i].allToDate;
    const yesterday = yesterdayPerAge[i].allToDate;
    const _delta = (
      <span key={key}>
        {' '}
        {ageRange} (
        <Delta today={today} yesterday={yesterday} />){i !== 9 ? ',' : ''}
      </span>
    );
    deltas.push(_delta);
  }

  return (
    <span className={check_third_age}>
      <p className="text">
        <Arrow /> Potrjeni primeri po starosti:{deltas}.
      </p>
    </span>
  );
}

export default PerAgeLine;
