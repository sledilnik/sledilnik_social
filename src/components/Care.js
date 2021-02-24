import React, { useContext } from 'react';
import { differenceInDays } from 'date-fns';
import { getDate } from '../utils/dates';

import { DataContext } from '../context/DataContext';

import { formatNumber, formatNumberWithSign } from '../utils/formatNumber';

import Output from './Output';
import FetchBoundary from './FetchBoundary';

// path patients
function Care({ hook, outputProps, ...props }) {
  return (
    <FetchBoundary hook={hook}>
      <Output {...outputProps} />
    </FetchBoundary>
  );
}
const Brackets = ({ children }) => <>({children})</>;

const getCaredData = data => {
  const sortedData = [...data].sort((a, b) => b.dayFromStart - a.dayFromStart);

  const kindOfData = 'default';

  const newData = {
    value1: formatNumber(sortedData[0].total.care.today),
    value2: (
      <Brackets>
        {formatNumberWithSign(sortedData[0].total.care.in)},{' '}
        {formatNumberWithSign(-sortedData[0].total.care.out)}
      </Brackets>
    ),
  };

  const isWrongDate = differenceInDays(new Date(), getDate(sortedData[0])) > 0;
  return { data: newData, kindOfData, isWrongDate };
};

function withCareHOC(Component) {
  const WithCare = ({ ...props }) => {
    const { patients: hook } = useContext(DataContext);
    const data = hook.data && getCaredData(hook.data);

    const outputProps = {
      ...data,
      keyTitle: 'Care',
    };

    return <Component hook={hook} outputProps={outputProps} {...props} />;
  };
  return WithCare;
}
export default withCareHOC(Care);
