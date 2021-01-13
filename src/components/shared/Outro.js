import React from 'react';
import Logo from '../../assets/sledilnik-logo.svg';

const Outro = props => {
  return (
    <div className="Outro">
      <p className="text">
        <span role="img" aria-label="s">
          💨🏠,😷,🙎↔️↔️🙎‍♂️🙎↔️↔️🙎 + 👐🧼🚿 + #OstaniZdrav 📲 & 🤞
        </span>
      </p>
      <p className="text">
        <span role="img" aria-label="s">
          ✨{' '}
          <a
            className="spark-link"
            href="https://covid-spark.info"
            target="_blank"
            rel="noopener noreferrer"
          >
            SPARK
          </a>{' '}
          ✨
        </span>
      </p>
      <img src={Logo} alt="logo" className="logoCenter" width />
    </div>
  );
};
export default Outro;
