import React from 'react';

import PercentageRow from './TESTS_ACTIVE/PercentageRow';
import ActiveCasesRow from './TESTS_ACTIVE/ActiveCasesRow';

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
  const calcPercentage = value => value * 100;
  const getPercentage = (numerator, denominator) => {
    const canNotCalc = isNaN(numerator) || isNaN(denominator);
    if (canNotCalc) {
      return ' - ';
    }

    const fraction = calcFraction(numerator, denominator);
    return calcPercentage(fraction);
  };

  const regPercentage = getPercentage(regToday, regPerformed);
  const hagtPercentage = getPercentage(hagtToday, hagtPerformed);

  return (
    <div className={check_first}>
      <PercentageRow
        title={'PCR'}
        numerator={regToday}
        denominator={regPerformed}
        percent={regPercentage}
      />
      <PercentageRow
        title={'PCR'}
        numerator={hagtToday}
        denominator={hagtPerformed}
        percent={hagtPercentage}
      />
      <ActiveCasesRow
        title={'Aktivni primeri'}
        casesActive={casesActive}
        casesActiveIn={casesActiveIn}
        casesActiveOut={casesActiveOut}
      />
    </div>
  );
}

export default TESTS_ACTIVE;
