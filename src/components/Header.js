import React, { useState } from 'react';
import Backdrop from './Backdrop';

function Header() {
  const [open, setOpen] = useState(false);
  const onHamburgerClick = event => {
    const header = document.getElementById('header');
    setOpen(prev => setOpen(!prev));
    header.classList.toggle('menuOpen');
  };

  const onLinkClick = event => {
    const header = document.getElementById('header');
    setOpen(false);
    header.classList.remove('menuOpen');
  };

  const onCloseHandler = event => {
    const header = document.getElementById('header');
    setOpen(false);
    header.classList.remove('menuOpen');
  };

  return (
    <header id="header" className="header">
      <div className="logo">Covid-19 Sledilnik Social</div>
      <div className="🍔" onClick={onHamburgerClick}>
        <div className="line line-1"></div>
        <div className="line line-2"></div>
        <div className="line line-3"></div>
      </div>
      <nav className="nav-container" onClick={onCloseHandler}>
        <div className="nav-heading">Meni</div>
        <a href="#legenda" onClick={onLinkClick}>
          Legenda
        </a>
        <a
          href="https://covid-19.sledilnik.org/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onLinkClick}
        >
          <div className="logo">Covid-19 Sledilnik</div>
        </a>
        <a
          href="https://sledilnik-social-old.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onLinkClick}
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
