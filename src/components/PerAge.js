import React, { useContext } from 'react';
import { differenceInDays } from 'date-fns';

import { DataContext } from '../context/DataContext';

import { formatNumber } from './../utils/formatNumber';
import { getDate } from '../utils/dates';

import DataRow from './DataRow';

// path patients

const Brackets = ({ children }) => <>({children})</>;

function PerAge({ title, todayPerAge, yesterdayPerAge, wrongDate }) {
  const _deltas = todayPerAge.map(
    (item, i) => item.allToDate - yesterdayPerAge[i].allToDate
  );

  const deltas = _deltas.map((item, i) => {
    const { ageFrom, ageTo } = todayPerAge[i];
    const ageRange = `${ageFrom}${ageTo ? `-${ageTo}` : '+'}`;
    const delta = isNaN(item) ? '-' : formatNumber(item);
    return (
      <span key={`${i}_${ageRange}`}>
        {' '}
        {ageRange}{' '}
        <span style={{ fontWeight: 700 }}>
          <Brackets>{delta}</Brackets>
        </span>
        {i !== 9 ? ',' : ''}
      </span>
    );
  });

  const allIsNaN = _deltas.every(item => isNaN(item));

  return (
    <DataRow markFail={wrongDate || allIsNaN}>
      {title}: {deltas}.
    </DataRow>
  );
}

function withPerAgeHOC(Component) {
  const PerAge = ({ ...props }) => {
    const { stats: hook } = useContext(DataContext);

    if (hook.isLoading) {
      return 'Loading....';
    }

    if (hook.data === null) {
      return 'Null';
    }

    const sortedData = [...hook.data].sort(
      (a, b) => b.dayFromStart - a.dayFromStart
    );

    const wrongDate = differenceInDays(new Date(), getDate(sortedData[0])) > 0;

    const newProps = {
      ...props,
      title: 'Potrjeni primeri po starosti',
      todayPerAge: sortedData[1].statePerAgeToDate,
      yesterdayPerAge: sortedData[2].statePerAgeToDate,
      wrongDate,
    };

    return <Component {...newProps} />;
  };
  return PerAge;
}
export default withPerAgeHOC(PerAge);
