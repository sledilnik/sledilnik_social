import React, { useState } from 'react';

import './List.css';

import Intro from './shared/ui/Intro';
import Outro from './shared/ui/Outro';
import TESTS_ACTIVE from './List/TESTS_ACTIVE';
import HOSPITALIZED_DECEASED from './List/HOSPITALIZED_DECEASED';
import Combined from './List/Combined';
import TrimNewLines from './List/TrimNewLines';

import { formatToLocaleDateString } from '../utils/dates';
import Modal from './shared/Modal';
import Backdrop from './shared/Backdrop';

const selectAndCopy = textarea => {
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length); /* For mobile devices */
  document.execCommand('copy');
};

const Alert = ({ text, setShowAlert }) => {
  const textList = text
    .split('\n')
    .map((item, index) => <p key={index}>{item}</p>);

  const clickHandler = () => {
    if (!navigator.clipboard) {
      const textarea = document.getElementById('copyText');
      textarea.value = text.replace(/(\r\n|\r|\n){2,}/g, '\n');
      selectAndCopy(textarea);
      textarea.value = '';
    }
    setShowAlert(false);
    document.body.style.overflow = 'visible';
  };

  const closeHandler = async () => {
    navigator.clipboard && (await navigator.clipboard.writeText(''));
    if (!navigator.clipboard) {
      const textarea = document.getElementById('copyText');
      textarea.value = '';
    }
    setShowAlert(false);
    document.body.style.overflow = 'visible';
  };

  return (
    <Modal>
      <Backdrop className="backdrop-alert"></Backdrop>
      <div className="alert-container">
        <div className="bold">Trenutno v odložišču ({text.length}):</div>
        <div id="alert-clipboard" className="alert-clipboard post">
          {textList}
        </div>
        <div>
          <textarea
            id="copyText"
            readOnly
            style={{
              position: 'relative',
              left: '-5000%',
            }}
            value={text}
          />
        </div>
        <div>
          <button className="btn modal" onClick={clickHandler}>
            <span className="tooltipText">Ostane v odložišču.</span>
            OK
          </button>
          <button className="btn modal cancel" onClick={closeHandler}>
            Zapri<span className="tooltipText">Počisti odložišče.</span>
          </button>
        </div>
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
    const copyHandler = async id => {
      const section = document.getElementById(id);
      // ? section.innerText.length is the same on mobile and PC
      let text = section.innerText.replace(/(\r\n|\r|\n){2,}/g, '\n');
      // ? text.length on mobile < text.length on PC; diff = 3
      text = text.slice(-1) === '\n' ? text.slice(0, -1) : text;
      let buttonsText = [...section.getElementsByTagName('button')];
      buttonsText.forEach(item => {
        text = text.replace(item.innerText + '\n', '');
      });

      navigator.clipboard && (await navigator.clipboard.writeText(text));
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
      {showAlert && <Alert text={clipboard} setShowAlert={setShowAlert} />}
    </div>
  );
};

function withListHOC(Component) {
  return ({ ...props }) => {
    return <Component {...props} />;
  };
}

export default withListHOC(List);
