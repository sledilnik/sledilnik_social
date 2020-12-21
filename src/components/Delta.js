import React from "react";
const Calculate = (props) => {
  let deltaCalculation = props.today - props.yesterday;

  return (
    <span className="bold">
      {props.getPrefix
        ? props.today - props.yesterday === 0
          ? ""
          : props.today - props.yesterday > 0
          ? "+"
          : ""
        : ""}
      {props.noChanges === true
        ? props.today - props.yesterday === 0
          ? "ni sprememb"
          : deltaCalculation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        : deltaCalculation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
    </span>
  );
};
export default Calculate;
