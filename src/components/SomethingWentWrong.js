import React from 'react';
import DataRow from './DataRow';

function SomethingWentWrong({ title = '' }) {
  const text = title && typeof title === 'string' && `${title}: `;
  return <DataRow markFail={true}>{text}Nekaj je šlo narobe!</DataRow>;
}

export default SomethingWentWrong;
