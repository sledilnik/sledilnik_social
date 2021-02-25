import React from 'react';
import DataRow from './DataRow';

function SomethingWentWrong() {
  return <DataRow markFail={true}>Nekaj je narobe!</DataRow>;
}

export default SomethingWentWrong;
