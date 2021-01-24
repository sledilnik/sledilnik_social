import React from 'react';
import { differenceInDays } from 'date-fns';
import Hospitalized from './HOSPITALIZED_DECEASED/Hospitalized';
import OnRespiratory from './HOSPITALIZED_DECEASED/OnRespiratory';
import Deceased from './HOSPITALIZED_DECEASED/Deceased';
import { formatNumber, formatNumberWithSign } from '../../utils/formatNumber';
import InCare from './HOSPITALIZED_DECEASED/InCare';

import { getDate } from './../List';

function HOSPITALIZED_DECEASED({
  check_patients,
  hospitalized,
  onRespiratory,
  inCare,
  deceased,
}) {
  if (!hospitalized) {
    return '';
  }

  return (
    <div className={check_patients}>
      <Hospitalized
        title={'Hospitalizirani'}
        subtitle={'v EIT'}
        hospitalized={formatNumber(hospitalized.hospNum)}
        translateText={'oseba'}
        hospitalizedIn={formatNumberWithSign(hospitalized.hospIn)}
        hospitalizedOut={formatNumberWithSign(hospitalized.hospOut)}
        icuNum={formatNumber(hospitalized.icuNum)}
        icuDelta={formatNumberWithSign(hospitalized.icuDelta)}
      />
      <OnRespiratory
        title={'Na respiratorju'}
        respiratoryTotal={formatNumber(onRespiratory.respiratoryTotal)}
        todayCritical={formatNumber(onRespiratory.todayCritical)}
        criticalDelta={formatNumberWithSign(onRespiratory.respiratoryDelta)}
        todayNiv={formatNumber(onRespiratory.todayNiv)}
        nivDelta={formatNumberWithSign(onRespiratory.nivDelta)}
      />
      <InCare
        title={'Negovalne bolnišnice'}
        careNum={!isNaN(inCare?.careNum) && formatNumber(inCare?.careNum)}
        careIn={!isNaN(inCare?.careIn) && formatNumberWithSign(inCare?.careIn)}
        careOut={
          !isNaN(inCare?.careOut) && formatNumberWithSign(inCare?.careOut)
        }
      />
      <Deceased
        title={'Preminuli'}
        subtitle={'skupaj '}
        translate={'oseba'}
        deceased={formatNumberWithSign(formatNumberWithSign(deceased.deceased))}
        deceasedToDate={formatNumber(deceased.deceasedToDate)}
      />
    </div>
  );
}

function withHospitalizedDeceasedHOC(Component) {
  return ({ patientsHook, ...props }) => {
    const isLoading = patientsHook.isLoading;

    if (isLoading) {
      return <p>HOSPITALIZED_DECEASED is loading....</p>;
    }

    if (patientsHook.data === null) {
      return <p>HOSPITALIZED_DECEASED is loading....</p>;
    }

    const data = {
      ...getHospitalizedDeceasedData(patientsHook.data),
      ...props,
    };

    return <Component {...data} />;
  };
}

export default withHospitalizedDeceasedHOC(HOSPITALIZED_DECEASED);

// API paths: stats, patients
function getHospitalizedDeceasedData(patients) {
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
  // TODO rename deceased properties -> use today and toDate
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
