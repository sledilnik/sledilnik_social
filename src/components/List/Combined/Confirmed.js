import React from 'react';

import { Row } from '../../shared/ui/New';

function Confirmed({ confirmed, check_stats }) {
  return (
    <Row className={check_stats}>Skupaj: {confirmed} potrjenih primerov</Row>
  );
}

export default Confirmed;
