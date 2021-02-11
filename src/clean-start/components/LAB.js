import React from 'react';
import Post from './Post';
import { API_URL } from '../dicts/urlDict';
import useFetch from '../../hooks/useFetch';

function LAB({ data, hasHeader, hasFooter }) {
  return <Post data={data} hasHeader={hasHeader} hasFooter={hasFooter} />;
}

function withLAB_HOC(Component) {
  // casesActive, testsToday, testsTodayHat
  return ({ hasHeader, hasFooter, ...props }) => {
    const hook = useFetch(API_URL.SUMMARY);

    if (hook.isLoading) {
      return 'Loading....';
    }

    if (hook.data === null) {
      return 'Null';
    }

    const { casesActive, testsToday, testsTodayHAT } = hook.data;

    const dataProps = [
      [
        {
          prefix: 'PCR: ',
          data: testsToday.subValues.positive,
          suffix: ', ',
          formatType: 'sign',
        },
        { prefix: 'testiranih: ', data: testsToday.value, suffix: ', ' },
        {
          prefix: 'delež pozitivnih: ',
          data: testsToday.subValues.percent,
          suffix: '.',
          formatType: 'percent',
          divide: 100,
        },
      ],
      [
        {
          prefix: 'HAT: ',
          data: testsTodayHAT.subValues.positive,
          suffix: ', ',
          formatType: 'sign',
        },
        {
          prefix: 'testiranih: ',
          data: testsTodayHAT.value,
          suffix: ', ',
        },
        {
          prefix: 'delež pozitivnih: ',
          data: testsTodayHAT.subValues.percent,
          suffix: '.',
          formatType: 'percent',
          divide: 100,
        },
      ],
      [
        {
          prefix: 'Aktivni primeri: ',
          data: casesActive.value,
          suffix: ' ',
        },
        {
          prefix: '(',
          data: casesActive.subValues.in,
          suffix: ', ',
          formatType: 'sign',
        },
        {
          prefix: '',
          data: casesActive.subValues.out,
          suffix: ').',
          formatType: 'sign',
          negative: true,
        },
      ],
    ];

    const newProps = { ...props, data: dataProps, hasHeader, hasFooter };

    return <Component {...newProps} />;
  };
}
export default withLAB_HOC(LAB);
