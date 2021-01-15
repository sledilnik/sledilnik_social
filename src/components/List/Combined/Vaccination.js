import React from 'react';
import EmbeddedNumberInOut from '../../shared/ui/EmbeddedNumberInOut';
import Arrow from '../../shared/ui/Arrow';
import DataRow from '../../shared/ui/DataRow';

const isUndefined = value => value === undefined;

const isOneArgumentUndefined = (values = {}) => {
  let result = false;
  for (const [key, value] of Object.entries(values)) {
    const valueIsUndefined = isUndefined(value);
    if (valueIsUndefined) {
      console.warn(`Argument: ${key} is undefined!`);
      result = true;
    }
  }
  return result;
};

// TODO use DataRow
function NoData({ text, html = { tag: 'span', classes: '' } }) {
  if (html.tag === 'span') {
    return <span className={html.classes}>{text}</span>;
  }
  if (html.tag === 'p') {
    return (
      <p className={html.classes}>
        <Arrow /> {text}
      </p>
    );
  }
  return;
}

function Vaccination({ toDate, today }) {
  const showNoData = isOneArgumentUndefined({ toDate, today });
  const title = 'Število cepljenih oseb';

  return (
    <>
      {showNoData ? (
        <NoData
          text={'Ni vseh podatkov za cepljene osebe.'}
          html={{ classes: 'text', tag: 'p' }}
        />
      ) : (
        <DataRow title={title}>
          <EmbeddedNumberInOut
            suffix={' '}
            number={toDate}
            numIn={today}
            inBrackets={true}
          />
        </DataRow>
      )}
    </>
  );
}

export default Vaccination;
