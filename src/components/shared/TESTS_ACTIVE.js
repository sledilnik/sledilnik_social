import React from 'react';
import DataRow from '../List/shared/DataRow';
import StyledNumberWithInOut from '../List/shared/StyledNumberWithInOut';
import DataPercentage from '../List/shared/DataPercentage';

function TESTS_ACTIVE({ check_first, labTests, summary }) {
  const { regular, hagt } = labTests[labTests.length - 1].data;
  const casesActive = summary.casesActive.value;
  const casesActiveIn = summary.casesActive.subValues.in;
  const casesActiveOut = summary.casesActive.subValues.out;

  return (
    <div className={check_first}>
      <DataRow title={'PCR'}>
        <DataPercentage
          numPositive={regular.positive.today}
          numPerformed={regular.performed.today}
        />
        .
      </DataRow>
      <DataRow title={'HAT'}>
        <DataPercentage
          numPositive={hagt.positive.today}
          numPerformed={hagt.performed.today}
        />
        .
      </DataRow>
      <DataRow title={'Aktivni primeri'}>
        <StyledNumberWithInOut
          number={casesActive}
          numIn={casesActiveIn}
          numOut={casesActiveOut}
          suffix=" "
          insideColons={true}
        />
        .
      </DataRow>
    </div>
  );
}

export default TESTS_ACTIVE;
