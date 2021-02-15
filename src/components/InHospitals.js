import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import PresentData from './PresentData';
import { FBPatientsDict } from '../dicts/DataTranslateDict';
import getTranslatedData from '../utils/getTranslatedData';

function InHospital({ hospShort, data }) {
  const DataTranslateDict = FBPatientsDict.inHospital;
  const translatedData = getTranslatedData(DataTranslateDict, data);

  return (
    <li key={hospShort}>
      <PresentData data={translatedData} noArrow={true} />
    </li>
  );
}

function InHospitals({ perHospitalChanges }) {
  const sortDescByPatients = (a, b) =>
    (b[1].inHospital.today || 0) - (a[1].inHospital.today || 0);

  const createHospitalOutput = hosp => {
    const { inHospital, icu } = hosp[1];

    const noHospitalData = hosp[1].inHospital.today === undefined;

    return noHospitalData ? (
      ''
    ) : (
      <InHospital
        key={hosp[0]}
        hospShort={hosp[0]}
        data={{
          hospitalName: hosp[2],
          inHospital,
          icu,
          translateText: 'oseba',
        }}
      />
    );
  };

  const hospitalOutput = perHospitalChanges
    .sort(sortDescByPatients)
    .map(createHospitalOutput);

  const DataTranslateDict = FBPatientsDict.inHospitals;
  const translatedData = getTranslatedData(DataTranslateDict);

  return (
    <div>
      <PresentData data={translatedData} />
      <ul>{hospitalOutput}</ul>
    </div>
  );
}

function withInHospitalsHOC(Component) {
  return ({ props }) => {
    const { patients: hookPatients, hospitalsList: hookHospitals } = useContext(
      DataContext
    );

    const isLoading = hookPatients.isLoading || hookHospitals.isLoading;

    if (isLoading) {
      return 'Loading....';
    }

    const isDataNull =
      hookPatients.data === null || hookHospitals.data === null;
    if (isDataNull) {
      return 'Null';
    }

    const { perHospitalChanges } = getInHospitalsData(
      hookHospitals.data,
      hookPatients.data
    );

    const newProps = {
      ...props,
      perHospitalChanges,
    };

    return <Component {...newProps} />;
  };
}
export default withInHospitalsHOC(InHospitals);

const getInHospitalsData = (hospitalsList, patients) => {
  if (hospitalsList === null || patients === null) {
    return {
      perHospitalChanges: null,
      css: {
        check_patients: null,
      },
    };
  }

  // {code: 'xxx', name: 'yyy', uri: 'zzz} -> [['xxx', 'zzz]] [[<code>,<name>]]
  const hospitalsDict = prepareHospitalsDict(hospitalsList);

  // prepare perHospitalChanges
  const perHospitalChanges = getPerHospitalChanges(patients);
  const perHospitalChangesWithLongName = findAndPushLongHospitalName(
    perHospitalChanges,
    hospitalsDict
  );

  return {
    perHospitalChanges: perHospitalChangesWithLongName,
  };
};

const isUndefined = val => val === undefined;

// prepare hospitalsDict
function prepareHospitalsDict(hospitalsList) {
  return hospitalsList.map(hospital => [hospital.code, hospital.name]);
}

// prepare perHospitalChanges
// -> [["ukclj", {care: {...}, critical: {..}, deceased: {...},deceasedCare: {...}, icu: {...}, inHospital: {...}, niv: {...} }],...]
// properties of interest icu & inHospital
function getPerHospitalChanges(patients) {
  const patientsData = patients.slice(-1).pop();
  const patientsDataIsNotUndefined = !isUndefined(patientsData);
  return patientsDataIsNotUndefined && Object.entries(patientsData.facilities);
}

// -> [["ukclj", {...}, "UKC Ljubljana"],... ]
function findAndPushLongHospitalName(perHospitalChanges, hospitalsDict) {
  return perHospitalChanges.map(hospital => {
    const hospitalLongName = hospitalsDict.filter(
      item => hospital[0] === item[0]
    )[0][1];
    return [...hospital, hospitalLongName];
  });
}
