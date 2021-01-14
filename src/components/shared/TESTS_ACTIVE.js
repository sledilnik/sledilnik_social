import React from 'react';
import DataRow from '../List/shared/DataRow';
import EmbeddedNumberInOut from '../List/shared/EmbeddedNumberInOut';
import DataPercentage from '../List/shared/DataPercentage';

function TESTS_ACTIVE({ check_first, labTests, summary }) {
  const { regular, hagt } = labTests[labTests.length - 1].data;
  const casesActive = summary.casesActive.value;
  const casesActiveIn = summary.casesActive.subValues.in;
  const casesActiveOut = summary.casesActive.subValues.out;

  const defaults = {
    number: undefined,
    prefix: '',
    suffix: ', ',
    preSign: false,
  };

  function PercentageRow({
    title = '',
    numeratorOptions = { ...defaults },
    denominatorOptions = { ...defaults },
  }) {
    return (
      <DataRow title={title}>
        <DataPercentage
          numeratorOptions={numeratorOptions}
          denominatorOptions={denominatorOptions}
        />
        .
      </DataRow>
    );
  }

  const { today: regToday } = regular.positive;
  const { today: regPerformed } = regular.performed;
  const { today: hagtToday } = hagt.positive;
  const { today: hagtPerformed } = hagt.performed;

  const options1 = {
    suffix: ', ',
    preSign: true,
  };

  const options2 = {
    prefix: 'testiranih: ',
    suffix: ', delež pozitivnih: ',
  };

  const regPositiveData = {
    number: regToday,
    ...options1,
  };

  const regPerformedData = {
    number: regPerformed,
    ...options2,
  };

  const hagtPositiveData = {
    number: hagtToday,
    ...options1,
  };

  const hagtPerformedData = {
    number: hagtPerformed,
    ...options2,
  };

  return (
    <div className={check_first}>
      <PercentageRow
        title={'PCR'}
        numeratorOptions={regPositiveData}
        denominatorOptions={regPerformedData}
      />
      <PercentageRow
        title={'HAT'}
        numeratorOptions={hagtPositiveData}
        denominatorOptions={hagtPerformedData}
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
