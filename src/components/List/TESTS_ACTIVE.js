import React from 'react';
import { differenceInDays } from 'date-fns';

import PercentageRow from './TESTS_ACTIVE/PercentageRow';
import ActiveCasesRow from './TESTS_ACTIVE/ActiveCasesRow';
import { RowSkeleton } from '../shared/ui/New';
import Error from './../shared/Error';

import {
  formatNumberWithSign,
  formatNumber,
  formatPercentage,
} from '../../utils/formatNumber';
import { getDate } from '../../utils/dates';

function TESTS_ACTIVE({ css, cases, regTests, hagtTests, errors }) {
  const { regToday, regPerformed, regFraction } =
    regTests !== undefined && regTests;
  const { hagtToday, hagtPerformed, hagtFraction } =
    hagtTests !== undefined && hagtTests;
  const { casesActive, casesActiveIn, casesActiveOut } =
    cases !== undefined && cases;

  const { labTests, summary } = errors;

  return (
    <div>
      {labTests.hasError ? (
        <Error>Nekaj je narobe. Prosim, poizkusite kasneje!</Error>
      ) : (
        <section className={css?.check_lab_tests}>
          {regToday ? (
            <PercentageRow
              title={'PCR'}
              numerator={formatNumberWithSign(regToday)}
              denominator={formatNumber(regPerformed)}
              percent={formatPercentage(regFraction)}
            />
          ) : (
            <RowSkeleton />
          )}

          {hagtToday ? (
            <PercentageRow
              title={'HAT'}
              numerator={formatNumberWithSign(hagtToday)}
              denominator={formatNumber(hagtPerformed)}
              percent={formatPercentage(hagtFraction)}
            />
          ) : (
            <RowSkeleton />
          )}
        </section>
      )}
      {summary.hasError ? (
        <Error>Nekaj je narobe. Prosim, poizkusite kasneje!</Error>
      ) : (
        <section className={css?.check_summary}>
          {casesActive ? (
            <ActiveCasesRow
              title={'Aktivni primeri'}
              casesActive={formatNumber(casesActive)}
              casesActiveIn={formatNumberWithSign(casesActiveIn)}
              casesActiveOut={formatNumberWithSign(casesActiveOut)}
            />
          ) : (
            <RowSkeleton />
          )}
        </section>
      )}
    </div>
  );
}

// API path: lab-tests
const getLabTestsData = labTests => {
  if (labTests === null) {
    return {
      regTests: null,
      hagtTests: null,
      css: null,
    };
  }

  // DATA
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

  // CSS
  const labTestsDate = getDate(labTestsToday);
  const labTestsCheck = differenceInDays(new Date(), labTestsDate) > 1;

  return {
    regTests,
    hagtTests,
    css: { check_lab_tests: labTestsCheck ? 'red' : '' },
  };
};

// API path: summary
const getActiveData = summary => {
  if (summary === null) {
    return {
      cases: null,
      css: null,
    };
  }

  // Data
  // ? should I revert, leave or rename component's props
  const { casesActive } = summary;
  const { value, subValues } = casesActive;
  const { in: casesIn, out } = subValues;
  const cases = {
    casesActive: value,
    casesActiveIn: casesIn,
    casesActiveOut: -out,
  };

  // CSS
  const summaryDate = getDate(casesActive);
  const summaryCheck = differenceInDays(new Date(), summaryDate) > 1;

  return { cases, css: { check_summary: summaryCheck ? 'red' : '' } };
};

function withTestsActiveHOC(Component) {
  return ({ labTestsHook, summaryHook, ...props }) => {
    const { regTests, hagtTests, css: labTestsCss } =
      labTestsHook.data !== null && getLabTestsData(labTestsHook.data);
    const { cases, css: activeCss } =
      summaryHook.data !== null && getActiveData(summaryHook.data);

    const errors = {
      labTests: {
        hasError: labTestsHook.hasError,
        errorMessage: labTestsHook.errorMessage,
      },
      summary: {
        hasError: summaryHook.hasError,
        errorMessage: summaryHook.errorMessage,
      },
    };

    const data = {
      regTests,
      hagtTests,
      cases,
      css: { ...labTestsCss, ...activeCss },
      errors,
      ...props,
    };
    return <Component {...data} />;
  };
}

export default withTestsActiveHOC(TESTS_ACTIVE);
