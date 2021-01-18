import React from 'react';

import { Row } from '../../shared/ui/New';

function Confirmed({ confirmed }) {
  return <Row>Skupaj: {confirmed} potrjenih primerov</Row>;
}

export default Confirmed;
