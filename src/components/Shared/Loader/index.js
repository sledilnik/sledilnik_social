import React from 'react';
import './Loader.css';
import part1SVG from 'assets/svg/covid-animation-1.svg';
import part2SVG from 'assets/svg/covid-animation-2.svg';

function Loader() {
  return (
    <div className="wrapper">
      <div className="loader-container">
        <img className="logo-part1" src={part1SVG} alt="logo" />
        <img className="logo-part2" src={part2SVG} alt="logo" />
      </div>
    </div>
  );
}

export default Loader;
