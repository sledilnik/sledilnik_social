import React, { useContext } from 'react';
import PresentData from './PresentData';

import { FBPatientsDict } from '../dicts/DataTranslateDict';
import { TWPatientsDict } from './../dicts/TwitterTranslateDict';

import getTranslatedData from '../utils/getTranslatedData';

import { DataContext } from '../context/DataContext';
import { SocialContext } from './../context/SocialContext';

// path patients

function Hospitalized({ data, ...props }) {
  const { social } = useContext(SocialContext);

  const DataTranslateDict =
    social === 'FB' ? FBPatientsDict.hospitalized : TWPatientsDict.hospitalized;
  const translatedData = getTranslatedData(DataTranslateDict, data);

  return <PresentData data={translatedData} props={props} />;
}

function withHospitalizedHOC(Component) {
  return ({ ...props }) => {
    const { patients } = useContext(DataContext);

    if (patients.isLoading) {
      return 'Loading....';
    }

    if (patients.data === null) {
      return 'Null';
    }

    const sortedData = [...patients.data].sort(
      (a, b) => b.dayFromStart - a.dayFromStart
    );

    const newProps = { ...props, data: sortedData };

    return <Component {...newProps} />;
  };
}
export default withHospitalizedHOC(Hospitalized);
