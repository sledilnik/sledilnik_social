import React, { useContext } from 'react';
import { differenceInDays } from 'date-fns/';

import { DataContext } from 'context/DataContext';

import { getDate } from 'utils/dates';
import { formatNumber, formatNumberWithSign } from 'utils/formatNumber';

import Output from 'components/Shared/Output';
import SomethingWentWrong from 'components/Shared/SomethingWentWrong';
import FetchBoundary from './Shared/FetchBoundary';

import PatientsData from 'dicts/PatientsDataDict';

function Patients({ hook, title, outputProps, ...props }) {
  return (
    <FetchBoundary hook={hook} title={title} {...props}>
      <Output keyTitle={title} {...outputProps} />
    </FetchBoundary>
  );
}

const getValues = (data, field) => {
  if (field === 'hospitalized') {
    const { inHospital, icu } = data[0].total;
    const { icu: beforeIcu } = data[1].total;
    return [
      inHospital.today,
      [inHospital.in, inHospital.out],
      icu.today,
      icu.today - beforeIcu.today,
    ];
  }

  if (field === 'onRespiratory') {
    const { critical, niv } = data[0].total;
    const { critical: beforeCritical, niv: beforeNiv } = data[1].total;
    return [
      critical.today + niv.today,
      critical.today,
      critical.today - beforeCritical.today,
      niv.today,
      niv.today - beforeNiv.today,
    ];
  }

  if (field === 'care') {
    const { care } = data[0].total;
    return [care.today, [care.in, care.out]];
  }

  if (field === 'deceased') {
    const { deceased } = data[0].total;
    return [deceased.today, deceased.toDate];
  }
};

const getFormattedValues = (type, values) => {
  if (type === 'twoBracketsLastSingle')
    return {
      value1: formatNumber(values[0]),
      value2: `(${formatNumberWithSign(values[1][0])}, ${formatNumberWithSign(
        -values[1][1]
      )})`,
      value3: formatNumber(values[2]),
      value4: `(${formatNumberWithSign(values[3])})`,
    };

  if (type === 'twoSingleBrackets') {
    return {
      value1: formatNumber(values[0]),
      value2: formatNumber(values[1]),
      value3: `(${formatNumberWithSign(values[2])})`,
      value4: formatNumber(values[3]),
      value5: `(${formatNumberWithSign(values[4])})`,
    };
  }

  if (type === 'bracketsInOut') {
    return {
      value1: formatNumber(values[0]),
      value2: `(${formatNumberWithSign(values[1][0])}, ${formatNumberWithSign(
        -values[1][1]
      )})`,
    };
  }

  if (type === 'twoFirstWithSign') {
    return {
      value1: formatNumberWithSign(values[0]),
      value2: formatNumber(values[1]),
    };
  }
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

const isDaysDiffGreater = (date, compare) => {
  if (date && isNaN(date.getTime())) {
    throw new Error('Invalid Date');
  }
  return differenceInDays(new Date(), date) > compare;
};

const getOutputProps = (data, title) => {
  const { field, types, mandatoryProperties } = PatientsData[title];
  const values = getValues(data, field);
  const type = getValuesType(types, mandatoryProperties, values);
  const formattedValues = getFormattedValues(type, values);
  const DAYS_DIFFERENCE = 0;

  const textsType = type === types.default ? 'default' : 'onlyValue';

  return {
    kindOfData: textsType,
    data: formattedValues,
    isWrongDate: isDaysDiffGreater(getDate(data[0]), DAYS_DIFFERENCE),
  };
};

function withPatientsHOC(Component) {
  const WithPatients = ({ title, ...props }) => {
    const { patients: hook } = useContext(DataContext);
    const sortedData =
      hook.data &&
      [...hook.data].sort((a, b) => b.dayFromStart - a.dayFromStart);

    let outputProps;
    try {
      outputProps = sortedData && getOutputProps(sortedData, title);
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
  return WithPatients;
}
export default withPatientsHOC(Patients);
