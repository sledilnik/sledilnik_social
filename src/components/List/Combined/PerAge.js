import React from 'react';
import Delta from '../shared/Delta';
import DataRow from '../shared/DataRow';

function PerAge({ check_third_age, todayPerAge, yesterdayPerAge }) {
  const deltas = [];

  for (let i = 0; i < 10; i++) {
    const { ageFrom, ageTo } = todayPerAge[i];
    const ageRange = `${ageFrom}${ageTo ? `-${ageTo}` : '+'}`;
    const key = `${i}_${ageRange}`;
    const today = todayPerAge[i].allToDate;
    const yesterday = yesterdayPerAge[i].allToDate;
    const _delta = (
      <span key={key}>
        {' '}
        {ageRange}{' '}
        <Delta today={today} yesterday={yesterday} insideColons={true} />
        {i !== 9 ? ',' : ''}
      </span>
    );
    deltas.push(_delta);
  }

  return (
    <span className={check_third_age}>
      <DataRow title={'Potrjeni primeri po starosti'}> {deltas}</DataRow>
    </span>
  );
}

export default PerAge;
