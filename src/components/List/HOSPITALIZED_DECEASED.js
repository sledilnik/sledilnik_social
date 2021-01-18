import React from 'react';
import Hospitalized from './HOSPITALIZED_DECEASED/Hospitalized';
import OnRespiratory from './HOSPITALIZED_DECEASED/OnRespiratory';
import Deceased from './HOSPITALIZED_DECEASED/Deceased';
import {
  formatNumber,
  alwaysSignDisplay,
} from '../../utils/createLocaleNumberFormat';

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

  const respiratoryDelta = todayCritical - yesterdayCritical;

  return (
    <div className={check_second}>
      <Hospitalized
        title={'Hospitalizirani'}
        subtitle={'v EIT'}
        hospitalized={formatNumber(hospNum)}
        translateText={'oseba'}
        hospitalizedIn={alwaysSignDisplay(hospIn)}
        hospitalizedOut={alwaysSignDisplay(negativeHospOut)}
        icuNum={formatNumber(icuNum)}
        icuDelta={alwaysSignDisplay(icuDelta)}
      />
      <OnRespiratory
        today={todayCritical}
        delta={alwaysSignDisplay(respiratoryDelta)}
      />
      <Deceased
        title={'Preminuli'}
        subtitle={'skupaj '}
        translate={'oseba'}
        deceased={alwaysSignDisplay(alwaysSignDisplay(deceased))}
        deceasedToDate={formatNumber(deceasedToDate)}
      />
    </div>
  );
}

export default HOSPITALIZED_DECEASED;
