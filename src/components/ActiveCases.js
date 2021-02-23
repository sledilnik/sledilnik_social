import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { SocialContext } from '../context/SocialContext';

import { formatNumber } from '../utils/formatNumber';
import { formatNumberWithSign } from './../utils/formatNumber';

import Output from './Output';
import { differenceInDays } from 'date-fns';
import { getDate } from '../utils/dates';
import FetchBoundary from './FetchBoundary';

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

const getActiveCasesData = data => {
  const {
    value,
    subValues: { in: casesIn, out },
  } = data.casesActive;
  const kindOfData = 'default';
  const newData = {
    value1: formatNumber(value),
    value2: (
      <Brackets>
        {formatNumberWithSign(casesIn)}, {formatNumberWithSign(-out)}
      </Brackets>
    ),
  };
  const wrongDate = differenceInDays(new Date(), getDate(data.casesActive)) > 1;

  return { data: newData, kindOfData, wrongDate };
};

function ActiveCases({ hook, outputProps, ...props }) {
  return (
    <FetchBoundary hook={hook}>
      <Output {...outputProps} />
    </FetchBoundary>
  );
}

function withActiveCases_HOC(Component) {
  const WithActiveCases = ({ ...props }) => {
    const { summary: hook } = useContext(DataContext);
    const { social } = useContext(SocialContext);
    const data = hook.data && getActiveCasesData(hook.data);

    const outputProps = {
      social,
      ...data,
      defaultTexts,
      TextsDict,
      keyTitle: 'ActiveCases',
    };

    return <Component hook={hook} outputProps={outputProps} {...props} />;
  };

  return WithActiveCases;
}
export default withActiveCases_HOC(ActiveCases);
