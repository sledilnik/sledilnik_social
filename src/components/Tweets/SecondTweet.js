import React from 'react';
import Arrow from '../Arrow';
import Separator from '../Separator';
import Translate from '../Translate';
import Delta from '../Delta';

function SecondTweet({ check_second, stats, patients }) {
  return (
    <div className={check_second}>
      <p className="text">
        <Arrow /> Hospitalizirani:{' '}
        <span className="bold">
          <Separator
            number={stats[stats.length - 1].statePerTreatment.inHospital}
          />
        </span>{' '}
        <Translate
          text={'oseba'}
          number={stats[stats.length - 1].statePerTreatment.inHospital}
        ></Translate>{' '}
        (+
        <span className="bold">
          <Separator
            number={patients[patients.length - 1].total.inHospital.in}
          />
        </span>
        , -
        <span className="bold">
          <Separator
            number={patients[patients.length - 1].total.inHospital.out}
          />
        </span>
        ), v EIT{' '}
        <span className="bold">
          <Separator number={stats[stats.length - 1].statePerTreatment.inICU} />
        </span>{' '}
        <Translate
          text={'oseba'}
          number={stats[stats.length - 1].statePerTreatment.inICU}
        ></Translate>{' '}
        (
        <Delta
          today={stats[stats.length - 1].statePerTreatment.inICU}
          yesterday={stats[stats.length - 2].statePerTreatment.inICU}
          getPrefix={true}
          noChanges={true}
        ></Delta>
        ).
      </p>

      <p className="text">
        <Arrow /> Na respiratorju (intubirani) se{' '}
        <Translate
          text={'zdravi'}
          number={stats[stats.length - 1].statePerTreatment.critical}
        ></Translate>{' '}
        <span className="bold">
          <Separator
            number={stats[stats.length - 1].statePerTreatment.critical}
          />
        </span>{' '}
        <Translate
          text={'oseba'}
          number={stats[stats.length - 1].statePerTreatment.critical}
        ></Translate>{' '}
        (
        <Delta
          today={stats[stats.length - 1].statePerTreatment.critical}
          yesterday={stats[stats.length - 2].statePerTreatment.critical}
          getPrefix={true}
          noChanges={true}
        ></Delta>
        ).
      </p>

      <p className="text">
        <Arrow /> Preminuli:{' '}
        {stats[stats.length - 1].statePerTreatment.deceased > 0 ? '+' : ''}
        <span className="bold">
          <Separator
            number={stats[stats.length - 1].statePerTreatment.deceased}
          />
        </span>{' '}
        <Translate
          text={'oseba'}
          number={stats[stats.length - 1].statePerTreatment.deceased}
        ></Translate>
        , skupaj:{' '}
        <span className="bold">
          <Separator
            number={stats[stats.length - 1].statePerTreatment.deceasedToDate}
          />
        </span>
        .
      </p>
    </div>
  );
}

export default SecondTweet;
