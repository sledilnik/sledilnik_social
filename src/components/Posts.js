import React, { useRef, useState } from 'react';

import './Posts.css';

import LAB from './Tabs/LAB';
import HOS from './Tabs/HOS';
import EPI from './Tabs/EPI';
import ScreenshotsCard from './Tabs/ScreenshotsCard';
import EmbeddedChartCard from './Tabs/EmbeddedChartCard';
import SocialChanger from './SocialChanger';

const cards = {
  LAB: <LAB noClose />,
  HOS: <HOS noClose />,
  EPI: <EPI noClose />,
  SCREENSHOTS: <ScreenshotsCard />,
  CHARTS: <EmbeddedChartCard />,
};

function Posts() {
  const tabButtonsRef = useRef();
  const [card, setCard] = useState('LAB');
  let post = cards[card];

  const changeCard = (event, card) => {
    const { childNodes } = tabButtonsRef.current;
    const { target } = event;
    [...childNodes].forEach(btn => {
      target !== btn && btn.classList.remove('active');
      target === btn && btn.classList.add('active');
    });
    setCard(card);
  };

  return (
    <section className="Posts">
      <div className="posts-buttons-container">
        <div ref={tabButtonsRef} className="tab">
          <button
            className="tablinks active"
            onClick={event => changeCard(event, 'LAB')}
          >
            LAB
          </button>
          <button
            className="tablinks"
            onClick={event => changeCard(event, 'HOS')}
          >
            HOS
          </button>
          <button
            className="tablinks"
            onClick={event => changeCard(event, 'EPI')}
          >
            EPI
          </button>
          <button
            className="tablinks"
            onClick={event => changeCard(event, 'SCREENSHOTS')}
          >
            Posnetki
          </button>
          <button
            className="tablinks"
            onClick={event => changeCard(event, 'CHARTS')}
          >
            Grafi
          </button>
        </div>
        <SocialChanger />
      </div>
      {post}
    </section>
  );
}

export default Posts;
