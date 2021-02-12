import React, { useContext } from 'react';
import PresentData from './PresentData';

import { FBPatientsDict } from '../dicts/DataTranslateDict';
import { TWPatientsDict } from '../dicts/TwitterTranslateDict';

import getTranslatedData from '../utils/getTranslatedData';

import { DataContext } from '../context/DataContext';
import { SocialContext } from '../context/SocialContext';

// path patients
function Deceased({ data, ...props }) {
  const { social } = useContext(SocialContext);

  const DataTranslateDict =
    social === 'FB' ? FBPatientsDict.deceased : TWPatientsDict.deceased;
  const translatedData = getTranslatedData(DataTranslateDict, data);

  return <PresentData data={translatedData} props={props} />;
}

function withDeceasedHOC(Component) {
  return ({ ...props }) => {
    const { patients: hook } = useContext(DataContext);

    if (hook.isLoading) {
      return 'Loading....';
    }

    if (hook.data === null) {
      return 'Null';
    }

    const sortedData = [...hook.data].sort(
      (a, b) => b.dayFromStart - a.dayFromStart
    );

    const newProps = { ...props, data: sortedData };

    return <Component {...newProps} />;
  };
}
export default withDeceasedHOC(Deceased);
