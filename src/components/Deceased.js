import React, { useContext } from 'react';
import PresentData from './PresentData';
import { patients } from '../dicts/DataTranslateDict';
import getTranslatedData from '../utils/getTranslatedData';
import { DataContext } from '../context/DataContext';

// path patients
const DataTranslateDict = patients.deceased;

function Deceased({ data, ...props }) {
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
