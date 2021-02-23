import React, { useContext } from 'react';

import { DataContext } from '../context/DataContext';
import { SocialContext } from '../context/SocialContext';

import {
  formatNumber,
  formatNumberWithSign,
  formatPercentage,
} from '../utils/formatNumber';

import Output from './Output';
import { differenceInDays } from 'date-fns';
import { getDate } from '../utils/dates';
import FetchBoundary from './FetchBoundary';

const TextsDict = {
  FB: {
    default: {
      text1: 'HAT: ',
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

const getHATData = data => {
  const {
    value,
    subValues: { positive, percent },
  } = data.testsTodayHAT;

  const kindOfData = value && !!positive && !!percent ? 'default' : 'onlyValue';

  const newData =
    kindOfData === 'default'
      ? {
          value1: formatNumberWithSign(positive),
          value2: formatNumber(value),
          value3: formatPercentage(percent / 100),
        }
      : { value1: formatNumber(value) };

  const wrongDate =
    differenceInDays(new Date(), getDate(data.testsTodayHAT)) > 1;

  return { data: newData, kindOfData, wrongDate };
};

function HAT({ hook, outputProps, ...props }) {
  return (
    <FetchBoundary hook={hook}>
      <Output {...outputProps} />
    </FetchBoundary>
  );
}

function withHAT_HOC(Component) {
  const WithHAT = ({ ...props }) => {
    const { summary: hook } = useContext(DataContext);
    const { social } = useContext(SocialContext);
    const data = hook.data && getHATData(hook.data);

    const outputProps = {
      social,
      ...data,
      defaultTexts,
      TextsDict,
      keyTitle: 'PCR',
    };

    return <Component hook={hook} outputProps={outputProps} {...props} />;
  };
  return WithHAT;
}
export default withHAT_HOC(HAT);
