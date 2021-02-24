import React, { useContext } from 'react';
import { differenceInDays } from 'date-fns';

import { DataContext } from '../context/DataContext';

import { formatNumber } from '../utils/formatNumber';
import { getDate } from '../utils/dates';

import Output from './Output';
import FetchBoundary from './FetchBoundary';

// path summary

const getConfirmedToDateData = data => {
  const { value } = data.casesToDateSummary;
  const kindOfData = 'default';
  const newData = {
    value1: formatNumber(value),
  };
  const isWrongDate =
    differenceInDays(new Date(), getDate(data.casesToDateSummary)) > 1;

  return { data: newData, kindOfData, isWrongDate };
};

function ConfirmedToData({ hook, outputProps, ...props }) {
  return (
    <FetchBoundary hook={hook}>
      <Output {...outputProps} />
    </FetchBoundary>
  );
}

function withConfirmedToDate_HOC(Component) {
  const WithConfirmedToDate = ({ ...props }) => {
    const { summary: hook } = useContext(DataContext);
    const data = hook.data && getConfirmedToDateData(hook.data);

    const outputProps = {
      ...data,
      keyTitle: 'ConfirmedToDate',
    };

    return <Component hook={hook} outputProps={outputProps} {...props} />;
  };
  return WithConfirmedToDate;
}
export default withConfirmedToDate_HOC(ConfirmedToData);
