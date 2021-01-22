import React from 'react';
import Hospitalized from './HOSPITALIZED_DECEASED/Hospitalized';
import OnRespiratory from './HOSPITALIZED_DECEASED/OnRespiratory';
import Deceased from './HOSPITALIZED_DECEASED/Deceased';
import {
  formatNumber,
  alwaysSignDisplay,
} from '../../utils/createLocaleNumberFormat';
import InCare from './HOSPITALIZED_DECEASED/InCare';

function HOSPITALIZED_DECEASED({
  check_patients,
  hospitalized,
  onRespiratory,
  inCare,
  deceased,
}) {
  if (!hospitalized || !inCare) {
    return '';
  }

  console.log(inCare);
  return (
    <div className={check_patients}>
      <Hospitalized
        title={'Hospitalizirani'}
        subtitle={'v EIT'}
        hospitalized={formatNumber(hospitalized.hospNum)}
        translateText={'oseba'}
        hospitalizedIn={alwaysSignDisplay(hospitalized.hospIn)}
        hospitalizedOut={alwaysSignDisplay(hospitalized.hospOut)}
        icuNum={formatNumber(hospitalized.icuNum)}
        icuDelta={alwaysSignDisplay(hospitalized.icuDelta)}
      />
      <OnRespiratory
        title={'Na respiratorju'}
        respiratoryTotal={formatNumber(onRespiratory.respiratoryTotal)}
        todayCritical={formatNumber(onRespiratory.todayCritical)}
        criticalDelta={alwaysSignDisplay(onRespiratory.respiratoryDelta)}
        todayNiv={formatNumber(onRespiratory.todayNiv)}
        nivDelta={alwaysSignDisplay(onRespiratory.nivDelta)}
      />
      <InCare
        title={'Negovalne bolnišnice'}
        careNum={formatNumber(inCare.careNum)}
        careIn={alwaysSignDisplay(inCare.careIn)}
        careOut={alwaysSignDisplay(inCare.careOut)}
      />
      <Deceased
        title={'Preminuli'}
        subtitle={'skupaj '}
        translate={'oseba'}
        deceased={alwaysSignDisplay(alwaysSignDisplay(deceased.deceased))}
        deceasedToDate={formatNumber(deceased.deceasedToDate)}
      />
    </div>
  );
}

export default HOSPITALIZED_DECEASED;
