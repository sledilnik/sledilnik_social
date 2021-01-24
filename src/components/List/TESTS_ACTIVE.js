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
import { Row } from '../shared/ui/New';

function TESTS_ACTIVE({ css, cases, regTests, hagtTests }) {
  const { regToday, regPerformed, regFraction } =
    regTests !== undefined && regTests;
  const { hagtToday, hagtPerformed, hagtFraction } =
    hagtTests !== undefined && hagtTests;
  const { casesActive, casesActiveIn, casesActiveOut } =
    cases !== undefined && cases;

  return (
    <div>
      <section className={css?.check_lab_tests}>
        {regToday ? (
          <PercentageRow
            title={'PCR'}
            numerator={formatNumberWithSign(regToday)}
            denominator={formatNumber(regPerformed)}
            percent={formatPercentage(regFraction)}
          />
        ) : (
          <Row>PCR: LOADING...</Row>
        )}

        {hagtToday ? (
          <PercentageRow
            title={'HAT'}
            numerator={formatNumberWithSign(hagtToday)}
            denominator={formatNumber(hagtPerformed)}
            percent={formatPercentage(hagtFraction)}
          />
        ) : (
          <Row>HAT: LOADING...</Row>
        )}
      </section>
      <section className={css?.check_summary}>
        {casesActive ? (
          <ActiveCasesRow
            title={'Aktivni primeri'}
            casesActive={formatNumber(casesActive)}
            casesActiveIn={formatNumberWithSign(casesActiveIn)}
            casesActiveOut={formatNumberWithSign(casesActiveOut)}
          />
        ) : (
          <Row>Aktivni primeri: LOADING...</Row>
        )}
      </section>
    </div>
  );
}

function withTestsActiveHOC(Component) {
  return ({ labTestsHook, summaryHook, ...props }) => {
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
  const getLabTestsData = labTests => {
    if (labTests === null) {
      return {
        regTests: null,
        hagtTests: null,
        css: null,
      };
    }

    const labTestsToday = labTests.slice(-1).pop();
    const { regular, hagt } = labTestsToday.data;

    const { today: regToday } = regular.positive;
    const { today: regPerformed } = regular.performed;
    const { today: hagtToday } = hagt.positive;
    const { today: hagtPerformed } = hagt.performed;
    const calcFraction = (numerator, denominator) => numerator / denominator;

    const regFraction = calcFraction(regToday, regPerformed);
    const hagtFraction = calcFraction(hagtToday, hagtPerformed);

    const regTests = { regToday, regPerformed, regFraction };
    const hagtTests = { hagtToday, hagtPerformed, hagtFraction };

    const labTestsDate = getDate(labTestsToday);
    const labTestsCheck = differenceInDays(new Date(), labTestsDate) > 1;

    return {
      regTests,
      hagtTests,
      css: { check_lab_tests: labTestsCheck ? 'red' : '' },
    };
  };

  const getActiveData = summary => {
    if (summary === null) {
      return {
        cases: null,
        css: null,
      };
    }
    const { casesActive: active } = summary;

    const casesActive = active.value;
    const casesActiveIn = active.subValues.in;
    const casesActiveOut = active.subValues.out;

    const cases = {
      casesActive,
      casesActiveIn,
      casesActiveOut: -casesActiveOut,
    };

    // CSS
    const summaryDate = getDate(active); // before labTests
    const summaryCheck = differenceInDays(new Date(), summaryDate) > 1;

    return { cases, css: { check_summary: summaryCheck ? 'red' : '' } };
  };

  const { regTests, hagtTests, css: labTestsCss } =
    labTests !== null && getLabTestsData(labTests);
  const { cases, css: activeCss } = summary !== null && getActiveData(summary);

  return {
    cases,
    regTests,
    hagtTests,
    css: {
      check_summary: activeCss?.check_summary,
      check_lab_tests: labTestsCss?.check_lab_tests,
    },
  };
}
