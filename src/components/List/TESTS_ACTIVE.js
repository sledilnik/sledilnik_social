import React from 'react';

import PercentageRow from './TESTS_ACTIVE/PercentageRow';
import ActiveCasesRow from './TESTS_ACTIVE/ActiveCasesRow';
import {
  alwaysSignDisplay,
  formatNumber,
  percentStyle,
} from '../../utils/createLocaleNumberFormat';

function TESTS_ACTIVE({ check_first, labTests, summary }) {
  const { regular, hagt } = labTests[labTests.length - 1].data;
  const casesActive = summary.casesActive.value;
  const casesActiveIn = summary.casesActive.subValues.in;
  const casesActiveOut = summary.casesActive.subValues.out;

  const { today: regToday } = regular.positive;
  const { today: regPerformed } = regular.performed;
  const { today: hagtToday } = hagt.positive;
  const { today: hagtPerformed } = hagt.performed;

  const calcFraction = (numerator, denominator) => numerator / denominator;

  const regFraction = calcFraction(regToday, regPerformed);
  const hagtFraction = calcFraction(hagtToday, hagtPerformed);

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
