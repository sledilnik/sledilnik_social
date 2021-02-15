import React, { useContext } from 'react';
import PresentData from './PresentData';

import getTranslatedData from '../utils/getTranslatedData';

import { DataContext } from '../context/DataContext';
import { SocialContext } from '../context/SocialContext';

import { FBSummaryDict } from '../dicts/DataTranslateDict';
import { TWSummaryDict } from '../dicts/TwitterTranslateDict';

// path summary
function HAT({ data, ...props }) {
  const subValuesNotExists = Object.keys(data.subValues).length === 0;

  const DataTranslateDict = subValuesNotExists
    ? FBSummaryDict.noSubValues.testsTodayHAT
    : props.social === 'FB'
    ? FBSummaryDict.testsTodayHAT
    : TWSummaryDict.testsTodayHAT;

  const translatedData = getTranslatedData(DataTranslateDict, data);

  return <PresentData data={translatedData} props={props} />;
}

function withHAT_HOC(Component) {
  return ({ ...props }) => {
    const { summary: hook } = useContext(DataContext);
    const { social } = useContext(SocialContext);

    if (hook.isLoading) {
      return 'Loading....';
    }

    if (hook.data === null) {
      return 'Null';
    }

    const { testsTodayHAT } = hook.data;

    const newProps = { ...props, data: testsTodayHAT, social };

    return <Component {...newProps} />;
  };
}
export default withHAT_HOC(HAT);
