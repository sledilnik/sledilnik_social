import React from 'react';
import Hospitalized from './HOSPITALIZED_DECEASED/Hospitalized';
import OnRespiratory from './HOSPITALIZED_DECEASED/OnRespiratory';
import Deceased from './HOSPITALIZED_DECEASED/Deceased';
import {
  formatNumber,
  alwaysSignDisplay,
} from '../../utils/createLocaleNumberFormat';

function HOSPITALIZED_DECEASED({
  check_patients,
  hospitalized,
  onRespiratory,
  deceased,
}) {
  if (!hospitalized) {
    return '';
  }
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
        today={onRespiratory.todayCritical}
        delta={alwaysSignDisplay(onRespiratory.respiratoryDelta)}
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
