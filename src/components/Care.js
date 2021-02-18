import React, { useContext } from 'react';
import { differenceInDays } from 'date-fns';
import { getDate } from '../utils/dates';

import { DataContext } from '../context/DataContext';
import { SocialContext } from '../context/SocialContext';

import { formatNumber, formatNumberWithSign } from '../utils/formatNumber';

import Output from './Output';

// path patients

const TextsDict = {
  FB: {
    default: {
      text1: 'Negovalne bolnišnice: ',
      text2: ' ',
      text3: '.',
    },
    onlyValue: {},
  },
  TW: {
    default: {
      text1: 'Negovalne b.: ',
    },
    onValue: {},
  },
};

const defaultTexts = TextsDict.FB.default;

const Brackets = ({ children }) => <>({children})</>;

function withCareHOC(Component) {
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
      value1: formatNumber(sortedData[0].total.care.today),
      value2: (
        <Brackets>
          {formatNumberWithSign(sortedData[0].total.care.in)},{' '}
          {formatNumberWithSign(-sortedData[0].total.care.out)}
        </Brackets>
      ),
    };

    const wrongDate = differenceInDays(new Date(), getDate(sortedData[0])) > 0;

    const newProps = {
      ...props,
      data: newData,
      social,
      kindOfData,
      defaultTexts,
      TextsDict,
      keyTitle: 'Care',
      wrongDate,
    };

    return <Component {...newProps} />;
  };
}
export default withCareHOC(Output);
