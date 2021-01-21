import React from 'react';
import { Row } from '../../shared/ui/New';
import Translate from '../../shared/ui/Translate';

function Deceased({ title, subtitle, translate, deceased, deceasedToDate }) {
  return (
    <Row>
      {title}: <span className="bold">{deceased} </span>
      <Translate text={translate} number={deceased} />, {subtitle}:{' '}
      <span className="bold">{deceasedToDate}</span>
    </Row>
  );
}

export default Deceased;
