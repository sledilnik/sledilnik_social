import React, { useRef, useState } from 'react';

import './Posts.css';

import * as Tabs from './Tabs';
import SocialChanger from './SocialChanger';

const cards = {
  LAB: <Tabs.Lab noClose />,
  HOS: <Tabs.Hos noClose />,
  EPI: <Tabs.Epi noClose />,
  SCREENSHOTS: <Tabs.Screenshots />,
  CHARTS: <Tabs.Charts />,
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
