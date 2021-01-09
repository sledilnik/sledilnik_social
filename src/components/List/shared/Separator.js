import React from "react";

const Separator = (props) => {
  return (
    <span>
      {props.number === undefined
        ? ""
        : props.number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
    </span>
  );
};
export default Separator;
