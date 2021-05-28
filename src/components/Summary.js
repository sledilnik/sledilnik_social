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

import SummaryData from '../dicts/SummaryDataDict';

const POPULATION = 2_100_126;

function Summary({ hook, title, outputProps, ...props }) {
  return (
    <FetchBoundary hook={hook} title={title} {...props}>
      <Output keyTitle={title} {...outputProps} />
    </FetchBoundary>
  );
}

const isNotObject = variable =>
  Object.prototype.toString.call(variable) !== '[object Object]';

const checkData = data => {
  if (isNotObject(data)) {
    throw new Error('Argument should be an object!');
  }
  if (!data.value) {
    throw new Error('Missing "value" field.');
  }
  if (!data.subValues) {
    throw new Error('Missing "subValues" field.');
  }
};

const getValues = data => {
  checkData(data);
  const { value, subValues } = data;
  return { value, ...subValues };
};

const isDaysDiffGreater = (date, compare) => {
  if (date && isNaN(date.getTime())) {
    throw new Error('Invalid Date');
  }
  return differenceInDays(new Date(), date) > compare;
};

const getFormattedValues = (
  type,
  { value, positive, percent, in: _in, out }
) => {
  if (type === 'percentage') {
    return {
      value1: formatNumberWithSign(positive),
      value2: formatNumber(value),
      value3: formatPercentage(percent / 100),
    };
  }

  if (type === 'bracketsInOut') {
    return {
      value1: formatNumber(value),
      value2: `(${formatNumberWithSign(_in)}, ${formatNumberWithSign(-out)})`,
    };
  }

  if (type === 'onlyIn') {
    return {
      value1: formatNumber(value),
      value2: formatNumber(_in),
    };
  }

  if (type === 'onlyValue') {
    return {
      value1: formatNumber(value),
    };
  }

  if (type === 'vaccinationSummary') {
    return {
      value1: formatNumber(value),
      value2: `(${formatPercentage(percent / 100)})`,
      value3: `${formatNumber(_in)}(${formatPercentage(_in / POPULATION)})`,
    };
  }

  throw new Error('Type does not exist!');
};

const getValuesType = (type, mandatoryProperties, values) => {
  if (type.fallback === null || !mandatoryProperties) {
    return type.default;
  }

  const result = mandatoryProperties.reduce((acc, item) => {
    return acc && !!values[item];
  }, true);
  return result ? type.default : type.fallback;
};

const getOutputProps = (data, title) => {
  const values = getValues(data);
  const { types, mandatoryProperties } = SummaryData[title];

  const type = getValuesType(types, mandatoryProperties, values);
  const formattedValues = getFormattedValues(type, values);
  const DAYS_DIFFERENCE = 1;

  const textsType = type === types.default ? 'default' : 'onlyValue';

  return {
    kindOfData: textsType,
    data: formattedValues,
    isWrongDate: isDaysDiffGreater(getDate(data), DAYS_DIFFERENCE),
  };
};

function withSummary_HOC(Component) {
  const WithSummary = ({ title, ...props }) => {
    const { summary: hook } = useContext(DataContext);

    let outputProps;
    try {
      const { field } = SummaryData[title];
      outputProps =
        hook.data &&
        hook.data[field] &&
        getOutputProps(hook.data[field], title);
    } catch (error) {
      return <SomethingWentWrong title={title} />;
    }

    return (
      <Component
        title={title}
        hook={hook}
        outputProps={outputProps}
        {...props}
      />
    );
  };

  return WithSummary;
}

export default withSummary_HOC(Summary);
