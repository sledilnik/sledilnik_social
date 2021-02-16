import React, { useContext } from 'react';

import { DataContext } from '../context/DataContext';
import { SocialContext } from '../context/SocialContext';

import {
  formatNumberWithSign,
  formatNumber,
  formatPercentage,
} from '../utils/formatNumber';

import Output from './Output';

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

function withPCR_HOC(Component) {
  return ({ ...props }) => {
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
    } = hook.data.testsToday;

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

    const newProps = {
      ...props,
      data: newData,
      social,
      kindOfData,
      defaultTexts,
      TextsDict,
      keyTitle: 'PCR',
    };
    return <Component {...newProps} />;
  };
}
export default withPCR_HOC(Output);
