import React, { useContext } from 'react';
import { differenceInDays } from 'date-fns';

import { DataContext } from '../context/DataContext';

import { formatNumber, formatNumberWithSign } from '../utils/formatNumber';
import { getDate } from '../utils/dates';

import DataRow from './DataRow';
import InHospital from './InHospital';

const dictionary = {
  oseba: ['oseba', 'osebi', 'osebe', 'osebe', 'oseb'],
};

const getTranslate = (num, text) => {
  const dict = dictionary[text];
  const index = num > 5 ? 5 : num;
  return dict[index - 1];
};

function InHospitals({ perHospitalChanges, wrongDate }) {
  const sortDescByPatients = (a, b) =>
    (b[1].inHospital.today || 0) - (a[1].inHospital.today || 0);

  const createHospitalOutput = hosp => {
    const { inHospital, icu } = hosp[1];

    // we want to display property 'out' as negative number
    const negHospOut = -inHospital.out;
    const negIcuOut = -icu.out;

    const formattedInHospital = {
      number: isNaN(inHospital.today) ? '-' : formatNumber(inHospital.today),
      in: isNaN(inHospital.in) ? '-' : formatNumberWithSign(inHospital.in),
      out: isNaN(negHospOut) ? '-' : formatNumberWithSign(negHospOut),
      text: getTranslate(inHospital.today, 'oseba'),
    };
    const foramttedIcu = {
      number: isNaN(icu.today) ? '-' : formatNumber(icu.today),
      in: isNaN(icu.in) ? '-' : formatNumberWithSign(icu.in),
      out: isNaN(negIcuOut) ? '-' : formatNumberWithSign(negIcuOut),
      text: getTranslate(icu.today, 'oseba'),
    };

    const noHospitalData = hosp[1].inHospital.today === undefined;

    return noHospitalData ? (
      ''
    ) : (
      <InHospital
        key={hosp[0]}
        hospShort={hosp[0]}
        hospitalName={hosp[2]}
        hosp={{ ...formattedInHospital }}
        icu={{ ...foramttedIcu }}
        wrongDate={wrongDate}
      />
    );
  };

  const hospitalOutput = perHospitalChanges
    .sort(sortDescByPatients)
    .map(createHospitalOutput);

  return (
    <details>
      <summary className="summary-with-after">
        <DataRow markFail={wrongDate}>Stanje po bolnišnicah:</DataRow>
      </summary>
      <ul>{hospitalOutput}</ul>
    </details>
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

    const sortedData = [...hookPatients.data].sort(
      (a, b) => b.dayFromStart - a.dayFromStart
    );

    const { perHospitalChanges } = getInHospitalsData(
      hookHospitals.data,
      sortedData[0]
    );

    const wrongDate = differenceInDays(new Date(), getDate(sortedData[0])) > 0;

    const newProps = {
      ...props,
      perHospitalChanges,
      wrongDate,
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
  const patientsDataIsNotUndefined = !isUndefined(patients);
  return patientsDataIsNotUndefined && Object.entries(patients.facilities);
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
