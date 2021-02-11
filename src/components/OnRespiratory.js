import React from 'react';
import PresentData from './PresentData';
import { API_URL, API_PARAMS } from '../dicts/urlDict';
import useFetch from '../hooks/useFetch';
import { patients } from './dataDict';
import getTranslatedData from '../utils/getTranslatedData';

// path patients
const dataDict = patients.onRespiratory;

function OnRespiratory({ data, ...props }) {
  const translatedData = getTranslatedData(dataDict, data);

  return <PresentData data={translatedData} props={props} />;
}

function withOnRespiratoryHOC(Component) {
  return ({ ...props }) => {
    const hook = useFetch(API_URL.PATIENTS, API_PARAMS.PATIENTS);

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
export default withOnRespiratoryHOC(OnRespiratory);
