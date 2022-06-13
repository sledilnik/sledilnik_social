import React, { useContext } from 'react';
import { differenceInDays } from 'date-fns';

import { DataContext } from 'context/DataContext';

import { formatNumber, formatNumberWithSign } from 'utils/formatNumber';
import { getDate } from 'utils/dates';

import DataRow from 'components/Shared/DataRow';
import InHospital from './Shared/InHospital';
import FetchBoundary from './Shared/FetchBoundary';
import { SomethingWentWrong } from 'components/Shared';

const dictionary = {
  oseba: ['oseba', 'osebi', 'osebe', 'osebe', 'oseb'],
};

const getTranslate = (num, text) => {
  const dict = dictionary[text];
  const index = num > 5 ? 5 : num;
  return dict[index - 1];
};

// patients
function InHospitals({ hook, perHospitalChanges, isWrongDate }) {
  if (perHospitalChanges instanceof Error) {
    return <SomethingWentWrong title="Stanje po bolnišnicah" />;
  }

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

    // also if today === 0; we don't want to show hospitall with 0 patients
    const noHospitalData =
      hosp[1].inHospital.today === undefined ||
      (isNaN(inHospital.in) && isNaN(inHospital.in));

    const showIcu =
      icu.today > 0 || (icu.today === 0 && (icu.in > 0 || icu.out > 0));

    return noHospitalData ? (
      ''
    ) : (
      <InHospital
        key={hosp[0]}
        hospShort={hosp[0]}
        hospitalName={hosp[2]}
        hosp={{ ...formattedInHospital }}
        icu={{ ...foramttedIcu }}
        isWrongDate={isWrongDate}
        showIcu={showIcu}
      />
    );
  };

  const hospitalOutput =
    perHospitalChanges &&
    perHospitalChanges.sort(sortDescByPatients).map(createHospitalOutput);

  return (
    <FetchBoundary hook={hook}>
      <details open={true}>
        <summary className="summary-with-after">
          <DataRow markFail={isWrongDate}>Stanje po bolnišnicah:</DataRow>
        </summary>
        <ul>{hospitalOutput}</ul>
      </details>
    </FetchBoundary>
  );
}

const withInHospitalsHOC = function withInHospitalsHOC(Component) {
  const WithInHospitals = ({ props }) => {
    const { patients: hookPatients, hospitalsList: hookHospitals } =
      useContext(DataContext);

    const isLoading = hookPatients.isLoading || hookHospitals.isLoading;
    const hasError = hookPatients.hasError || hookHospitals.hasError;
    const data =
      hookPatients.data === null || hookHospitals.data === null
        ? null
        : { hospitals: hookHospitals.data, patients: hookPatients.data };
    const hook = { hasError, isLoading, data };

    const newProps = data && getInHospitalsData(data);

    return <Component hook={hook} {...newProps} {...props} />;
  };
  return WithInHospitals;
};
export default withInHospitalsHOC(InHospitals);

const getInHospitalsData = data => {
  const { hospitals, patients } = data;
  const sortedData = [...patients].sort(
    (a, b) => b.dayFromStart - a.dayFromStart
  );

  // {code: 'xxx', name: 'yyy', uri: 'zzz} -> [['xxx', 'zzz]] [[<code>,<name>]]
  const hospitalsDict = prepareHospitalsDict(hospitals);

  // prepare perHospitalChanges
  const perHospitalChanges = getPerHospitalChanges(sortedData[0]);
  const perHospitalChangesWithLongName = findAndPushLongHospitalName(
    perHospitalChanges,
    hospitalsDict
  );

  const isWrongDate = differenceInDays(new Date(), getDate(sortedData[0])) > 0;

  return {
    perHospitalChanges: perHospitalChangesWithLongName,
    isWrongDate,
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
  if (isUndefined(patients)) {
    return new Error('Patients are undefined');
  }
  return Object.entries(patients.facilities);
}

// -> [["ukclj", {...}, "UKC Ljubljana"],... ]
function findAndPushLongHospitalName(perHospitalChanges, hospitalsDict) {
  if (perHospitalChanges instanceof Error) {
    console.error(perHospitalChanges);
    return perHospitalChanges;
  }

  return perHospitalChanges.map(hospital => {
    const hospitalLongName = hospitalsDict.filter(
      item => hospital[0] === item[0]
    )[0][1];
    return [...hospital, hospitalLongName];
  });
}
