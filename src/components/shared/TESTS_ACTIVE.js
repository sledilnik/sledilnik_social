import React from 'react';
import Separator from '../List/shared/Separator';
import Percentage from '../List/TESTS_ACTIVE/Percentage';
import DataRow from '../List/shared/DataRow';
import InOut from '../List/shared/InOut';

function TESTS_ACTIVE({ check_first, labTests, summary }) {
  const FirstTweetData = ({ numPositive, numPerformed }) => (
    <>
      <span className="bold">
        +
        <Separator number={numPositive} />
      </span>
      , testiranih:{' '}
      <span className="bold">
        <Separator number={numPerformed} />
      </span>
      , delež pozitivnih:{' '}
      <Percentage part={numPositive} total={numPerformed}></Percentage>
      %.
    </>
  );

  return (
    <div className={check_first}>
      <DataRow title={'PCR'}>
        <FirstTweetData
          numPositive={
            labTests[labTests.length - 1].data.regular.positive.today
          }
          numPerformed={
            labTests[labTests.length - 1].data.regular.performed.today
          }
        />
      </DataRow>
      <DataRow title={'HAT'}>
        <FirstTweetData
          numPositive={labTests[labTests.length - 1].data.hagt.positive.today}
          numPerformed={labTests[labTests.length - 1].data.hagt.performed.today}
        />
      </DataRow>
      <DataRow title={'Aktivni primeri'}>
        <span className="bold">
          <Separator number={summary.casesActive.value} />
        </span>{' '}
        <InOut
          numIn={summary.casesActive.subValues.in}
          numOut={summary.casesActive.subValues.out}
          insideColons={true}
        />
        .
      </DataRow>
    </div>
  );
}

export default TESTS_ACTIVE;
