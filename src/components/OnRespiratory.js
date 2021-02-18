import React, { useContext } from 'react';
import { differenceInDays } from 'date-fns';
import { getDate } from '../utils/dates';

import { DataContext } from '../context/DataContext';
import { SocialContext } from '../context/SocialContext';

import { formatNumber } from '../utils/formatNumber';

import Output from './Output';
import { formatNumberWithSign } from './../utils/formatNumber';

// path patients

const TextsDict = {
  FB: {
    default: {
      text1: 'Na respiratorju: ',
      text2: ', intubirani: ',
      text3: ' ',
      text4: ', neinvazivno: ',
      text5: ' ',
      text6: '.',
    },
    onlyValue: {},
  },
  TW: {
    default: {
      text1: 'Respirator: ',
      text2: ' intubirani ',
      text3: '',
      text4: ' neinvazivno ',
      text5: '',
    },
    onValue: {},
  },
};

const defaultTexts = TextsDict.FB.default;

function withOnRespiratoryHOC(Component) {
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
      value1: formatNumber(
        sortedData[0].total.critical.today + sortedData[0].total.niv.today
      ),
      value2: formatNumber(sortedData[0].total.critical.today),
      value3: `(${formatNumberWithSign(
        sortedData[0].total.critical.today - sortedData[1].total.critical.today
      )})`,
      value4: formatNumber(sortedData[0].total.niv.today),
      value5: `(${formatNumberWithSign(
        sortedData[0].total.niv.today - sortedData[1].total.niv.today
      )})`,
    };

    const wrongDate = differenceInDays(new Date(), getDate(sortedData[0])) > 0;

    const newProps = {
      ...props,
      data: newData,
      social,
      kindOfData,
      defaultTexts,
      TextsDict,
      keyTitle: 'OnRespiratory',
      wrongDate,
    };

    return <Component {...newProps} />;
  };
}
export default withOnRespiratoryHOC(Output);
