import React from 'react';
import Separator from '../Separator';
import Percentage from '../Percentage';
import TitleLine from '../TitleLine';

function FirstTweet({ check_first, labTests, summary }) {
  return (
    <div className={check_first}>
      <TitleLine title={'PCR'}>
        <span className="bold">
          +
          <Separator
            number={labTests[labTests.length - 1].data.regular.positive.today}
          />
        </span>
        , testiranih:{' '}
        <span className="bold">
          <Separator
            number={labTests[labTests.length - 1].data.regular.performed.today}
          />
        </span>
        , delež pozitivnih:{' '}
        <Percentage
          part={labTests[labTests.length - 1].data.regular.positive.today}
          total={labTests[labTests.length - 1].data.regular.performed.today}
        ></Percentage>
        %.
      </TitleLine>
      <TitleLine title={'HAT'}>
        <span className="bold">
          +
          <Separator
            number={labTests[labTests.length - 1].data.hagt.positive.today}
          />
        </span>
        , testiranih:{' '}
        <span className="bold">
          <Separator
            number={labTests[labTests.length - 1].data.hagt.performed.today}
          />
        </span>
        , delež pozitivnih:{' '}
        <Percentage
          part={labTests[labTests.length - 1].data.hagt.positive.today}
          total={labTests[labTests.length - 1].data.hagt.performed.today}
        ></Percentage>
        %.
      </TitleLine>
      <TitleLine title={'Aktivni primeri'}>
        <span className="bold">
          <Separator number={summary.casesActive.value} />
        </span>{' '}
        (+
        <span className="bold">
          <Separator number={summary.casesActive.subValues.in} />
        </span>
        , -
        <span className="bold">
          <Separator number={summary.casesActive.subValues.out} />
        </span>
        ).
      </TitleLine>
    </div>
  );
}

export default FirstTweet;
