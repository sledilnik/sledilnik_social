import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';

import { formatNumber } from '../utils/formatNumber';
import { formatNumberWithSign } from './../utils/formatNumber';

import Output from './Output';
import { differenceInDays } from 'date-fns';
import { getDate } from '../utils/dates';
import FetchBoundary from './FetchBoundary';

// path summary
const Brackets = ({ children }) => <>({children})</>;

const getActiveCasesData = data => {
  const {
    value,
    subValues: { in: casesIn, out },
  } = data.casesActive;
  const kindOfData = 'default';
  const newData = {
    value1: formatNumber(value),
    value2: (
      <Brackets>
        {formatNumberWithSign(casesIn)}, {formatNumberWithSign(-out)}
      </Brackets>
    ),
  };
  const isWrongDate =
    differenceInDays(new Date(), getDate(data.casesActive)) > 1;

  return { data: newData, kindOfData, isWrongDate };
};

function ActiveCases({ hook, outputProps, ...props }) {
  return (
    <FetchBoundary hook={hook}>
      <Output {...outputProps} />
    </FetchBoundary>
  );
}

function withActiveCases_HOC(Component) {
  const WithActiveCases = ({ ...props }) => {
    const { summary: hook } = useContext(DataContext);
    const data = hook.data && getActiveCasesData(hook.data);

    const outputProps = {
      ...data,
      keyTitle: 'ActiveCases',
    };

    return <Component hook={hook} outputProps={outputProps} {...props} />;
  };

  return WithActiveCases;
}
export default withActiveCases_HOC(ActiveCases);
