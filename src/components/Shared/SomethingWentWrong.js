import React from 'react';
import DataRow from 'components/Shared/DataRow';

function SomethingWentWrong({ title = '' }) {
  const text = title && typeof title === 'string' && `${title}: `;
  return <DataRow markFail={true}>{text}Nekaj je šlo narobe!</DataRow>;
}

export default SomethingWentWrong;
