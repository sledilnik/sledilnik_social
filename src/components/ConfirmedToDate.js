import React, { useContext } from 'react';
import { differenceInDays } from 'date-fns';

import { DataContext } from '../context/DataContext';
import { SocialContext } from '../context/SocialContext';

import { formatNumber } from '../utils/formatNumber';
import { getDate } from '../utils/dates';

import Output from './Output';
import FetchBoundary from './FetchBoundary';

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

const getConfirmedToDateData = data => {
  const { value } = data.casesToDateSummary;
  const kindOfData = 'default';
  const newData = {
    value1: formatNumber(value),
  };
  const wrongDate =
    differenceInDays(new Date(), getDate(data.casesToDateSummary)) > 1;

  return { data: newData, kindOfData, wrongDate };
};

function ConfirmedToData({ hook, outputProps, ...props }) {
  return (
    <FetchBoundary hook={hook}>
      <Output {...outputProps} />
    </FetchBoundary>
  );
}

function withConfirmedToDate_HOC(Component) {
  const WithConfirmedToDate = ({ ...props }) => {
    const { summary: hook } = useContext(DataContext);
    const { social } = useContext(SocialContext);
    const data = hook.data && getConfirmedToDateData(hook.data);

    const outputProps = {
      social,
      ...data,
      defaultTexts,
      TextsDict,
      keyTitle: 'Vaccination',
    };

    return <Component hook={hook} outputProps={outputProps} {...props} />;
  };
  return WithConfirmedToDate;
}
export default withConfirmedToDate_HOC(ConfirmedToData);
