import React, { useState } from 'react';

import './List.css';

import Intro from './shared/ui/Intro';
import Outro from './shared/ui/Outro';
import TESTS_ACTIVE from './List/TESTS_ACTIVE';
import HOSPITALIZED_DECEASED from './List/HOSPITALIZED_DECEASED';
import Combined from './List/Combined';

import { formatToLocaleDateString } from '../utils/dates';
import TrimNewLines from './List/TrimNewLines';

const List = ({
  statsHook,
  patientsHook,
  municipalitiesHook,
  hospitalsListHook,
  labTestsHook,
  summaryHook,
}) => {
  const [version, setVersion] = useState('FB');

  const introTodayDate = formatToLocaleDateString(new Date(), 'd.M.yyyy');

  const Refresh = ({ refetch = [] }) => {
    const clickHandler = () => {
      refetch.forEach(func => func());
    };
    return (
      <button className="btn" onClick={clickHandler}>
        Osveži
      </button>
    );
  };

  const iconsSwitchHandler = event => {
    const { target } = event;
    setVersion(prev => {
      if (prev === 'FB') {
        target.innerHTML = 'Prikaži za FB';
        return 'TW';
      }
      if (prev === 'TW') {
        target.innerHTML = 'Prikaži za TW';
        return 'FB';
      }
    });
  };

  const copyHandler = id => {
    const section = document.getElementById(id);
    let buttonsText = [...section.getElementsByTagName('button')]
      .map(item => item.innerText)
      .join('');
    const iconsTextTW = 'Prikaži TW ikone';
    const iconsTextFB = 'Prikaži FB ikone';
    buttonsText = buttonsText.replace(iconsTextTW, '').replace(iconsTextFB, '');

    const text = section.innerText
      .replace(buttonsText + '\n', '')
      .replace(iconsTextTW + '\n', '')
      .replace(iconsTextFB + '\n', '')
      .replace(/(\r\n|\r|\n){2,}/g, '\n');
    const newDiv = document.createElement('textarea');
    newDiv.style = { position: 'relative', left: '-5000%' };
    newDiv.value = text;
    document.body.appendChild(newDiv);

    newDiv.select();
    newDiv.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand('copy');
    document.body.removeChild(newDiv);
    alert(`"${text}"\n\nje v odložišču!`);
  };

  return (
    <div className="List">
      <TrimNewLines />
      <section id="LAB" className="post">
        <Refresh refetch={[labTestsHook.refetch, summaryHook.refetch]} />
        <button
          className="btn"
          style={{
            margin: '0 8px',
          }}
          onClick={() => copyHandler('LAB')}
        >
          V odložišče
        </button>
        <Intro post={1} introTodayDate={introTodayDate} />
        <TESTS_ACTIVE labTestsHook={labTestsHook} summaryHook={summaryHook} />
        <Outro />
      </section>
      <section id="HOS" className="post">
        <Refresh refetch={[patientsHook.refetch]} />
        <button
          className="btn"
          onClick={iconsSwitchHandler}
          style={{
            margin: '0 8px',
            color: 'var(--white)',
            backgroundColor: '#1877f2',
          }}
        >
          Prikaži za TW
        </button>
        <button
          className="btn"
          style={{
            margin: '0 8px',
          }}
          onClick={() => copyHandler('HOS')}
        >
          V odložišče
        </button>
        <Intro post={2} introTodayDate={introTodayDate} />
        <HOSPITALIZED_DECEASED patientsHook={patientsHook} version={version} />
        <Outro spark={version === 'FB'} />
      </section>
      <section id="EPI" className="post">
        <Refresh
          refetch={[
            labTestsHook.refetch,
            summaryHook.refetch,
            patientsHook.refetch,
            statsHook.refetch,
            municipalitiesHook.refetch,
            hospitalsListHook.refetch,
          ]}
        />
        <button
          className="btn"
          style={{
            margin: '0 8px',
          }}
          onClick={() => copyHandler('EPI')}
        >
          V odložišče
        </button>
        <Intro post={3} introTodayDate={introTodayDate} />
        <Combined
          statsHook={statsHook}
          summaryHook={summaryHook}
          patientsHook={patientsHook}
          labTestsHook={labTestsHook}
          municipalitiesHook={municipalitiesHook}
          hospitalsListHook={hospitalsListHook}
        />
        <Outro />
      </section>
    </div>
  );
};

function withListHOC(Component) {
  return ({ ...props }) => {
    return <Component {...props} />;
  };
}

export default withListHOC(List);
