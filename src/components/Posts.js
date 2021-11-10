import React, { useRef, useState } from 'react';

import './Posts.css';

import * as Tabs from './Tabs';
import SocialChanger from './Shared/SocialChanger';

const cards = {
  LAB: { component: <Tabs.Lab noClose />, label: 'LAB' },
  HOS: { component: <Tabs.Hos noClose />, label: 'HOS' },
  EPI: { component: <Tabs.Epi noClose />, label: 'EPI' },
  SCREENSHOTS: { component: <Tabs.Screenshots />, label: 'Posnetki' },
  CHARTS: { component: <Tabs.Charts />, label: 'Grafi' },
};

function Posts() {
  const tabButtonsRef = useRef();
  const [card, setCard] = useState('LAB');
  let post = cards[card].component;

  const changeCard = (event, card) => {
    const { childNodes } = tabButtonsRef.current;
    const { target } = event;
    [...childNodes].forEach(btn => {
      target !== btn && btn.classList.remove('active');
      target === btn && btn.classList.add('active');
    });
    setCard(card);
  };

  const tabButtons = Object.entries(cards).map(([key, { label }], index) => {
    const className = index === 0 ? 'tablinks active' : 'tablinks';
    return (
      <button
        key={`tab-${label}`}
        className={className}
        onClick={event => changeCard(event, key)}
      >
        {label}
      </button>
    );
  });

  return (
    <section className="Posts">
      <div className="posts-buttons-container">
        <div ref={tabButtonsRef} className="tab">
          {tabButtons}
        </div>
        <SocialChanger />
      </div>
      {post}
    </section>
  );
}

export default Posts;
