import React, { useContext } from 'react';
import { differenceInDays } from 'date-fns';
import { getDate } from '../utils/dates';

import { DataContext } from '../context/DataContext';
import { SocialContext } from '../context/SocialContext';

import { formatNumberWithSign, formatNumber } from '../utils/formatNumber';

import Output from './Output';

// path patients

const TextsDict = {
  FB: {
    default: {
      text1: 'Umrli: ',
      text2: ', skupaj: ',
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

function withDeceasedHOC(Component) {
  return ({ ...props }) => {
    const { patients: hook } = useContext(DataContext);
    const { social } = useContext(SocialContext);

    if (hook.isLoading) {
      return 'Loading....';
    }

    if (hook.data === null) {
      return 'Null';
    }

    const sortedData = [...hook.data].sort(
      (a, b) => b.dayFromStart - a.dayFromStart
    );

    const kindOfData = 'default';

    const newData = {
      value1: formatNumberWithSign(sortedData[0].total.deceased.today),
      value2: formatNumber(sortedData[0].total.deceased.toDate),
    };

    const wrongDate = differenceInDays(new Date(), getDate(sortedData[0])) > 0;

    const newProps = {
      ...props,
      data: newData,
      social,
      kindOfData,
      defaultTexts,
      TextsDict,
      keyTitle: 'Deceased',
      wrongDate,
    };

    return <Component {...newProps} />;
  };
}
export default withDeceasedHOC(Output);
