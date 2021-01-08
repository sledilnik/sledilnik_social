import React from 'react';
import Separator from '../Separator';
import Percentage from '../Percentage';
import TitleLine from '../TitleLine';
import InOut from '../InOut';

function FirstTweet({ check_first, labTests, summary }) {
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
      <TitleLine title={'PCR'}>
        <FirstTweetData
          numPositive={
            labTests[labTests.length - 1].data.regular.positive.today
          }
          numPerformed={
            labTests[labTests.length - 1].data.regular.performed.today
          }
        />
      </TitleLine>
      <TitleLine title={'HAT'}>
        <FirstTweetData
          numPositive={labTests[labTests.length - 1].data.hagt.positive.today}
          numPerformed={labTests[labTests.length - 1].data.hagt.performed.today}
        />
      </TitleLine>
      <TitleLine title={'Aktivni primeri'}>
        <span className="bold">
          <Separator number={summary.casesActive.value} />
        </span>{' '}
        <InOut
          numIn={summary.casesActive.subValues.in}
          numOut={summary.casesActive.subValues.out}
          insideColons={true}
        />
        .
      </TitleLine>
    </div>
  );
}

export default FirstTweet;
