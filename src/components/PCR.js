import React from 'react';
import PresentData from './PresentData';
import { API_URL } from '../dicts/urlDict';
import useFetch from '../hooks/useFetch';
import { summaryDict } from './dataDict';
import getTranslatedData from '../utils/getTranslatedData';

// path summary
const dataDict = summaryDict.testsToday;

function PCR({ data, ...props }) {
  const translatedData = getTranslatedData(dataDict, data);

  return <PresentData data={translatedData} props={props} />;
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
