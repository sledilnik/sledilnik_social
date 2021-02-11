import React from 'react';
import Post from './Post';
import { API_URL, API_PARAMS } from '../dicts/urlDict';
import useFetch from '../hooks/useFetch';

function HOS({ data, hasHeader, hasFooter }) {
  return <Post data={data} hasHeader={hasHeader} hasFooter={hasFooter} />;
}

function withHOS_HOC(Component) {
  return ({ hasHeader, hasFooter, ...props }) => {
    const hook = useFetch(API_URL.PATIENTS, API_PARAMS.PATIENTS);

    if (hook.isLoading) {
      return 'Loading....';
    }

    if (hook.data === null) {
      return 'Null';
    }

    const sortedData = [...hook.data].sort(
      (a, b) => b.dayFromStart - a.dayFromStart
    );

    const isNotDataMissing = sortedData.length > 1;
    const lastDayData = sortedData[0];
    const dayBeforeLastDateData = sortedData[1];

    // ? if data is correct we can use total.<key>.out and total.<key>.in to calculate dif
    // ? const icuDiff = lastDayData.total.<key>.out - lastDayData.total.<key>.in;
    // 1st
    const icuDiff =
      isNotDataMissing &&
      lastDayData.total.icu.today - dayBeforeLastDateData.total.icu.today;
    // 2nd
    const respiratoryTotal =
      lastDayData.total.critical.today + lastDayData.total.niv.today;
    const criticalDiff =
      isNotDataMissing &&
      lastDayData.total.critical.today -
        dayBeforeLastDateData.total.critical.today;
    const nivDiff =
      isNotDataMissing &&
      lastDayData.total.niv.today - dayBeforeLastDateData.total.niv.today;
    const dataProps = [
      [
        {
          prefix: 'Hospitalizirani: ',
          data: lastDayData.total.inHospital.today,
          suffix: ' ',
        },
        {
          prefix: '(',
          data: lastDayData.total.inHospital.in,
          suffix: ', ',
          formatType: 'sign',
        },
        {
          prefix: '',
          data: lastDayData.total.inHospital.out,
          suffix: '), ',
          formatType: 'sign',
          negative: true,
        },
        {
          prefix: 'EIT: ',
          data: lastDayData.total.icu.today,
          suffix: ' ',
        },
        {
          prefix: '(',
          data: icuDiff,
          suffix: ').',
          formatType: 'sign',
        },
      ],
      [
        { prefix: 'Na respiratorju: ', data: respiratoryTotal, suffix: ', ' },
        {
          prefix: 'intubirani: ',
          data: lastDayData.total.critical.today,
          suffix: ' ',
        },
        { prefix: '(', data: criticalDiff, suffix: '), ', formatType: 'sign' },
        {
          prefix: 'neinvazivno: ',
          data: lastDayData.total.niv.today,
          suffix: ' ',
        },
        { prefix: '(', data: nivDiff, suffix: ').', formatType: 'sign' },
      ],
      [
        {
          prefix: 'Negovalne bolnišnice: ',
          data: lastDayData.total.care.today,
          suffix: ' ',
        },
        {
          prefix: '( ',
          data: lastDayData.total.care.in,
          suffix: ', ',
          formatType: 'sign',
        },
        {
          prefix: '',
          data: lastDayData.total.care.out,
          suffix: ').',
          formatType: 'sign',
          negative: true,
        },
      ],
      [
        {
          prefix: 'Umrli: ',
          data: lastDayData.total.deceased.today,
          suffix: ', ',
          formatType: 'sign',
        },
        { prefix: 'skupaj: ', data: lastDayData.total.deceased.toDate },
      ],
    ];

    const newProps = { ...props, data: dataProps, hasHeader, hasFooter };

    return <Component {...newProps} />;
  };
}
export default withHOS_HOC(HOS);
