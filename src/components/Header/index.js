import React, { useState } from 'react';

import './Header.css';
import Backdrop from './../Backdrop';

function Header() {
  const [open, setOpen] = useState(false);

  if (open) document.body.classList.add('modal-open');
  if (!open) document.body.classList.remove('modal-open');

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
    <header id="header" className="Header">
      <h1 className="logo">Covid-19 Sledilnik Social</h1>
      <div className="🍔" onClick={onHamburgerClick}>
        <div className="line line-1"></div>
        <div className="line line-2"></div>
        <div className="line line-3"></div>
      </div>
      <nav className="nav-container" onClick={onCloseHandler}>
        <div className="nav-heading">Meni</div>
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
      </nav>
      <Backdrop
        className="backdrop-sidebar"
        onClick={onCloseHandler}
      ></Backdrop>
    </header>
  );
}

export default Header;
