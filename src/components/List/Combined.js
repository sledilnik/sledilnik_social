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

function Combined({ testsActive, hospitalizedDeceased, combined, css }) {
  return (
    <>
      <TESTS_ACTIVE
        check_first={css.check_first}
        cases={testsActive.cases}
        regTests={testsActive.regTests}
        hagtTests={testsActive.hagtTests}
      />
      <Vaccination
        toDate={formatNumber(combined.vaccinationToDate)}
        today={alwaysSignDisplay(combined.vaccinationToday)}
      />
      <Confirmed confirmed={formatNumber(combined.confirmedToDate)} />
      <PerAge
        title={'Potrjeni primeri po starosti'}
        check_third_age={css.check_third_age}
        todayPerAge={combined.todayPerAge}
        yesterdayPerAge={combined.yesterdayPerAge}
      />
      <HOSPITALIZED_DECEASED
        check_second={css.check_second}
        hospitalized={hospitalizedDeceased.hospitalized}
        onRespiratory={hospitalizedDeceased.onRespiratory}
        deceased={hospitalizedDeceased.deceased}
      />
      <InHospitals
        title={'Stanje po bolnišnicah'}
        check_second={css.check_second}
        patients={combined.patients}
        perHospitalChanges={combined.perHospitalChanges}
      />
      <CITIES_SOCIAL_FRIENDLY
        title={'Po krajih'}
        check_third_mun={css.check_third_mun}
        municipalities={combined.municipalities}
      />
    </>
  );
}

export default Combined;
