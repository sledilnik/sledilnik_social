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
import SomethingWentWrong from './SomethingWentWrong';

const Brackets = ({ children }) => <>({children})</>;

function Summary({ hook, title, outputProps, ...props }) {
  return (
    <FetchBoundary hook={hook} title={title} {...props}>
      <Output keyTitle={title} {...outputProps} />
    </FetchBoundary>
  );
}

const isNotObject = variable =>
  Object.prototype.toString.call(variable) !== '[object Object]';

const getPercentValues = data => {
  if (isNotObject(data)) {
    throw new Error('Argument should be an object!');
  }

  if (!data.value) {
    throw new Error('Missing "value" field.');
  }

  if (!data.subValues) {
    throw new Error('Missing "subValues" field.');
  }

  const {
    value,
    subValues: { positive, percent },
  } = data;
  return { value, positive, percent };
};

const getPercentDataDict = ({ value, positive, percent }) => ({
  default: {
    value1: formatNumberWithSign(positive),
    value2: formatNumber(value),
    value3: formatPercentage(percent / 100),
  },
  onlyValue: { value1: formatNumber(value) },
});

const getPercentKindOfData = data => {
  if (!data) {
    throw new Error('Missing data argument.');
  }

  return data.value && !!data.positive && !!data.percent
    ? 'default'
    : 'onlyValue';
};

const isWrongDate = (date, compare) => {
  if (date === 'Invalid Date') {
    throw new Error('Invalid Date');
  }

  return differenceInDays(new Date(), date) > compare;
};

const getInOutValues = data => {
  if (isNotObject(data)) {
    throw new Error('Argument should be an object!');
  }

  if (!data.value) {
    throw new Error('Missing "value" field.');
  }

  if (!data.subValues) {
    throw new Error('Missing "subValues" field.');
  }
  const {
    value,
    subValues: { in: subValuesIn, out: subValuesOut },
  } = data;
  return {
    value,
    subValuesIn,
    subValuesOut,
  };
};

const getInOutDataDict = ({ value, subValuesIn, subValuesOut }) => ({
  default: {
    value1: formatNumber(value),
    value2: (
      <Brackets>
        {formatNumberWithSign(subValuesIn)},{' '}
        {formatNumberWithSign(-subValuesOut)}
      </Brackets>
    ),
  },
});

const getInDataDict = ({ value, subValuesIn }) => ({
  default: {
    value1: formatNumber(value),
    value2: formatNumber(subValuesIn),
  },
});

const getValueDict = ({ value }) => ({
  default: { value1: formatNumber(value) },
});

const dict = {
  PCR: {
    field: 'testsToday',
    getValues: getPercentValues,
    getDataDict: getPercentDataDict,
    getKindOfData: getPercentKindOfData,
    dateDiff: 1,
  },
  HAT: {
    field: 'testsTodayHAT',
    getValues: getPercentValues,
    getDataDict: getPercentDataDict,
    getKindOfData: getPercentKindOfData,
    dateDiff: 1,
  },
  ActiveCases: {
    field: 'casesActive',
    getValues: getInOutValues,
    getDataDict: getInOutDataDict,
    getKindOfData: () => 'default',
    dateDiff: 1,
  },
  Vaccination: {
    field: 'vaccinationSummary',
    getValues: getInOutValues,
    getDataDict: getInDataDict,
    getKindOfData: () => 'default',
    dateDiff: 1,
  },
  ConfirmedToDate: {
    field: 'casesToDateSummary',
    getValues: getInOutValues,
    getDataDict: getValueDict,
    getKindOfData: () => 'default',
    dateDiff: 1,
  },
};

const getDataOutputProps = (data, title) => {
  const values = dict[title].getValues(data);
  const dataDict = dict[title].getDataDict(values);
  const kindOfData = dict[title].getKindOfData(values);
  return {
    kindOfData,
    data: dataDict[kindOfData],
    isWrongDate: isWrongDate(getDate(data), dict[title].dateDiff),
  };
};

function withSummary_HOC(Component) {
  const WithSummary = ({ ...props }) => {
    const { summary: hook } = useContext(DataContext);

    const field = dict[props.title].field;

    let outputProps;
    try {
      outputProps =
        hook.data &&
        hook.data[field] &&
        getDataOutputProps(hook.data[field], props.title);
    } catch (error) {
      return <SomethingWentWrong title={props.title} />;
    }

    return (
      <Component
        title={props.title}
        hook={hook}
        outputProps={outputProps}
        {...props}
      />
    );
  };

  return WithSummary;
}

export default withSummary_HOC(Summary);
