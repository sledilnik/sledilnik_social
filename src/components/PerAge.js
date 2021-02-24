import React, { useContext } from 'react';
import { differenceInDays } from 'date-fns';

import { DataContext } from '../context/DataContext';

import { formatNumber } from './../utils/formatNumber';
import { getDate } from '../utils/dates';

import DataRow from './DataRow';
import FetchBoundary from './FetchBoundary';

// path patients
const Brackets = ({ children }) => <>({children})</>;

function PerAge({ hook, deltas, isWrongDate }) {
  return (
    <FetchBoundary hook={hook}>
      <DataRow markFail={isWrongDate}>
        Potrjeni primeri po starosti: {deltas}.
      </DataRow>
    </FetchBoundary>
  );
}

const getPerAgeData = data => {
  const sortedData = [...data].sort((a, b) => b.dayFromStart - a.dayFromStart);

  const todayPerAge = sortedData[1].statePerAgeToDate;
  const yesterdayPerAge = sortedData[2].statePerAgeToDate;

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

  const isWrongDate =
    differenceInDays(new Date(), getDate(sortedData[0])) > 0 || allIsNaN;
  return {
    deltas,
    isWrongDate,
  };
};

function withPerAgeHOC(Component) {
  const WithPerAge = ({ ...props }) => {
    const { stats: hook } = useContext(DataContext);
    const data = hook.data && getPerAgeData(hook.data);

    return <Component hook={hook} {...data} {...props} />;
  };
  return WithPerAge;
}
export default withPerAgeHOC(PerAge);
