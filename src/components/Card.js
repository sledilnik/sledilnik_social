import React, { useState, useRef, useContext, useEffect } from 'react';

import './Card.css';

import { formatRelative } from 'date-fns';
import { sl } from 'date-fns/locale';

import sledilnikLogo from '../assets/svg/sledilnik-logo.svg';
import copyIcon from '../assets/svg/copy.svg';
import ToClipboard from './shared/ToClipboard';
import TweetCount from './shared/TweetCount';
import { SocialContext } from './../context/SocialContext';

const removeConsecutiveNewLines = text => {
  const step1 = text.replace(/(\r\n|\r|\n){2,}/g, '\n');
  return step1.slice(-1) === '\n' ? step1.slice(0, -1) : step1;
};

const SummaryRow = ({ title, counter, buttons, timestamp, ...props }) => {
  return (
    <div {...props}>
      {title}
      {counter}
      {buttons}
      {timestamp}
    </div>
  );
};

const TextWithTooltip = ({
  text,
  tooltipText,
  tooltipProps = {},
  ...props
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      onMouseOver={() => setShowTooltip(true)}
      onMouseOut={() => setShowTooltip(false)}
      {...props}
    >
      {text}
      {showTooltip && <div {...tooltipProps}>{tooltipText}</div>}
    </div>
  );
};

function Card({ id, children, open = false, ...props }) {
  const {
    refs: { detailsRef },
    timestamp: { relativeDate, path },
  } = props;

  const cardId = 'card-' + id;
  const summaryId = 'summary-' + cardId;

  return (
    <details
      ref={detailsRef}
      id={cardId}
      className="Card"
      open={open}
      onClick={props.onDetailsClick}
    >
      <summary id={summaryId} data-open="open">
        <SummaryRow
          className="summary-row"
          data-open="open"
          title={props.title}
          counter={props.counter}
          buttons={props.buttons}
        />
        <div className="summary-row " data-open="open">
          {relativeDate && (
            <TextWithTooltip
              text={relativeDate}
              tooltipText={path}
              data-open="open"
              className="summary-date"
              style={{ position: 'relative' }}
              tooltipProps={{
                style: {
                  position: 'absolute',
                  top: '-32px',
                  left: '46px',
                  width: '100%',
                  padding: '4px 8px',
                  backgroundColor: 'black',
                  color: 'white',
                  borderRadius: '4px',
                  textAlign: 'center',
                },
              }}
            />
          )}
        </div>
      </summary>
      {children}
      {props.footer}
      {props.popout}
    </details>
  );
}

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
  const WithCard = ({ id, dates, noCount = true, ...props }) => {
    const { postRef } = props;
    const detailsRef = useRef();
    const toClipboardButtonRef = useRef();

    const [showCharCount, setShowCharCount] = useState(null);
    const [clipboard, setClipboard] = useState('');
    const [showPopOut, setShowPopOut] = useState(false);
    const { social } = useContext(SocialContext);

    const isOpen = detailsRef?.current?.open;

    useEffect(() => {
      setShowCharCount(social === 'TW' && isOpen && !noCount);
    }, [social, isOpen, noCount]);

    // sets correct twitter char count
    useEffect(() => {
      const text = postRef.current.innerText;
      setClipboard(removeConsecutiveNewLines(text));
    }, [postRef, social, showCharCount]);

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
      setShowCharCount(social === 'TW' && details.open && !noCount);
    };

    const title = <h2 data-open="open">{props.summary}</h2>;

    const buttonId = 'copy-card-' + id;
    const buttons = (
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
    );
    const counter = showCharCount && <TweetCount text={clipboard} />;

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

    const newProps = {
      id,
      social,
      refs: { postRef, detailsRef, toClipboardButtonRef },
      timestamp: getTimestamp(dates),
      title,
      buttons,
      counter,
      footer,
      popout,
      onDetailsClick,
    };
    return <Component {...newProps} {...props} />;
  };
  return WithCard;
}
export default withCardHOC(Card);
