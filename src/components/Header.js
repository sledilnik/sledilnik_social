import React, { useState } from 'react';
import Backdrop from './Backdrop';

import './Header.css';

function Header() {
  const [open, setOpen] = useState(false);

  const onHamburgerClick = event => {
    const header = document.getElementById('header');
    setOpen(prev => !prev);

    if (open) {
      header.classList.add('closingMenu');
      header.classList.remove('menuOpen');
    }

    if (!open) {
      header.classList.remove('closingMenu');
      header.classList.add('menuOpen');
    }

    // document.body.classList.toggle('menuOpen'); // on mobile (ios14) can not close menu
  };

  const onLinkClick = event => {
    const { target } = event;
    if (target.id === 'legend-link') {
      event.preventDefault();
      const legend = document.getElementById('legenda');
      legend.scrollIntoView({
        // behavior: 'smooth',
        block: 'center',
      });
    }
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
    <header id="header" className="Header">
      <div className="logo">Covid-19 Sledilnik Social</div>
      <div className="🍔" onClick={onHamburgerClick}>
        <div className="line line-1"></div>
        <div className="line line-2"></div>
        <div className="line line-3"></div>
      </div>
      <nav className="nav-container" onClick={onCloseHandler}>
        <div className="nav-heading">Meni</div>
        <a
          id="legend-link"
          className="nav-link"
          href="#legenda"
          onClick={onLinkClick}
        >
          Legenda
        </a>
        <a
          className="nav-link"
          href="https://covid-19.sledilnik.org/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onLinkClick}
        >
          <div className="logo">Covid-19 Sledilnik</div>
        </a>
        <a
          className="nav-link"
          href="https://covid-spark.info/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onLinkClick}
        >
          <div className="logo">Spark</div>
        </a>
        <a
          className="nav-link"
          href="https://sledilnik-social-ver-0-1-0.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onLinkClick}
        >
          ver 0.1.0
        </a>
      </nav>
      {open ? (
        <Backdrop
          className="backdrop-sidebar"
          onClick={onCloseHandler}
        ></Backdrop>
      ) : (
        ''
      )}
    </header>
  );
}

export default Header;
