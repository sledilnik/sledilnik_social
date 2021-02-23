import React, { useContext } from 'react';
import { differenceInDays } from 'date-fns/';
import { getDate } from '../utils/dates';

import { DataContext } from '../context/DataContext';
import { SocialContext } from '../context/SocialContext';

import {
  formatNumberWithSign,
  formatNumber,
  formatPercentage,
} from '../utils/formatNumber';

import Output from './Output';
import FetchBoundary from './FetchBoundary';

const TextsDict = {
  FB: {
    default: {
      text1: 'PCR: ',
      text2: ', testiranih: ',
      text3: ', delež pozitivnih: ',
      text4: '.',
    },
    onlyValue: {
      text2: ' testiranih (*ni podatka o pozitivnih).',
      text3: '',
      text4: '',
    },
  },
  TW: {
    default: { text4: '' },
    onValue: {},
  },
};

const defaultTexts = TextsDict.FB.default;

const getPCRData = data => {
  const {
    value,
    subValues: { positive, percent },
  } = data.testsToday;

  const kindOfData = value && !!positive && !!percent ? 'default' : 'onlyValue';

  const newData =
    kindOfData === 'default'
      ? {
          value1: formatNumberWithSign(positive),
          value2: formatNumber(value),
          value3: formatPercentage(percent / 100),
        }
      : { value1: formatNumber(value) };

  const isWrongDate =
    differenceInDays(new Date(), getDate(data.testsToday)) > 1;

  return { data: newData, kindOfData, isWrongDate };
};

function PCR({ hook, outputProps, ...props }) {
  return (
    <FetchBoundary hook={hook}>
      <Output {...outputProps} />
    </FetchBoundary>
  );
}

function withPCR_HOC(Component) {
  const WithPCR = ({ ...props }) => {
    const { summary: hook } = useContext(DataContext);
    const { social } = useContext(SocialContext);
    const data = hook.data && getPCRData(hook.data);

    const outputProps = {
      social,
      ...data,
      defaultTexts,
      TextsDict,
      keyTitle: 'PCR',
    };

    return <Component hook={hook} outputProps={outputProps} {...props} />;
  };

  return WithPCR;
}

export default withPCR_HOC(PCR);
