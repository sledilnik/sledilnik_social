import React, { useContext } from 'react';

import { DataContext } from '../context/DataContext';
import { SocialContext } from '../context/SocialContext';

import { formatNumber } from '../utils/formatNumber';

import Output from './Output';

// path summary

const TextsDict = {
  FB: {
    default: {
      text1: 'Skupaj: ',
      text2: '',
      text3: ' potrjenih primerov.',
    },
    onlyValue: {},
  },
  TW: {
    default: {},
    onValue: {},
  },
};

const defaultTexts = TextsDict.FB.default;

function withConfirmedToDate_HOC(Component) {
  return ({ ...props }) => {
    const { summary: hook } = useContext(DataContext);
    const { social } = useContext(SocialContext);

    if (hook.isLoading) {
      return 'Loading....';
    }

    if (hook.data === null) {
      return 'Null';
    }

    const { casesToDateSummary } = hook.data;

    const kindOfData = 'default';

    const newData = {
      value1: formatNumber(casesToDateSummary.value),
    };

    const newProps = {
      ...props,
      data: newData,
      social,
      kindOfData,
      defaultTexts,
      TextsDict,
      keyTitle: 'ConfirmedToDate',
    };

    return <Component {...newProps} />;
  };
}
export default withConfirmedToDate_HOC(Output);
