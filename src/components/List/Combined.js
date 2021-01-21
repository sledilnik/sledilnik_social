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
        check_summary={css.check_summary}
        check_lab_tests={css.check_lab_tests}
        cases={testsActive.cases}
        regTests={testsActive.regTests}
        hagtTests={testsActive.hagtTests}
      />
      <Vaccination
        check_stats={css.check_stats}
        toDate={formatNumber(combined.vaccinationToDate)}
        today={alwaysSignDisplay(combined.vaccinationToday)}
      />
      <Confirmed
        check_stats={css.check_stats}
        confirmed={formatNumber(combined.confirmedToDate)}
      />
      <PerAge
        title={'Potrjeni primeri po starosti'}
        check_stats={css.check_stats}
        todayPerAge={combined.todayPerAge}
        yesterdayPerAge={combined.yesterdayPerAge}
      />
      <HOSPITALIZED_DECEASED
        check_patients={css.check_patients}
        hospitalized={hospitalizedDeceased.hospitalized}
        onRespiratory={hospitalizedDeceased.onRespiratory}
        deceased={hospitalizedDeceased.deceased}
      />
      <InHospitals
        title={'Stanje po bolnišnicah'}
        check_patients={css.check_patients}
        patients={combined.patients}
        perHospitalChanges={combined.perHospitalChanges}
      />
      <CITIES_SOCIAL_FRIENDLY
        title={'Po krajih'}
        check_municipalities={css.check_municipalities}
        municipalities={combined.municipalities}
      />
    </>
  );
}

export default Combined;
