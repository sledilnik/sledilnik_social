import React from 'react';
import Separator from '../Separator';
import Translate from '../Translate';
import Delta from '../Delta';
import TitleLine from '../TitleLine';

function SecondTweet({ check_second, stats, patients }) {
  const DataTranslate = ({ number, text }) => (
    <>
      <span className="bold">
        <Separator number={number} />
      </span>{' '}
      <Translate text={text} number={number}></Translate>{' '}
    </>
  );

  const InOut = ({ numPositive, numNegative }) => (
    <span className="bold">
      +<Separator number={numPositive} /> -<Separator number={numNegative} />
    </span>
  );

  return (
    <div className={check_second}>
      <TitleLine title={'Hospitalizirani'}>
        <DataTranslate
          number={stats[stats.length - 1].statePerTreatment.inHospital}
          text={'oseba'}
        />
        (
        <InOut
          numPositive={patients[patients.length - 1].total.inHospital.in}
          numNegative={patients[patients.length - 1].total.inHospital.out}
        />
        ), v EIT{' '}
        <DataTranslate
          number={stats[stats.length - 1].statePerTreatment.inICU}
          text={'oseba'}
        />
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
        <DataTranslate
          number={stats[stats.length - 1].statePerTreatment.critical}
          text={'oseba'}
        />{' '}
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
        <DataTranslate
          number={stats[stats.length - 1].statePerTreatment.deceased}
          text={'oseba'}
        />
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
