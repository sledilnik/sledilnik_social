import React, { useContext } from 'react';
import PresentData from './PresentData';
import { summaryDict } from './dataDict';
import getTranslatedData from '../utils/getTranslatedData';
import { DataContext } from '../context/DataContext';

// path summary
const dataDict = summaryDict.casesToDateSummary;

function ConfirmedToDate({ data, ...props }) {
  const translatedData = getTranslatedData(dataDict, data);

  return <PresentData data={translatedData} props={props} />;
}

function withConfirmedToDate_HOC(Component) {
  return ({ ...props }) => {
    const { summary: hook } = useContext(DataContext);

    if (hook.isLoading) {
      return 'Loading....';
    }

    if (hook.data === null) {
      return 'Null';
    }

    const { casesToDateSummary } = hook.data;

    const newProps = { ...props, data: casesToDateSummary };

    return <Component {...newProps} />;
  };
}
export default withConfirmedToDate_HOC(ConfirmedToDate);
