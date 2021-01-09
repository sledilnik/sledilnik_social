import React from "react";
import Logo from "../../assets/sledilnik-logo.svg";

const Outro = (props) => {
  return (
    <p className="text">
      <span role="img" aria-label="s">
        💨🏠,😷,🙎↔️↔️🙎‍♂️🙎↔️↔️🙎 + 👐🧼🚿 + #OstaniZdrav 📲 & 🤞
      </span>
      <br />
      <br />
      <span role="img" aria-label="s">
        ✨{" "}
        <a
          href="https://covid-spark.info"
          target="_blank"
          rel="noopener noreferrer"
        >
          SPARK
        </a>{" "}
        ✨
      </span>
      <br />
      <br />
      <img src={Logo} alt="logo" className="logoCenter" />
    </p>
  );
};
export default Outro;
