import React, { useContext } from 'react';
import { differenceInDays } from 'date-fns';
import { getDate } from '../utils/dates';

import { DataContext } from '../context/DataContext';

import { formatNumberWithSign, formatNumber } from '../utils/formatNumber';

import Output from './Output';
import FetchBoundary from './FetchBoundary';

// path patients

function Deceased({ hook, outputProps, ...props }) {
  return (
    <FetchBoundary hook={hook}>
      <Output {...outputProps} />
    </FetchBoundary>
  );
}

const getDeceasedData = data => {
  const sortedData = [...data].sort((a, b) => b.dayFromStart - a.dayFromStart);

  const kindOfData = 'default';

  const newData = {
    value1: formatNumberWithSign(sortedData[0].total.deceased.today),
    value2: formatNumber(sortedData[0].total.deceased.toDate),
  };

  const isWrongDate = differenceInDays(new Date(), getDate(sortedData[0])) > 0;
  return { data: newData, kindOfData, isWrongDate };
};

function withDeceasedHOC(Component) {
  const WithDeceased = ({ ...props }) => {
    const { patients: hook } = useContext(DataContext);
    const data = hook.data && getDeceasedData(hook.data);

    const outputProps = {
      ...data,
      keyTitle: 'Deceased',
    };

    return <Component hook={hook} outputProps={outputProps} {...props} />;
  };
  return WithDeceased;
}
export default withDeceasedHOC(Deceased);
