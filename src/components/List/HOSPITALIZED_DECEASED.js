import React from 'react';
import differenceInDays from 'date-fns/differenceInDays';

import Hospitalized from './HOSPITALIZED_DECEASED/Hospitalized';
import OnRespiratory from './HOSPITALIZED_DECEASED/OnRespiratory';
import Deceased from './HOSPITALIZED_DECEASED/Deceased';
import InCare from './HOSPITALIZED_DECEASED/InCare';

import { formatNumber, formatNumberWithSign } from '../../utils/formatNumber';
import { getDate } from '../../utils/dates';
import Error from '../shared/Error';

import HOSDict from '../../dict/HOSDict';

function HOSPITALIZED_DECEASED({
  css,
  hospitalized,
  onRespiratory,
  inCare,
  deceased,
  errors,
  version = 'FB',
}) {
  const text = HOSDict[version];

  return (
    <div className={css?.check_patients}>
      <Error hasError={errors.patients} hasData={!!hospitalized}>
        <Hospitalized
          text={{ ...text.hospitalized, spaces: text.spaces }}
          hospitalized={formatNumber(hospitalized?.hospNum)}
          hospitalizedIn={formatNumberWithSign(hospitalized?.hospIn)}
          hospitalizedOut={formatNumberWithSign(hospitalized?.hospOut)}
          icuNum={formatNumber(hospitalized?.icuNum)}
          icuDelta={formatNumberWithSign(hospitalized?.icuDelta)}
        />
      </Error>
      <Error hasError={errors.patients} hasData={!!onRespiratory}>
        <OnRespiratory
          text={{ ...text.onRespiratory, spaces: text.spaces }}
          respiratoryTotal={formatNumber(onRespiratory?.respiratoryTotal)}
          todayCritical={formatNumber(onRespiratory?.todayCritical)}
          criticalDelta={formatNumberWithSign(onRespiratory?.respiratoryDelta)}
          todayNiv={formatNumber(onRespiratory?.todayNiv)}
          nivDelta={formatNumberWithSign(onRespiratory?.nivDelta)}
        />
      </Error>
      <Error hasError={errors.patients} hasData={!!inCare}>
        <InCare
          text={{ ...text.inCare, spaces: text.spaces }}
          careNum={!isNaN(inCare?.careNum) && formatNumber(inCare.careNum)}
          careIn={!isNaN(inCare?.careIn) && formatNumberWithSign(inCare.careIn)}
          careOut={
            !isNaN(inCare?.careOut) && formatNumberWithSign(inCare.careOut)
          }
        />
      </Error>
      <Error hasError={errors.patients} hasData={!!deceased}>
        <Deceased
          text={{ ...text.deceased, spaces: text.spaces }}
          deceased={formatNumberWithSign(
            formatNumberWithSign(deceased?.deceased)
          )}
          deceasedToDate={formatNumber(deceased?.deceasedToDate)}
        />
      </Error>
    </div>
  );
}

function withHospitalizedDeceasedHOC(Component) {
  return ({ patientsHook, icons, ...props }) => {
    const errors = { patients: patientsHook.hasError };
    const data = {
      ...getHospitalizedDeceasedData(patientsHook.data),
      errors,
      icons,
      ...props,
    };

    return <Component {...data} />;
  };
}

export default withHospitalizedDeceasedHOC(HOSPITALIZED_DECEASED);

// API paths: stats, patients
function getHospitalizedDeceasedData(patients) {
  if (patients === null) {
    return {
      hospitalized: null,
      onRespiratory: null,
      inCare: null,
      deceased: null,
      css: null,
    };
  }

  const patientsToday = patients.slice(-1).pop();
  const patientsYesterday = patients.slice(-2, -1).pop();

  // <Hospitalized/>
  const {
    today: hospNum,
    in: hospIn,
    out: hospOut,
  } = patientsToday.total.inHospital;
  const todayICU = patientsToday.total.icu.today;
  const yesterdayICU = patientsYesterday.total.icu.today;
  const icuDelta = todayICU - yesterdayICU;
  const hospitalized = {
    hospNum,
    hospIn,
    hospOut: -hospOut,
    icuNum: todayICU,
    icuDelta,
  };

  // <OnRespiratory/>
  const todayCritical = patientsToday.total.critical.today;
  const yesterdayCritical = patientsYesterday.total.critical.today;
  const respiratoryDelta = todayCritical - yesterdayCritical;

  const todayNiv = patientsToday.total.niv.today;
  const yesterdayNiv = patientsYesterday.total.niv.today;
  const nivDelta = todayNiv - yesterdayNiv;

  const respiratoryTotal = todayNiv + todayCritical;
  const onRespiratory = {
    respiratoryTotal,
    todayCritical,
    respiratoryDelta,
    todayNiv,
    nivDelta,
  };

  // <InCare/>
  const { today: careNum, in: careIn, out: careOut } = patientsToday.total.care;
  const inCare = { careNum, careIn, careOut: -careOut };

  // <Deceased/>
  // ? rename deceased properties -> use today and toDate
  const { today: dead, toDate: deceasedToDate } = patientsToday.total.deceased;
  const deceased = { deceased: dead, deceasedToDate };

  // CSS
  const patientsDate = getDate(patientsToday);
  const patientsCheck = differenceInDays(new Date(), patientsDate) > 0;

  return {
    hospitalized,
    onRespiratory,
    inCare,
    deceased,
    css: { check_patients: patientsCheck ? 'red' : '' },
  };
}
