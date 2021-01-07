import React from 'react';

import PerAgeLine from '../PerAgeLine';
import MunicipalitiesLines from '../MunicipalitiesLines';
import PatientsLine from '../PatientsLine';

function ThirdTweet({
  check_second,
  check_third_age,
  check_third_mun,
  stats,
  patients,
  municipalities,
  perHospitalChanges,
}) {
  const todayPerAge = stats[stats.length - 2].statePerAgeToDate;
  const yesterdayPerAge = stats[stats.length - 3].statePerAgeToDate;

  return (
    <div>
      <PerAgeLine
        check_third_age={check_third_age}
        todayPerAge={todayPerAge}
        yesterdayPerAge={yesterdayPerAge}
      />
      <PatientsLine
        check_second={check_second}
        patients={patients}
        perHospitalChanges={perHospitalChanges}
      />
      <MunicipalitiesLines
        check_third_mun={check_third_mun}
        municipalities={municipalities}
      />
    </div>
  );
}

export default ThirdTweet;
