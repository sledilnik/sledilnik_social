import React from 'react';
import Hospitalized from './HOSPITALIZED_DECEASED/Hospitalized';
import OnRespiratory from './HOSPITALIZED_DECEASED/OnRespiratory';
import Deceased from './HOSPITALIZED_DECEASED/Deceased';
import { formatNumber, formatNumberWithSign } from '../../utils/formatNumber';
import InCare from './HOSPITALIZED_DECEASED/InCare';

function HOSPITALIZED_DECEASED({
  check_patients,
  hospitalized,
  onRespiratory,
  inCare,
  deceased,
}) {
  if (!hospitalized) {
    return '';
  }

  return (
    <div className={check_patients}>
      <Hospitalized
        title={'Hospitalizirani'}
        subtitle={'EIT'}
        hospitalized={formatNumber(hospitalized.hospNum)}
        hospitalizedIn={formatNumberWithSign(hospitalized.hospIn)}
        hospitalizedOut={formatNumberWithSign(hospitalized.hospOut)}
        icuNum={formatNumber(hospitalized.icuNum)}
        icuDelta={formatNumberWithSign(hospitalized.icuDelta)}
      />
      <OnRespiratory
        title={'Na respiratorju'}
        respiratoryTotal={formatNumber(onRespiratory.respiratoryTotal)}
        todayCritical={formatNumber(onRespiratory.todayCritical)}
        criticalDelta={formatNumberWithSign(onRespiratory.respiratoryDelta)}
        todayNiv={formatNumber(onRespiratory.todayNiv)}
        nivDelta={formatNumberWithSign(onRespiratory.nivDelta)}
      />
      <InCare
        title={'Negovalne bolnišnice'}
        careNum={!isNaN(inCare?.careNum) && formatNumber(inCare?.careNum)}
        careIn={!isNaN(inCare?.careIn) && formatNumberWithSign(inCare?.careIn)}
        careOut={
          !isNaN(inCare?.careOut) && formatNumberWithSign(inCare?.careOut)
        }
      />
      <Deceased
        title={'Preminuli'}
        subtitle={'skupaj'}
        deceased={formatNumberWithSign(formatNumberWithSign(deceased.deceased))}
        deceasedToDate={formatNumber(deceased.deceasedToDate)}
      />
    </div>
  );
}

export default HOSPITALIZED_DECEASED;
