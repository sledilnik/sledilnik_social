import React, { useState, useRef, useContext, useEffect } from 'react';

import './Card.css';

import { formatRelative } from 'date-fns';
import { sl } from 'date-fns/locale';

import sledilnikLogo from 'assets/svg/sledilnik-logo.svg';

import TextWithTooltip from 'components/Shared/TextWithTooltip';
import TweetCount from './TweetCount';
import ToClipboard from './ToClipboard';

import { SocialContext } from 'context/SocialContext';

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
  if (!dates) {
    return { relativeDate: null, path: null };
  }
  const MILLISECONDS = 1000;
  const latestDate =
    dates && [...Object.entries(dates)].sort((a, b) => a[1] - b[1]).pop();
  const relativeDate =
    latestDate &&
    latestDate[1] !== null &&
    formatRelative(new Date(latestDate[1] * MILLISECONDS), new Date(), {
      locale: sl,
    });
  const timestampPath = `/${latestDate[0]}`;
  return { relativeDate, path: timestampPath };
};

const IconButton = React.forwardRef((props, ref) => {
  return (
    <span ref={ref} className="icon">
      <i className={props.fontAwesome}></i>
    </span>
  );
});

function withCardHOC(Component) {
  const WithCard = ({
    title,
    dates,
    open = false,
    noCount = true,
    noClose,
    refreshHandler = () => {},
    settingsOutput = [],
    download = [],
    ...props
  }) => {
    const { postRef } = props;
    const detailsRef = useRef();
    const summaryRef = useRef();
    const toClipboardButtonRef = useRef();
    const refreshButtonRef = useRef();

    const [showCharCount, setShowCharCount] = useState(null);
    const [clipboard, setClipboard] = useState(postRef?.current?.innerText);
    const [showPopOut, setShowPopOut] = useState(false);
    const { social } = useContext(SocialContext);

    if (noClose) {
      summaryRef.current && (summaryRef.current.style.cursor = 'initial');
    }

    const isOpen = detailsRef?.current?.open;
    useEffect(
      () => setShowCharCount(social === 'TW' && isOpen && !noCount),
      [social, isOpen, noCount]
    );

    const text = postRef?.current?.innerText;
    useEffect(
      () => text && setClipboard(removeConsecutiveNewLines(text)),
      [text]
    );

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

      if (!summaryRef.current.contains(target)) {
        return;
      }
      event.preventDefault();

      details.open =
        target.id === copyButton?.id || target.id === refreshButton?.id
          ? (details.open = true)
          : noClose || !details.open;

      postRef &&
        setClipboard(removeConsecutiveNewLines(postRef.current.innerText));
      setShowCharCount(social === 'TW' && details.open && !noCount);
    };

    const cardTitle = <h2 className="card-title">{title}</h2>;

    const cardId = `card-${title?.toLowerCase()}`;
    const counter = showCharCount && (
      <TweetCount key={`${cardId}-counter`} text={clipboard} />
    );
    const refreshId = `refresh-${cardId}`;
    const copyId = `copy-${cardId}`;
    const buttons = [
      counter,
      <div key={`${cardId}-btn-icons`} className="icons">
        {download.length > 0 &&
          download.map((ref, index) => (
            <TextWithTooltip
              className="left"
              text={
                <IconButton
                  // key={index}
                  ref={ref[0]}
                  fontAwesome="fas fa-file-download"
                />
              }
              key={index}
              tooltipText={ref[1]}
            />
          ))}
        {!props.noRefresh && (
          <span className="icon" onClick={refreshHandler}>
            <i
              ref={refreshButtonRef}
              id={refreshId}
              className="fas fa-sync"
            ></i>
          </span>
        )}
        {!props.noToClipboard && (
          <span className="icon" onClick={openPopOutHandler}>
            <i
              ref={toClipboardButtonRef}
              id={copyId}
              className="far fa-copy "
            ></i>
          </span>
        )}
        {props.settingsRef && (
          <IconButton ref={props.settingsRef} fontAwesome="fas fa-cog" />
        )}
      </div>,
    ];

    const { relativeDate, path } = getTimestamp(dates);
    const timestamp = relativeDate && (
      <TextWithTooltip
        text={relativeDate}
        tooltipText={path}
        style={{ color: 'var(--menu-clr)' }}
        className="up"
      />
    );

    const summaryId = 'summary-' + cardId;
    const summary = (
      <summary ref={summaryRef} id={summaryId}>
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
        settingsOutput={settingsOutput}
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
