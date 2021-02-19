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

function withHAT_HOC(Component) {
  const HAT = ({ ...props }) => {
    const { summary: hook } = useContext(DataContext);
    const { social } = useContext(SocialContext);

    if (hook.isLoading) {
      return 'Loading....';
    }

    if (hook.data === null) {
      return 'Null';
    }

    const {
      value,
      subValues: { positive, percent },
    } = hook.data.testsTodayHAT;

    const kindOfData =
      value && !!positive && !!percent ? 'default' : 'onlyValue';

    const newData =
      kindOfData === 'default'
        ? {
            value1: formatNumberWithSign(positive),
            value2: formatNumber(value),
            value3: formatPercentage(percent / 100),
          }
        : { value1: formatNumber(value) };

    const wrongDate =
      differenceInDays(new Date(), getDate(hook.data.testsTodayHAT)) > 1;

    const newProps = {
      ...props,
      data: newData,
      social,
      kindOfData,
      defaultTexts,
      TextsDict,
      keyTitle: 'HAT',
      wrongDate,
    };

    return <Component {...newProps} />;
  };
  return HAT;
}
export default withHAT_HOC(Output);
