import React from 'react';
import Arrow from '../Arrow';
import Separator from '../Separator';
import Percentage from '../Percentage';

function FirstTweet({ check_first, labTests, summary }) {
  return (
    <div className={check_first}>
      <p className="text">
        <Arrow /> PCR:{' '}
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
      </p>

      <p className="text">
        <Arrow /> HAT:{' '}
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
      </p>

      <p className="text">
        <Arrow /> Aktivni primeri:{' '}
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
        {/* , +
          <span className="bold">
            {stats[stats.length - 1].statePerTreatment.deceased}
          </span>{" "}
          <Translate
            text={"preminula oseba"}
            number={stats[stats.length - 1].statePerTreatment.deceased}
          ></Translate> */}
        {/* ), skupno{" "}
          <span className="bold">
            <Separator number={stats[stats.length - 2].cases.confirmedToDate} />
          </span>{" "}
          potrjenih primerov. */}
      </p>
    </div>
  );
}

export default FirstTweet;
