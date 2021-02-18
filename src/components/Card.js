import React, { useState, useEffect } from 'react';

import './Card.css';

import { formatRelative } from 'date-fns';
import { sl } from 'date-fns/locale';

import sledilnikLogo from '../assets/sledilnik-logo.svg';
import copyIcon from '../assets/svg/copy.svg';
import PopOut from './shared/PopOut';

function Card({ id, summary, dates = {}, children, open = false }) {
  const [clipboard, setClipboard] = useState(null);
  const [showPopOut, setShowPopOut] = useState(false);

  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        setShowPopOut(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const sortedDates = [...Object.values(dates)].sort((a, b) => b - a);

  const noDates = Object.values(dates).every(item => item === null);

  const relativeDate = noDates ? (
    <span style={{ opacity: 0, marginLeft: '24px' }}>ni podatka</span>
  ) : (
    formatRelative(new Date(sortedDates[0] * 1000), new Date(), {
      locale: sl,
    })
  );

  const copyHandler = event => {
    const buttonId = event.target.id;
    const postId = buttonId.replace('copy-card', 'post');
    const article = document.getElementById(postId);
    const cardId = buttonId.replace('copy-card', 'card');
    const card = document.getElementById(cardId);
    card.open = true;
    const details = article.getElementsByTagName('details');
    [...details].forEach(item => {
      item.open = true;
    });
    let text = article.innerText.replace(/(\r\n|\r|\n){2,}/g, '\n');
    text = text.slice(-1) === '\n' ? text.slice(0, -1) : text;
    setClipboard(text);
    setShowPopOut(true);
  };

  const selectAndCopy = textarea => {
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    document.execCommand('copy');
  };

  const closeHandler = async () => {
    const textarea = document.getElementById('textarea-copy');
    textarea.value = '';
    navigator.clipboard && (await navigator.clipboard.writeText(''));
    !navigator.clipboard && selectAndCopy(textarea);
    setClipboard('');
    setShowPopOut(false);
  };

  const toClipboardHandler = async () => {
    const textarea = document.getElementById('textarea-copy');
    navigator.clipboard &&
      (await navigator.clipboard.writeText(textarea.value));
    !navigator.clipboard && selectAndCopy(textarea);
    setShowPopOut(false);
  };

  const onDetailsClick = event =>
    event.target.id.includes('copy') && event.preventDefault();

  const buttonId = 'copy-' + id;

  return (
    <details id={id} className="Card" open={open} onClick={onDetailsClick}>
      <summary>
        <div className="summary-container">
          <h2>{summary}</h2>
          <div className="summary-date">Osveženo: {relativeDate}</div>
          <img
            id={buttonId}
            className="copy-icon"
            src={copyIcon}
            width={16}
            height={16}
            onClick={copyHandler}
            alt="copy icon"
          />
        </div>
      </summary>
      {children}
      <img
        src={sledilnikLogo}
        alt="sledilnik logo"
        width="96"
        height="48"
        style={{ display: 'block', margin: '0 auto' }}
      />
      <PopOut open={showPopOut}>
        <div className="popout-container">
          <div className="textarea-container">
            <textarea
              id="textarea-copy"
              readOnly={true}
              rows="10"
              defaultValue={clipboard}
              style={{ width: ' 100%', resize: 'none' }}
            />
          </div>
          <div className="button-container">
            <button onClick={toClipboardHandler}>V odložišče</button>
          </div>
        </div>
        <div className="close" onClick={closeHandler}>
          <div className="line line-1"></div>
          <div className="line line-2"></div>
        </div>
      </PopOut>
    </details>
  );
}

export default Card;
