import React, { useState, useEffect } from 'react';

import './Card.css';

import { formatRelative } from 'date-fns';
import { sl } from 'date-fns/locale';

import sledilnikLogo from '../assets/sledilnik-logo.svg';
import PopOut from './shared/PopOut';

const Logo = ({
  src = sledilnikLogo,
  alt = 'logo',
  width = '96',
  height = '96',
}) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    style={{ display: 'block', margin: '0 auto' }}
  />
);

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
    let text = article.innerText.replace(/(\r\n|\r|\n){2,}/g, '\n');
    text = text.slice(-1) === '\n' ? text.slice(0, -1) : text;
    setClipboard(text);
    setShowPopOut(true);
  };

  const buttonId = 'copy-' + id;

  return (
    <details id={id} className="Card" open={open}>
      <summary>
        <div>Osveženo: {relativeDate}</div>
        <h2>{summary}</h2>
        <button id={buttonId} onClick={copyHandler}>
          V odložišče
        </button>
      </summary>
      {children}
      <Logo />
      <PopOut open={showPopOut}>
        <div className="textarea-container">
          <textarea
            readOnly={true}
            rows="10"
            defaultValue={clipboard}
            style={{ width: ' 100%', resize: 'vertical' }}
          />
        </div>
      </PopOut>
    </details>
  );
}

export default Card;
