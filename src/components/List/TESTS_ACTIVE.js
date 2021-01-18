import React from 'react';

import PercentageRow from './TESTS_ACTIVE/PercentageRow';
import ActiveCasesRow from './TESTS_ACTIVE/ActiveCasesRow';
import {
  alwaysSignDisplay,
  formatNumber,
  percentStyle,
} from '../../utils/createLocaleNumberFormat';

function TESTS_ACTIVE({ check_first, cases, regTests, hagtTests }) {
  if (regTests === undefined) {
    return 'no regTests';
  }
  const { regToday, regPerformed, regFraction } = regTests;
  const { hagtToday, hagtPerformed, hagtFraction } = hagtTests;
  const { casesActive, casesActiveIn, casesActiveOut } = cases;

  return (
    <div className={check_first}>
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
      <ActiveCasesRow
        title={'Aktivni primeri'}
        casesActive={formatNumber(casesActive)}
        casesActiveIn={alwaysSignDisplay(casesActiveIn)}
        casesActiveOut={alwaysSignDisplay(casesActiveOut)}
      />
    </div>
  );
}

export default TESTS_ACTIVE;
