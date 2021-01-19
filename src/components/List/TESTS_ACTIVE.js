import React from 'react';

import PercentageRow from './TESTS_ACTIVE/PercentageRow';
import ActiveCasesRow from './TESTS_ACTIVE/ActiveCasesRow';
import {
  alwaysSignDisplay,
  formatNumber,
  percentStyle,
} from '../../utils/createLocaleNumberFormat';

function TESTS_ACTIVE({
  check_summary,
  check_lab_tests,
  cases,
  regTests,
  hagtTests,
}) {
  if (regTests === undefined) {
    return 'no regTests';
  }
  const { regToday, regPerformed, regFraction } = regTests;
  const { hagtToday, hagtPerformed, hagtFraction } = hagtTests;
  const { casesActive, casesActiveIn, casesActiveOut } = cases;

  return (
    <div>
      <section className={check_lab_tests}>
        <PercentageRow
          title={'PCR'}
          numerator={alwaysSignDisplay(regToday)}
          denominator={formatNumber(regPerformed)}
          percent={percentStyle(regFraction)}
        />
        <PercentageRow
          title={'PCR'}
          numerator={alwaysSignDisplay(hagtToday)}
          denominator={formatNumber(hagtPerformed)}
          percent={percentStyle(hagtFraction)}
        />
      </section>
      <section className={check_summary}>
        <ActiveCasesRow
          title={'Aktivni primeri'}
          casesActive={formatNumber(casesActive)}
          casesActiveIn={alwaysSignDisplay(casesActiveIn)}
          casesActiveOut={alwaysSignDisplay(casesActiveOut)}
        />
      </section>
    </div>
  );
}

export default TESTS_ACTIVE;
