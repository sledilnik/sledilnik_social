import React, { useContext } from 'react';

import { DataContext } from '../context/DataContext';

import { formatNumberWithSign, formatNumber } from '../utils/formatNumber';

import Output from './Output';
import { differenceInDays } from 'date-fns';
import { getDate } from '../utils/dates';
import FetchBoundary from './FetchBoundary';

// path patients
function Hospitalized({ hook, outputProps, ...props }) {
  return (
    <FetchBoundary hook={hook}>
      <Output {...outputProps} />
    </FetchBoundary>
  );
}

const Brackets = ({ children }) => <>({children})</>;

const getHospitalizedData = data => {
  const sortedData = [...data].sort((a, b) => b.dayFromStart - a.dayFromStart);

  const kindOfData = 'default';

  const newData = {
    value1: formatNumber(sortedData[0].total.inHospital.today),
    value2: (
      <Brackets>
        {formatNumberWithSign(sortedData[0].total.inHospital.in)},{' '}
        {formatNumberWithSign(-sortedData[0].total.inHospital.out)}
      </Brackets>
    ),
    value3: formatNumber(sortedData[0].total.icu.today),
    value4: (
      <Brackets>
        {formatNumberWithSign(sortedData[0].total.inHospital.today) -
          sortedData[1].total.inHospital.today}
      </Brackets>
    ),
  };

  const isWrongDate = differenceInDays(new Date(), getDate(sortedData[0])) > 0;

  return { data: newData, kindOfData, isWrongDate };
};

function withHospitalizedHOC(Component) {
  const WithHospitalized = ({ ...props }) => {
    const { patients: hook } = useContext(DataContext);
    const data = hook.data && getHospitalizedData(hook.data);

    const outputProps = {
      ...data,
      keyTitle: 'Hospitalized',
    };

    return <Component hook={hook} outputProps={outputProps} {...props} />;
  };
  return WithHospitalized;
}
export default withHospitalizedHOC(Hospitalized);
