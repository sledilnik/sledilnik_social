import React from 'react';
import PresentData from './PresentData';
import { API_URL } from '../dicts/urlDict';
import useFetch from '../hooks/useFetch';
import { summaryDict } from './dataDict';
import getTranslatedData from '../utils/getTranslatedData';

// path summary
const dataDict = summaryDict.casesActive;

function ActiveCases({ data, ...props }) {
  const translatedData = getTranslatedData(dataDict, data);

  return <PresentData data={translatedData} props={props} />;
}

function withActiveCases_HOC(Component) {
  return ({ ...props }) => {
    const hook = useFetch(API_URL.SUMMARY);

    if (hook.isLoading) {
      return 'Loading....';
    }

    if (hook.data === null) {
      return 'Null';
    }

    const { casesActive } = hook.data;

    const newProps = { ...props, data: casesActive };

    return <Component {...newProps} />;
  };
}
export default withActiveCases_HOC(ActiveCases);
