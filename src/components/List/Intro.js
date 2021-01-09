import React from "react";
const Intro = (props) => {
  return (
    <p className="text">
      <span className="bold">
        Status #COVID19{" "}
        <span role="img" aria-label="s">
          🇸🇮
        </span>{" "}
        {props.post}/3 {props.introTodayDate}
      </span>
    </p>
  );
};
export default Intro;
