import React from 'react';
import { Row } from '../../shared/ui/New';
import Translate from '../../shared/ui/Translate';

function Deceased({ title, subtitle, translate, deceased, deceasedToDate }) {
  return (
    <Row end={false}>
      {title}:<span className="bold">{deceased}</span>, {subtitle}:
      <span className="bold">{deceasedToDate}</span>
    </Row>
  );
}

export default Deceased;
