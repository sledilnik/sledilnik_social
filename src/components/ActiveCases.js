import React, { useContext } from 'react';
import PresentData from './PresentData';
import { FBSummaryDict } from '../dicts/DataTranslateDict';
import getTranslatedData from '../utils/getTranslatedData';
import { DataContext } from '../context/DataContext';

// path summary
const DataTranslateDict = FBSummaryDict.casesActive;

function ActiveCases({ data, ...props }) {
  const translatedData = getTranslatedData(DataTranslateDict, data);

  return <PresentData data={translatedData} props={props} />;
}

function withActiveCases_HOC(Component) {
  return ({ ...props }) => {
    const { summary: hook } = useContext(DataContext);

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
