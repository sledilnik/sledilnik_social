import React from 'react';

import { Row, Brackets } from '../../shared/ui/New';
import { formatNumber } from '../../../utils/formatNumber';

function PerAge({ check_stats, title, todayPerAge, yesterdayPerAge }) {
  // ? move logic to Combined
  const deltas = todayPerAge.map((item, i) => {
    const { ageFrom, ageTo } = item;
    const ageRange = `${ageFrom}${ageTo ? `-${ageTo}` : '+'}`;
    const today = item.allToDate;
    const yesterday = yesterdayPerAge[i].allToDate;
    const delta = today - yesterday;
    return (
      <span key={`${i}_${ageRange}`}>
        {' '}
        {ageRange}{' '}
        <span className="bold">
          <Brackets>{isNaN(delta) ? '-' : formatNumber(delta)}</Brackets>
        </span>
        {i !== 9 ? ',' : ''}
      </span>
    );
  });

  return (
    <Row className={check_stats}>
      {title}: {deltas}
    </Row>
  );
}

export default PerAge;
