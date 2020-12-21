import React from "react";
const Intro = (props) => {
  return (
    <p className="text">
      <span className="bold">
        Status #COVID19 SLO {props.post}/3 {props.introTodayDate}
      </span>
    </p>
  );
};
export default Intro;
