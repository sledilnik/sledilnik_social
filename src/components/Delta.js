import React from "react";
import Separator from "./Separator";
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
      {props.noChanges === true ? (
        props.today - props.yesterday === 0 ? (
          "ni sprememb"
        ) : (
          <Separator number={deltaCalculation} />
        )
      ) : (
        <Separator number={deltaCalculation} />
      )}
    </span>
  );
};
export default Calculate;
