import React from 'react';
import PresentData from './PresentData';
import { API_URL } from '../dicts/urlDict';
import useFetch from '../hooks/useFetch';
import { summaryDict } from './dataDict';
import getTranslatedData from '../utils/getTranslatedData';

// path summary
const dataDict = summaryDict.testsTodayHAT;

function HAT({ data, ...props }) {
  const translatedData = getTranslatedData(dataDict, data);

  return <PresentData data={translatedData} props={props} />;
}

function withHAT_HOC(Component) {
  return ({ ...props }) => {
    const hook = useFetch(API_URL.SUMMARY);

    if (hook.isLoading) {
      return 'Loading....';
    }

    if (hook.data === null) {
      return 'Null';
    }

    const { testsTodayHAT } = hook.data;

    const newProps = { ...props, data: testsTodayHAT };

    return <Component {...newProps} />;
  };
}
export default withHAT_HOC(HAT);
