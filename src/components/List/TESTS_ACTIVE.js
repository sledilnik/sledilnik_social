import React from 'react';

import PercentageRow from './TESTS_ACTIVE/PercentageRow';
import ActiveCasesRow from './TESTS_ACTIVE/ActiveCasesRow';
import {
  formatNumberWithSign,
  formatNumber,
  formatPercentage,
} from '../../utils/formatNumber';

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
          numerator={formatNumberWithSign(regToday)}
          denominator={formatNumber(regPerformed)}
          percent={formatPercentage(regFraction)}
        />
        <PercentageRow
          title={'HAT'}
          numerator={formatNumberWithSign(hagtToday)}
          denominator={formatNumber(hagtPerformed)}
          percent={formatPercentage(hagtFraction)}
        />
      </section>
      <section className={check_summary}>
        <ActiveCasesRow
          title={'Aktivni primeri'}
          casesActive={formatNumber(casesActive)}
          casesActiveIn={formatNumberWithSign(casesActiveIn)}
          casesActiveOut={formatNumberWithSign(casesActiveOut)}
        />
      </section>
    </div>
  );
}

export default TESTS_ACTIVE;
