import React, { useContext } from 'react';
import { differenceInDays } from 'date-fns';

import { DataContext } from '../../context/DataContext';

import { formatNumber } from '../../utils/formatNumber';
import { getDate } from '../../utils/dates';

import DataRow from '../Shared/DataRow';
import FetchBoundary from './Shared/FetchBoundary';

// path patients
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

  const dataLength = sortedData.length;

  const todayIndex = dataLength === 3 ? 1 : 0;
  const yesterdayIndex = dataLength === 3 ? 2 : 1;

  const todayPerAge = sortedData[todayIndex]?.statePerAgeToDate;
  const yesterdayPerAge = sortedData[yesterdayIndex]?.statePerAgeToDate;

  if (!todayPerAge || !yesterdayPerAge) {
    return {
      deltas: [],
      isWrongDate: true,
      error: new Error('"statePerAgeToDate" not available!'),
    };
  }

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
        {ageRange} <span style={{ fontWeight: 700 }}>({delta})</span>
        {i !== 9 ? ',' : ''}
      </span>
    );
  });

  const allIsNaN = _deltas.every(item => isNaN(item));

  const dayDiffToCompare = dataLength === 3 ? 0 : 1;

  const isWrongDate =
    differenceInDays(new Date(), getDate(sortedData[0])) > dayDiffToCompare ||
    allIsNaN;
  return {
    deltas,
    isWrongDate,
    error: null,
  };
};

function withPerAgeHOC(Component) {
  const WithPerAge = ({ ...props }) => {
    const { stats: hook } = useContext(DataContext);

    const { deltas, isWrongDate, error } =
      hook.data && getPerAgeData(hook.data);

    if (error) {
      console.error(error);
      return (
        <DataRow markFail={true}>
          Potrjeni primeri po starosti: Error: {error.message}.
        </DataRow>
      );
    }

    return (
      <Component
        hook={hook}
        deltas={deltas}
        isWrongDate={isWrongDate}
        {...props}
      />
    );
  };
  return WithPerAge;
}
export default withPerAgeHOC(PerAge);
