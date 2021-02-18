import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { SocialContext } from '../context/SocialContext';

import { formatNumber } from '../utils/formatNumber';
import { formatNumberWithSign } from './../utils/formatNumber';

import Output from './Output';
import { differenceInDays } from 'date-fns';
import { getDate } from '../utils/dates';

// path summary

const TextsDict = {
  FB: {
    default: {
      text1: 'Aktivni primeri: ',
      text2: ' ',
      text3: '.',
    },
  },
  TW: {
    default: {},
  },
};

const defaultTexts = TextsDict.FB.default;

const Brackets = ({ children }) => <>({children})</>;

function withActiveCases_HOC(Component) {
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
      subValues: { in: casesIn, out },
    } = hook.data.casesActive;

    const kindOfData = 'default';

    const newData = {
      value1: formatNumber(value),
      value2: (
        <Brackets>
          {formatNumberWithSign(casesIn)}, {formatNumberWithSign(-out)}
        </Brackets>
      ),
    };

    const wrongDate =
      differenceInDays(new Date(), getDate(hook.data.casesActive)) > 1;

    const newProps = {
      ...props,
      data: newData,
      social,
      kindOfData,
      defaultTexts,
      TextsDict,
      keyTitle: 'ActiveCases',
      wrongDate,
    };

    return <Component {...newProps} />;
  };
}
export default withActiveCases_HOC(Output);
