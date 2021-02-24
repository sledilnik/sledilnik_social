import React, { useContext } from 'react';
import { differenceInDays } from 'date-fns';
import { getDate } from '../utils/dates';

import { DataContext } from '../context/DataContext';

import { formatNumber } from '../utils/formatNumber';

import Output from './Output';
import FetchBoundary from './FetchBoundary';

// path summary
const getVaccinationData = data => {
  const {
    value,
    subValues: { in: vac2 },
  } = data.vaccinationSummary;
  const kindOfData = 'default';
  const newData = {
    value1: formatNumber(value),
    value2: formatNumber(vac2),
  };
  const isWrongDate =
    differenceInDays(new Date(), getDate(data.vaccinationSummary)) > 1;

  return { data: newData, kindOfData, isWrongDate };
};

function Vaccination({ hook, outputProps, ...props }) {
  return (
    <FetchBoundary hook={hook}>
      <Output {...outputProps} />
    </FetchBoundary>
  );
}

function withVaccination_HOC(Component) {
  const WithVaccination = ({ ...props }) => {
    const { summary: hook } = useContext(DataContext);
    const data = hook.data && getVaccinationData(hook.data);

    const outputProps = {
      ...data,
      keyTitle: 'Vaccination',
    };

    return <Component hook={hook} outputProps={outputProps} {...props} />;
  };
  return WithVaccination;
}
export default withVaccination_HOC(Vaccination);
