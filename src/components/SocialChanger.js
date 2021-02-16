import React, { useContext } from 'react';
import './SocialChanger.css';
import { SocialContext } from '../context/SocialContext';

const SocialChanger = () => {
  const context = useContext(SocialContext);

  const socialHandler = event => {
    const { checked } = event.target;
    checked ? context.setSocial('FB') : context.setSocial('TW');
  };

  return (
    <div className="SocialChanger">
      <label htmlFor="social-changer" className="checkbox-label">
        <input
          id="social-changer"
          type="checkbox"
          onChange={socialHandler}
          defaultChecked={true}
        />
        <span className="switch-left">F</span>
        <span className="switch-right">T</span>
      </label>
    </div>
  );
};

export default SocialChanger;
