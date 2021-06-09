import React, { useContext, useRef } from 'react';
import './SocialChanger.css';
import { SocialContext } from '../context/SocialContext';

const SocialChanger = () => {
  const leftSpan = useRef(null);
  const rightSpan = useRef(null);
  const context = useContext(SocialContext);

  const checked = context.social === 'FB';
  const leftChecked = checked ? 'checked' : '';
  const rightChecked = !checked ? 'checked' : '';

  const socialHandler = event => {
    const { checked } = event.target;
    checked ? context.setSocial('FB') : context.setSocial('TW');
    leftSpan.current.classList.toggle('checked');
    rightSpan.current.classList.toggle('checked');
  };

  return (
    <div className="SocialChanger">
      <label htmlFor="social-changer" className="checkbox-label">
        <input
          id="social-changer"
          type="checkbox"
          onChange={socialHandler}
          defaultChecked={checked}
        />
        <span ref={leftSpan} className={`switch-left ${leftChecked}`}>
          <i className="fab fa-facebook-f"></i>
        </span>
        <span ref={rightSpan} className={`switch-right ${rightChecked}`}>
          <i className="fab fa-twitter"></i>
        </span>
      </label>
    </div>
  );
};

export default SocialChanger;
