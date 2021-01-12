import React, { useState } from 'react';
import Backdrop from './Backdrop';
import Modal from './Modal';

function Header() {
  const [open, setOpen] = useState(false);
  const onHamburgerClick = event => {
    const header = document.getElementById('header');
    setOpen(prev => setOpen(!prev));
    header.classList.toggle('menuOpen');
  };

  return (
    <header id="header" className="header">
      <div className="logo">Covid-19 Sledilnik Social</div>
      <div className="🍔" onClick={onHamburgerClick}>
        <div className="line line-1"></div>
        <div className="line line-2"></div>
        <div className="line line-3"></div>
      </div>
      <nav className="nav-container">
        <a href="#legenda">Legenda</a>
        <a
          href="https://covid-19.sledilnik.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="logo">Covid-19 Sledilnik</div>
        </a>
        <a
          href="https://sledilnik-social-old.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          previous version
        </a>
      </nav>
      {open ? (
        <Backdrop className="backdrop-sidebar">This is BACKDROP</Backdrop>
      ) : (
        ''
      )}
    </header>
  );
}

export default Header;
