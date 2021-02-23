import React, { useContext } from 'react';

import { DataContext } from '../context/DataContext';
import { SocialContext } from './../context/SocialContext';

import { formatNumberWithSign, formatNumber } from '../utils/formatNumber';

import Output from './Output';
import { differenceInDays } from 'date-fns';
import { getDate } from '../utils/dates';
import FetchBoundary from './FetchBoundary';

// path patients

const TextsDict = {
  FB: {
    default: {
      text1: 'Hospitalizirani: ',
      text2: ' ',
      text3: ', EIT: ',
      text4: ' ',
      text5: '.',
    },
    onlyValue: {},
  },
  TW: {
    default: { text2: '', text4: '' },
    onValue: {},
  },
};

const defaultTexts = TextsDict.FB.default;

const Brackets = ({ children }) => <>({children})</>;

const getHospitalizedData = data => {
  const sortedData = [...data].sort((a, b) => b.dayFromStart - a.dayFromStart);

  const kindOfData = 'default';

  const newData = {
    value1: formatNumber(sortedData[0].total.inHospital.today),
    value2: (
      <Brackets>
        {formatNumberWithSign(sortedData[0].total.inHospital.in)},{' '}
        {formatNumberWithSign(-sortedData[0].total.inHospital.out)}
      </Brackets>
    ),
    value3: formatNumber(sortedData[0].total.icu.today),
    value4: (
      <Brackets>
        {formatNumberWithSign(sortedData[0].total.inHospital.today) -
          sortedData[1].total.inHospital.today}
      </Brackets>
    ),
  };

  const wrongDate = differenceInDays(new Date(), getDate(sortedData[0])) > 0;

  return { data: newData, kindOfData, wrongDate };
};

function Hospitalized({ hook, outputProps, ...props }) {
  return (
    <FetchBoundary hook={hook}>
      <Output {...outputProps} />
    </FetchBoundary>
  );
}

function withHospitalizedHOC(Component) {
  const WithHospitalized = ({ ...props }) => {
    const { patients: hook } = useContext(DataContext);
    const { social } = useContext(SocialContext);
    const data = hook.data && getHospitalizedData(hook.data);

    const outputProps = {
      social,
      ...data,
      defaultTexts,
      TextsDict,
      keyTitle: 'Hospitalized',
    };

    return <Component hook={hook} outputProps={outputProps} {...props} />;
  };
  return WithHospitalized;
}
export default withHospitalizedHOC(Hospitalized);
