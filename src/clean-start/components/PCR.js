import React from 'react';
import PresentData from './PresentData';
import useFetch from '../../hooks/useFetch';
import { API_URL } from '../dicts/urlDict';

// path summary
const dataDict = [
  {
    prefix: 'PCR: ',
    data: ['subValues', 'positive'],
    suffix: ', ',
    formatType: 'sign',
  },
  { prefix: 'testiranih: ', data: ['value'], suffix: ', ' },
  {
    prefix: 'delež pozitivnih: ',
    dataKeys: ['subValues', 'percent'],
    suffix: '.',
    formatType: 'percent',
    divide: 100,
  },
];

function PCR({ data, ...props }) {
  const dataTranslate = dataDict.map(item => {
    const getValue = (dataItem, keys) => {
      if (keys.length > 1)
        return getValue(dataItem[keys[0]], keys.slice(1, keys.length));
      return dataItem[keys[0]];
    };

    const value = getValue(data, item.dataKeys);
    return { ...item, data: value };
  });

  return <PresentData data={dataTranslate} props={props} />;
}

function withPCR_HOC(Component) {
  return ({ ...props }) => {
    const hook = useFetch(API_URL.SUMMARY);

    if (hook.isLoading) {
      return 'Loading....';
    }

    if (hook.data === null) {
      return 'Null';
    }

    const { testsToday } = hook.data;

    const newProps = { ...props, data: testsToday };

    return <Component {...newProps} />;
  };
}
export default withPCR_HOC(PCR);
