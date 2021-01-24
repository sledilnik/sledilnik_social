import React from 'react';
import { getDate } from '../List';
import { differenceInDays } from 'date-fns';

import PercentageRow from './TESTS_ACTIVE/PercentageRow';
import ActiveCasesRow from './TESTS_ACTIVE/ActiveCasesRow';
import {
  formatNumberWithSign,
  formatNumber,
  formatPercentage,
} from '../../utils/formatNumber';

function TESTS_ACTIVE({
  css = { check_lab_tests: '', check_summary: '' },
  cases,
  regTests,
  hagtTests,
}) {
  const { regToday, regPerformed, regFraction } = regTests;
  const { hagtToday, hagtPerformed, hagtFraction } = hagtTests;
  const { casesActive, casesActiveIn, casesActiveOut } = cases;

  return (
    <div>
      <section className={css.check_lab_tests}>
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
      <section className={css.check_summary}>
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

function withTestsActiveHOC(Component) {
  return ({ labTestsHook, summaryHook, ...props }) => {
    const isLoading = labTestsHook.isLoading || summaryHook.isLoading;
    if (isLoading) {
      return <p>TESTS_ACTIVE is loading....</p>;
    }

    if (labTestsHook.data === null) {
      return <p>TESTS_ACTIVE is loading....</p>;
    }
    if (summaryHook.data === null) {
      return <p>TESTS_ACTIVE is loading....</p>;
    }

    const data = {
      ...getTestsActiveData(labTestsHook.data, summaryHook.data),
      ...props,
    };

    return <Component {...data} />;
  };
}

export default withTestsActiveHOC(TESTS_ACTIVE);

// API paths: lab-tests, summary
function getTestsActiveData(labTests, summary) {
  const labTestsToday = labTests.slice(-1).pop().data;
  const { casesActive: active } = summary;

  const { regular, hagt } = labTestsToday;
  const casesActive = active.value;
  const casesActiveIn = active.subValues.in;
  const casesActiveOut = active.subValues.out;

  const cases = { casesActive, casesActiveIn, casesActiveOut: -casesActiveOut };

  const { today: regToday } = regular.positive;
  const { today: regPerformed } = regular.performed;
  const { today: hagtToday } = hagt.positive;
  const { today: hagtPerformed } = hagt.performed;

  const calcFraction = (numerator, denominator) => numerator / denominator;

  const regFraction = calcFraction(regToday, regPerformed);
  const hagtFraction = calcFraction(hagtToday, hagtPerformed);

  const regTests = { regToday, regPerformed, regFraction };
  const hagtTests = { hagtToday, hagtPerformed, hagtFraction };

  // CSS
  const labTestsDate = getDate(labTestsToday);
  const summaryDate = getDate(casesActive); // before labTests

  const labTestsCheck = differenceInDays(new Date(), labTestsDate) > 1;
  const summaryCheck = differenceInDays(new Date(), summaryDate) > 1;

  return {
    cases,
    regTests,
    hagtTests,
    css: {
      check_summary: summaryCheck ? 'red' : '',
      check_lab_tests: labTestsCheck ? 'red' : '',
    },
  };
}
