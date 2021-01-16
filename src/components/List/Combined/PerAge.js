import React from 'react';

import { Row, Text, Brackets, Bold, LocaleNumber } from '../../shared/ui/New';

function PerAge({ check_third_age, title, todayPerAge, yesterdayPerAge }) {
  const deltas = [];

  for (let i = 0; i < 10; i++) {
    const { ageFrom, ageTo } = todayPerAge[i];
    const ageRange = `${ageFrom}${ageTo ? `-${ageTo}` : '+'}`;
    const key = `${i}_${ageRange}`;
    const today = todayPerAge[i].allToDate;
    const yesterday = yesterdayPerAge[i].allToDate;

    const delta = today - yesterday;
    const _delta = (
      <span key={key}>
        {' '}
        {ageRange}{' '}
        <Bold>
          <Brackets>
            <LocaleNumber number={delta} />
          </Brackets>
        </Bold>
        {i !== 9 ? ',' : ''}
      </span>
    );
    deltas.push(_delta);
  }

  return (
    <span className={check_third_age}>
      <Row>
        <Text>{title}: </Text>
        {deltas}
      </Row>
    </span>
  );
}

export default PerAge;
