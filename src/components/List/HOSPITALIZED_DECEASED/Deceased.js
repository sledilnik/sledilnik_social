import React from 'react';
import { Row } from '../../shared/ui/New';

function Deceased({ title, subtitle, translate, deceased, deceasedToDate }) {
  return (
    <Row>
      {title}: <span className="bold">{deceased}</span>, {subtitle}:{' '}
      <span className="bold">{deceasedToDate}</span>
    </Row>
  );
}

export default Deceased;
