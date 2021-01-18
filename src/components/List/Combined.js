import React from 'react';

import TESTS_ACTIVE from './TESTS_ACTIVE';
import HOSPITALIZED_DECEASED from './HOSPITALIZED_DECEASED';
import CITIES_SOCIAL_FRIENDLY from './Combined/CITIES_SOCIAL_FRIENDLY';
import PerAge from './Combined/PerAge';
import InHospitals from './Combined/InHospitals';
import Vaccination from './Combined/Vaccination';
import Confirmed from './Combined/Confirmed';
import {
  formatNumber,
  alwaysSignDisplay,
} from './../../utils/createLocaleNumberFormat';

function Combined({
  testsActive,
  hospitalizedDeceased,
  check_first,
  check_second,
  check_third_age,
  check_third_mun,
  combined,
  patients,
  municipalities,
  perHospitalChanges,
}) {
  const {
    todayPerAge,
    yesterdayPerAge,
    vaccinationToDate,
    vaccinationToday,
    confirmedToDate,
  } = combined;

  return (
    <>
      <TESTS_ACTIVE
        check_first={check_first}
        cases={testsActive.cases}
        regTests={testsActive.regTests}
        hagtTests={testsActive.hagtTests}
      />
      <Vaccination
        toDate={formatNumber(vaccinationToDate)}
        today={alwaysSignDisplay(vaccinationToday)}
      />
      <Confirmed confirmed={formatNumber(confirmedToDate)} />
      <PerAge
        title={'Potrjeni primeri po starosti'}
        check_third_age={check_third_age}
        todayPerAge={todayPerAge}
        yesterdayPerAge={yesterdayPerAge}
      />
      <HOSPITALIZED_DECEASED
        check_second={check_second}
        hospitalized={hospitalizedDeceased.hospitalized}
        onRespiratory={hospitalizedDeceased.onRespiratory}
        deceased={hospitalizedDeceased.deceased}
      />
      <InHospitals
        title={'Stanje po bolnišnicah'}
        check_second={check_second}
        patients={patients}
        perHospitalChanges={perHospitalChanges}
      />
      <CITIES_SOCIAL_FRIENDLY
        title={'Po krajih'}
        check_third_mun={check_third_mun}
        municipalities={municipalities}
      />
    </>
  );
}

export default Combined;
