import React, { useContext } from 'react';
import PresentData from './PresentData';

import getTranslatedData from '../utils/getTranslatedData';

import { DataContext } from '../context/DataContext';
import { SocialContext } from '../context/SocialContext';

import { FBSummaryDict } from '../dicts/DataTranslateDict';
import { TWSummaryDict } from '../dicts/TwitterTranslateDict';

// path summary
function PCR({ data, ...props }) {
  const DataTranslateDict =
    props.social === 'FB' ? FBSummaryDict.testsToday : TWSummaryDict.testsToday;
  const translatedData = getTranslatedData(DataTranslateDict, data);

  return <PresentData data={translatedData} props={props} />;
}

function withPCR_HOC(Component) {
  return ({ ...props }) => {
    const { summary: hook } = useContext(DataContext);
    const { social } = useContext(SocialContext);

    if (hook.isLoading) {
      return 'Loading....';
    }

    if (hook.data === null) {
      return 'Null';
    }

    const { testsToday } = hook.data;

    const newProps = { ...props, data: testsToday, social };

    return <Component {...newProps} />;
  };
}
export default withPCR_HOC(PCR);
