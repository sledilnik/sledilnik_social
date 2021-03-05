import React, { useState, useRef, useContext, useEffect } from 'react';

import './Card.css';

import { formatRelative } from 'date-fns';
import { sl } from 'date-fns/locale';

import sledilnikLogo from '../assets/svg/sledilnik-logo.svg';

import ToClipboard from './shared/ToClipboard';
import TweetCount from './shared/TweetCount';
import TextWithTooltip from './TextWithTooltip';

import { SocialContext } from './../context/SocialContext';

const removeConsecutiveNewLines = text => {
  const step1 = text.replace(/(\r\n|\r|\n){2,}/g, '\n');
  return step1.slice(-1) === '\n' ? step1.slice(0, -1) : step1;
};

const Card = React.forwardRef(
  ({ id, open, summary, footer, popout, ...props }, ref) => {
    return (
      <details
        ref={ref}
        id={id}
        className="Card"
        open={open}
        onClick={props.onClick}
      >
        {summary}
        {props.children}
        {footer}
        {popout}
      </details>
    );
  }
);

const getTimestamp = dates => {
  const MILLISECONDS = 1000;
  const latestDate =
    dates && [...Object.entries(dates)].sort((a, b) => a[1] - b[1]).pop();
  const relativeDate =
    latestDate[1] !== null &&
    formatRelative(new Date(latestDate[1] * MILLISECONDS), new Date(), {
      locale: sl,
    });
  const timestampPath = `/${latestDate[0]}`;
  return { relativeDate, path: timestampPath };
};

function withCardHOC(Component) {
  const WithCard = ({
    title,
    dates,
    open = false,
    noCount = true,
    refreshHandler = () => {},
    ...props
  }) => {
    const { postRef } = props;
    const detailsRef = useRef();
    const toClipboardButtonRef = useRef();
    const refreshButtonRef = useRef();

    const [showCharCount, setShowCharCount] = useState(null);
    const [clipboard, setClipboard] = useState(postRef.current?.innerText);
    const [showPopOut, setShowPopOut] = useState(false);
    const { social } = useContext(SocialContext);

    const isOpen = detailsRef?.current?.open;

    useEffect(() => {
      setShowCharCount(social === 'TW' && isOpen && !noCount);
    }, [social, isOpen, noCount]);

    const text = postRef.current?.innerText;
    useEffect(() => {
      if (!text) {
        return;
      }
      setClipboard(removeConsecutiveNewLines(text));
    }, [text]);

    const openPopOutHandler = () => {
      const article = postRef.current;
      detailsRef.current.open = true;
      const details = article.getElementsByTagName('details');
      [...details].forEach(item => {
        item.open = true;
      });

      setClipboard(removeConsecutiveNewLines(article.innerText));
      setShowPopOut(true);
    };

    const onDetailsClick = event => {
      const { target } = event;
      const { current: copyButton } = toClipboardButtonRef;
      const { current: refreshButton } = refreshButtonRef;
      const { current: details } = detailsRef;
      event.preventDefault();

      details.open =
        target.id === copyButton.id || target.id === refreshButton.id
          ? (details.open = true)
          : !details.open;
      details.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });

      setClipboard(removeConsecutiveNewLines(postRef.current.innerText));
      setShowCharCount(social === 'TW' && details.open && !noCount);
    };

    const cardTitle = <h2>{title}</h2>;

    const cardId = `card-${title.toLowerCase()}`;
    const counter = showCharCount && (
      <TweetCount key={`${cardId}-counter`} text={clipboard} />
    );
    const refreshId = `refresh-${cardId}`;
    const copyId = `copy-${cardId}`;
    const buttons = [
      counter,
      <div key={`${cardId}-btn-icons`} className="icons">
        <span className="icon" onClick={refreshHandler}>
          <i ref={refreshButtonRef} id={refreshId} className="fas fa-sync"></i>
        </span>
        <span className="icon" onClick={openPopOutHandler}>
          <i
            ref={toClipboardButtonRef}
            id={copyId}
            className="far fa-copy "
          ></i>
        </span>
      </div>,
    ];

    const { relativeDate, path } = getTimestamp(dates);
    const timestamp = relativeDate && (
      <TextWithTooltip text={relativeDate} tooltipText={path} />
    );

    const summaryId = 'summary-' + cardId;
    const summary = (
      <summary id={summaryId}>
        <div className="summary-row">
          {cardTitle}
          {buttons}
        </div>
        <div className="summary-row ">{timestamp}</div>
      </summary>
    );

    const footer = (
      <img
        src={sledilnikLogo}
        alt="sledilnik logo"
        width="96"
        height="48"
        style={{ display: 'block', margin: '0 auto' }}
      />
    );

    const popout = (
      <ToClipboard
        open={showPopOut}
        defaultValue={clipboard}
        clear={() => setClipboard('')}
        close={() => setShowPopOut(false)}
      />
    );

    const cardProps = {
      id: cardId,
      open,
      summary,
      footer,
      popout,
    };
    return (
      <Component
        ref={detailsRef}
        onClick={onDetailsClick}
        {...cardProps}
        {...props}
      />
    );
  };
  return WithCard;
}
export default withCardHOC(Card);
