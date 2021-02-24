import React, { useContext } from 'react';
import { differenceInDays } from 'date-fns';
import { getDate } from '../utils/dates';

import { DataContext } from '../context/DataContext';

import { formatNumber } from '../utils/formatNumber';

import Output from './Output';
import { formatNumberWithSign } from './../utils/formatNumber';
import FetchBoundary from './FetchBoundary';

// path patients
function OnRespiratory({ hook, outputProps, ...props }) {
  return (
    <FetchBoundary hook={hook}>
      <Output {...outputProps} />
    </FetchBoundary>
  );
}

const getOnRespiratoryData = data => {
  const sortedData = [...data].sort((a, b) => b.dayFromStart - a.dayFromStart);

  const kindOfData = 'default';

  const newData = {
    value1: formatNumber(
      sortedData[0].total.critical.today + sortedData[0].total.niv.today
    ),
    value2: formatNumber(sortedData[0].total.critical.today),
    value3: `(${formatNumberWithSign(
      sortedData[0].total.critical.today - sortedData[1].total.critical.today
    )})`,
    value4: formatNumber(sortedData[0].total.niv.today),
    value5: `(${formatNumberWithSign(
      sortedData[0].total.niv.today - sortedData[1].total.niv.today
    )})`,
  };

  const isWrongDate = differenceInDays(new Date(), getDate(sortedData[0])) > 0;

  return { data: newData, kindOfData, isWrongDate };
};

function withOnRespiratoryHOC(Component) {
  const WithOnRespiratory = ({ ...props }) => {
    const { patients: hook } = useContext(DataContext);
    const data = hook.data && getOnRespiratoryData(hook.data);

    const outputProps = {
      ...data,
      keyTitle: 'OnRespiratory',
    };

    return <Component hook={hook} outputProps={outputProps} {...props} />;
  };
  return WithOnRespiratory;
}
export default withOnRespiratoryHOC(OnRespiratory);
