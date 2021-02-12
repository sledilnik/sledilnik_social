import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { formatNumber, formatNumberWithSign } from '../utils/formatNumber';
import PresentData from './PresentData';
import { patients } from './dataDict';
import getTranslatedData from '../utils/getTranslatedData';

const dataDict = patients.inHospitals;

const dictionary = [
  [
    'preminula oseba',
    'preminuli osebi',
    'osebe preminule',
    'osebe preminule',
    'preminulih oseb',
  ],
  [
    'potrjeni primer',
    'potrjena primera',
    'potrjeni primeri',
    'potrjeni primeri',
    'potrjenih primerov',
  ],
  ['zdravi', 'zdravita', 'zdravijo', 'zdravijo', 'zdravi'],
  ['oseba', 'osebi', 'osebe', 'osebe', 'oseb'],
];

const Translate = ({ number, text }) => {
  let variable = '';

  if (number > 5) {
    number = 5;
  }

  dictionary.forEach(translation => {
    if (translation[0] === text) {
      variable = translation[number - 1];
    }
  });

  return <span>{variable}</span>;
};

function DataTranslate({ number, text }) {
  return (
    <>
      <span className="bold"> {number} </span>
      <Translate text={text} number={number} />
    </>
  );
}

function InHospital({ hospShort, hospitalName, hosp, icu }) {
  return (
    <li key={hospShort}>
      <span className="bold">{hospitalName}</span>:{' '}
      <DataTranslate number={hosp.number} text={'oseba'} />{' '}
      <span className="bold">
        ({hosp.in}, {hosp.out})
      </span>
      , EIT:
      <DataTranslate number={icu.number} text={'oseba'} />{' '}
      <span className="bold">
        ({icu.in}, {icu.out})
      </span>
      .
    </li>
  );
}

function InHospitals({ perHospitalChanges }) {
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
    };
    const foramttedIcu = {
      number: isNaN(icu.today) ? '-' : formatNumber(icu.today),
      in: isNaN(icu.in) ? '-' : formatNumberWithSign(icu.in),
      out: isNaN(negIcuOut) ? '-' : formatNumberWithSign(negIcuOut),
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
      />
    );
  };

  const hospitalOutput = perHospitalChanges
    .sort(sortDescByPatients)
    .map(createHospitalOutput);

  const translatedData = getTranslatedData(dataDict);

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

    const data = getInHospitalsData(hookHospitals.data, hookPatients.data);

    const newProps = {
      ...props,
      perHospitalChanges: data.perHospitalChanges,
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
