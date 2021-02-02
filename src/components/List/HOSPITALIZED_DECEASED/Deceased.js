import React from 'react';
import { Row } from '../../shared/ui/New';

function Deceased({ text, subtitle, deceased, deceasedToDate }) {
  const { title, subtitle1 } = text;
  const titleText = Object.values(title).join('');
  const subtitle1Text = Object.values(subtitle1).join('');
  return (
    <Row>
      {titleText}
      <span className="bold">{deceased}</span>
      {subtitle1Text}
      <span className="bold">{deceasedToDate}</span>
    </Row>
  );
}

export default Deceased;
