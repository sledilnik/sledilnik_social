import React from 'react';
import Separator from '../Separator';
import Translate from '../Translate';
import Delta from '../Delta';
import TitleLine from '../TitleLine';

function SecondTweet({ check_second, stats, patients }) {
  return (
    <div className={check_second}>
      <TitleLine title={'Hospitalizirani'}>
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
      </TitleLine>
      <TitleLine title={'Na respiratorju (intubirani) se'} noColon={true}>
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
      </TitleLine>
      <TitleLine title={'Preminuli'}>
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
      </TitleLine>
    </div>
  );
}

export default SecondTweet;
