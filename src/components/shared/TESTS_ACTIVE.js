import React from 'react';
import DataRow from '../List/shared/DataRow';
import EmbeddedNumberInOut from '../List/shared/EmbeddedNumberInOut';
import DataPercentage from '../List/shared/DataPercentage';

function TESTS_ACTIVE({ check_first, labTests, summary }) {
  const { regular, hagt } = labTests[labTests.length - 1].data;
  const casesActive = summary.casesActive.value;
  const casesActiveIn = summary.casesActive.subValues.in;
  const casesActiveOut = summary.casesActive.subValues.out;

  function PercentageRow({ title = '', numPositive = 0, numPerformed = 0 }) {
    return (
      <DataRow title={title}>
        <DataPercentage numPositive={numPositive} numPerformed={numPerformed} />
        .
      </DataRow>
    );
  }

  const { today: regToday } = regular.positive;
  const { today: regPerformed } = regular.performed;
  const { today: hagtToday } = hagt.positive;
  const { today: hagtPerformed } = hagt.performed;

  return (
    <div className={check_first}>
      <PercentageRow
        title={'PCR'}
        numPositive={regToday}
        numPerformed={regPerformed}
      />
      <PercentageRow
        title={'HAT'}
        numPositive={hagtToday}
        numPerformed={hagtPerformed}
      />
      <DataRow title={'Aktivni primeri'}>
        <EmbeddedNumberInOut
          number={casesActive}
          numIn={casesActiveIn}
          numOut={casesActiveOut}
          suffix=" "
          inBrackets={true}
        />
        .
      </DataRow>
    </div>
  );
}

export default TESTS_ACTIVE;
