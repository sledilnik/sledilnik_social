import React, { useState, useRef, useContext, useEffect } from 'react';

import './Card.css';

import { formatRelative } from 'date-fns';
import { sl } from 'date-fns/locale';

import sledilnikLogo from '../assets/svg/sledilnik-logo.svg';
import copyIcon from '../assets/svg/copy.svg';
import ToClipboard from './shared/ToClipboard';
import TweetCount from './shared/TweetCount';
import { SocialContext } from './../context/SocialContext';

function Card({
  id,
  summary,
  dates = {},
  children,
  open = false,
  noCount = true,
}) {
  const detailsRef = useRef();
  const toClipboardButtonRef = useRef();

  const { social } = useContext(SocialContext);

  const [clipboard, setClipboard] = useState('');
  const [showPopOut, setShowPopOut] = useState(false);
  const [showCharCount, setShowCharCount] = useState(null);

  const isOpen = detailsRef?.current?.open;
  useEffect(() => {
    setShowCharCount(social === 'TW' && isOpen && !noCount);
  }, [social, noCount, isOpen]);

  useEffect(() => {
    const article = document.getElementById('post-' + id);
    const innerText = article ? article.innerText : '';
    let text =
      social === 'TW' ? innerText.replace(/(\r\n|\r|\n){2,}/g, '\n') : '';
    text = text.slice(-1) === '\n' ? text.slice(0, -1) : text;
    setClipboard(text);
  }, [id, social, showCharCount]);

  const openPopOutHandler = event => {
    const buttonId = event.target.id;
    const postId = buttonId.replace('copy-card', 'post');
    const article = document.getElementById(postId);
    detailsRef.current.open = true;
    const details = article.getElementsByTagName('details');
    [...details].forEach(item => {
      item.open = true;
    });
    let text = article.innerText.replace(/(\r\n|\r|\n){2,}/g, '\n');
    text = text.slice(-1) === '\n' ? text.slice(0, -1) : text;
    setClipboard(text);
    setShowPopOut(true);
  };

  const onDetailsClick = event => {
    const { target } = event;
    const { current: copyButton } = toClipboardButtonRef;
    const { current: details } = detailsRef;

    if (target.dataset.open !== 'open' && target.id !== copyButton.id) {
      return;
    }

    event.preventDefault();
    if (target.id === copyButton.id) {
      details.open = true;
      return;
    }

    details.open = !details.open;
    details.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
    setShowCharCount(social === 'TW' && details.open);
  };

  const latestDate =
    dates && [...Object.values(dates)].sort((a, b) => a - b).pop();

  const relativeDate =
    latestDate !== null &&
    formatRelative(new Date(latestDate * 1000), new Date(), {
      locale: sl,
    });

  const cardId = 'card-' + id;
  const summaryId = 'summary-' + cardId;
  const buttonId = 'copy-' + cardId;

  return (
    <details
      ref={detailsRef}
      id={cardId}
      className="Card"
      open={open}
      onClick={onDetailsClick}
    >
      <summary id={summaryId} data-open="open">
        <div className="summary-container" data-open="open">
          <h2 data-open="open">{summary}</h2>
          {showCharCount && <TweetCount text={clipboard} />}
          <img
            id={buttonId}
            ref={toClipboardButtonRef}
            className="copy-icon"
            src={copyIcon}
            width={16}
            height={16}
            onClick={openPopOutHandler}
            alt="copy icon"
          />
        </div>
        <div className="summary-container " data-open="open">
          {relativeDate && (
            <div data-open="open" className="summary-date">
              Osveženo: {relativeDate}
            </div>
          )}
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
      <ToClipboard
        open={showPopOut}
        defaultValue={clipboard}
        clear={() => setClipboard('')}
        close={() => setShowPopOut(false)}
      />
    </details>
  );
}

function withCardHOC(Component) {
  const WithCard = ({ ...props }) => {
    return <Component {...props} />;
  };
  return WithCard;
}
export default withCardHOC(Card);
