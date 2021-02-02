import React, { useState } from 'react';

import './List.css';

import Intro from './shared/ui/Intro';
import Outro from './shared/ui/Outro';
import TESTS_ACTIVE from './List/TESTS_ACTIVE';
import HOSPITALIZED_DECEASED from './List/HOSPITALIZED_DECEASED';
import Combined from './List/Combined';
import TrimNewLines from './List/TrimNewLines';

import { formatToLocaleDateString } from '../utils/dates';
import Modal from './Modal';
import Backdrop from './shared/Backdrop';

const Alert = ({ text, close }) => {
  const textList = text
    .split('\n')
    .map((item, index) => <p key={index}>{item}</p>);
  const clickHandler = () => {
    close(false);
    document.body.style.overflow = 'visible';
  };
  return (
    <Modal>
      <Backdrop className="backdrop-alert"></Backdrop>
      <div className="alert-container">
        <div className="bold">V odložišču</div>
        <div id="alert-clipboard" className="alert-clipboard">
          {textList}
        </div>
        <button className="btn modal" onClick={clickHandler}>
          OK
        </button>
      </div>
    </Modal>
  );
};

const List = ({
  statsHook,
  patientsHook,
  municipalitiesHook,
  hospitalsListHook,
  labTestsHook,
  summaryHook,
}) => {
  const [version, setVersion] = useState('FB');
  const [showAlert, setShowAlert] = useState(false);
  const [clipboard, setClipboard] = useState('');

  const introTodayDate = formatToLocaleDateString(new Date(), 'd.M.yyyy');

  const RefreshButton = ({ refetch = [] }) => {
    const clickHandler = () => {
      refetch.forEach(func => func());
    };
    return (
      <button className="btn" onClick={clickHandler}>
        Osveži
      </button>
    );
  };

  const CopyButton = ({ id = '' }) => {
    const copyHandler = id => {
      const section = document.getElementById(id);
      let buttonsText = [...section.getElementsByTagName('button')];

      let text = section.innerText.replace(/(\r\n|\r|\n){2,}/g, '\n');
      buttonsText.forEach(item => {
        text = text.replace(item.innerText + '\n', '');
      });

      const newDiv = document.createElement('textarea');
      newDiv.style = { position: 'relative', left: '-5000%' };
      newDiv.value = text;

      newDiv.select();
      newDiv.setSelectionRange(0, 99999); /* For mobile devices */
      // document.body.removeChild(newDiv);
      document.execCommand('copy');
      document.body.style.overflow = 'hidden';
      setClipboard(text);
      setShowAlert(true);
    };

    return (
      <button
        id={`copy-${id}-btn`}
        className="btn"
        onClick={() => copyHandler(id.toUpperCase())}
      >
        V odložišče
      </button>
    );
  };

  const SocialButton = () => {
    const socialHandler = event => {
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
    return (
      <button id="icons-hos-btn" className="btn social" onClick={socialHandler}>
        Prikaži za TW
      </button>
    );
  };

  return (
    <div className="List">
      <TrimNewLines />
      <section id="LAB" className="post">
        <div className="section-btn">
          <RefreshButton
            refetch={[labTestsHook.refetch, summaryHook.refetch]}
          />
          <CopyButton id="lab" />
        </div>
        <Intro post={1} introTodayDate={introTodayDate} />
        <TESTS_ACTIVE labTestsHook={labTestsHook} summaryHook={summaryHook} />
        <Outro />
      </section>
      <section id="HOS" className="post">
        <div className="section-btn">
          <RefreshButton refetch={[patientsHook.refetch]} />
          <SocialButton />
          <CopyButton id="hos" />
        </div>
        <Intro post={2} introTodayDate={introTodayDate} />
        <HOSPITALIZED_DECEASED patientsHook={patientsHook} version={version} />
        <Outro spark={version === 'FB'} />
        {showAlert && <Alert text={clipboard} close={setShowAlert} />}
      </section>
      <section id="EPI" className="post">
        <div className="section-btn">
          <RefreshButton
            refetch={[
              labTestsHook.refetch,
              summaryHook.refetch,
              patientsHook.refetch,
              statsHook.refetch,
              municipalitiesHook.refetch,
              hospitalsListHook.refetch,
            ]}
          />
          <CopyButton id="epi" />
        </div>
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
