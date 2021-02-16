import React, { useContext } from 'react';

import { DataContext } from '../context/DataContext';

import { formatNumber } from './../utils/formatNumber';
import DataRow from './DataRow';

// path patients

const Brackets = ({ children }) => <>({children})</>;

function PerAge({ title, todayPerAge, yesterdayPerAge }) {
  const deltas = todayPerAge.map((item, i) => {
    const { ageFrom, ageTo } = item;
    const ageRange = `${ageFrom}${ageTo ? `-${ageTo}` : '+'}`;
    const today = item.allToDate;
    const yesterday = yesterdayPerAge[i].allToDate;
    const delta = today - yesterday;
    return (
      <span key={`${i}_${ageRange}`}>
        {' '}
        {ageRange}{' '}
        <span style={{ fontWeight: 700 }}>
          <Brackets>{isNaN(delta) ? '-' : formatNumber(delta)}</Brackets>
        </span>
        {i !== 9 ? ',' : ''}
      </span>
    );
  });

  return (
    <DataRow>
      {title}: {deltas}.
    </DataRow>
  );
}

function withPerAgeHOC(Component) {
  return ({ ...props }) => {
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

    const newProps = {
      ...props,
      title: 'Potrjeni primeri po starosti',
      todayPerAge: sortedData[1].statePerAgeToDate,
      yesterdayPerAge: sortedData[2].statePerAgeToDate,
    };

    return <Component {...newProps} />;
  };
}
export default withPerAgeHOC(PerAge);
