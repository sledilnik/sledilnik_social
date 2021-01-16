import React from 'react';
import Hospitalized from './HOSPITALIZED_DECEASED/Hospitalized';
import OnRespiratory from './HOSPITALIZED_DECEASED/OnRespiratory';
import Deceased from './HOSPITALIZED_DECEASED/Deceased';

function HOSPITALIZED_DECEASED({ check_second, stats, patients }) {
  const hospNum = stats[stats.length - 1].statePerTreatment.inHospital;
  const hospIn = patients[patients.length - 1].total.inHospital.in;
  const hospOut = patients[patients.length - 1].total.inHospital.out;
  const icuNum = stats[stats.length - 1].statePerTreatment.inICU;
  const todayICU = stats[stats.length - 1].statePerTreatment.inICU;
  const yesterdayICU = stats[stats.length - 2].statePerTreatment.inICU;
  const icuDelta = todayICU - yesterdayICU;

  const todayCritical = stats[stats.length - 1].statePerTreatment.critical;
  const yesterdayCritical = stats[stats.length - 2].statePerTreatment.critical;

  const { deceased, deceasedToDate } = stats[
    stats.length - 1
  ].statePerTreatment;

  const negativeHospOut = -hospOut;

  return (
    <div className={check_second}>
      <Hospitalized
        title={'Hospitalizirani'}
        subtitle={'v EIT'}
        hospitalized={hospNum}
        translateText={'oseba'}
        hospitalizedIn={hospIn}
        hospitalizedOut={negativeHospOut}
        icuNum={icuNum}
        icuDelta={icuDelta}
      />
      <OnRespiratory today={todayCritical} yesterday={yesterdayCritical} />
      <Deceased
        title={'Preminuli'}
        subtitle={'skupaj '}
        translate={'oseba'}
        deceased={deceased}
        deceasedToDate={deceasedToDate}
      />
    </div>
  );
}

export default HOSPITALIZED_DECEASED;
