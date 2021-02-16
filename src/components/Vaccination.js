import React, { useContext } from 'react';

import { DataContext } from '../context/DataContext';
import { SocialContext } from '../context/SocialContext';

import { formatNumber } from '../utils/formatNumber';

import Output from './Output';

// path summary

const TextsDict = {
  FB: {
    default: {
      text1: 'Cepljenih oseb: 💉',
      text2: ', 💉💉',
      text3: '.',
    },
    onlyValue: {},
  },
  TW: {
    default: {},
    onValue: {},
  },
};

const defaultTexts = TextsDict.FB.default;

function withVaccination_HOC(Component) {
  return ({ ...props }) => {
    const { summary: hook } = useContext(DataContext);
    const { social } = useContext(SocialContext);

    if (hook.isLoading) {
      return 'Loading....';
    }

    if (hook.data === null) {
      return 'Null';
    }

    const { vaccinationSummary } = hook.data;

    const kindOfData = 'default';

    const newData = {
      value1: formatNumber(vaccinationSummary.value),
      value2: formatNumber(vaccinationSummary.subValues.in),
    };

    const newProps = {
      ...props,
      data: newData,
      social,
      kindOfData,
      defaultTexts,
      TextsDict,
      keyTitle: 'ActiveCases',
    };

    return <Component {...newProps} />;
  };
}
export default withVaccination_HOC(Output);
