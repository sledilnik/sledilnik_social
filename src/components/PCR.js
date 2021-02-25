import React, { useContext } from 'react';
import { differenceInDays } from 'date-fns/';
import { getDate } from '../utils/dates';

import { DataContext } from '../context/DataContext';

import {
  formatNumberWithSign,
  formatNumber,
  formatPercentage,
} from '../utils/formatNumber';

import Output from './Output';
import FetchBoundary from './FetchBoundary';

function PCR({ hook, title, outputProps, ...props }) {
  return (
    <FetchBoundary hook={hook} title={title} {...props}>
      <Output keyTitle={title} {...outputProps} />
    </FetchBoundary>
  );
}

const isObject = variable =>
  Object.prototype.toString.call(variable) === '[object Object]';

const getPCRValues = data => {
  if (isObject(data)) {
    const {
      value,
      subValues: { positive, percent },
    } = data;
    return { value, positive, percent };
  }
  return new Error('Argument should be an object!');
};

const getPCRDataDict = ({ value, positive, percent }) => ({
  default: {
    value1: formatNumberWithSign(positive),
    value2: formatNumber(value),
    value3: formatPercentage(percent / 100),
  },
  onlyValue: { value1: formatNumber(value) },
});

const getPCRKindOfData = data =>
  data.value && !!data.positive && !!data.percent ? 'default' : 'onlyValue';

const isWrongDate = (date, compare) =>
  differenceInDays(new Date(), date) > compare;

const getDataOutputProps = data => {
  const values = getPCRValues(data);
  const dataDict = getPCRDataDict(values);
  const kindOfData = getPCRKindOfData(values);

  return {
    kindOfData,
    data: dataDict[kindOfData],
    isWrongDate: isWrongDate(getDate(data), 1),
  };
};

function withPCR_HOC(Component) {
  const WithPCR = ({ ...props }) => {
    const { summary: hook } = useContext(DataContext);

    const dataProps =
      hook.data?.testsToday && getDataOutputProps(hook.data.testsToday);

    const outputProps = {
      ...dataProps,
      keyTitle: 'PCR',
    };

    return <Component hook={hook} outputProps={outputProps} {...props} />;
  };

  return WithPCR;
}

export default withPCR_HOC(PCR);
