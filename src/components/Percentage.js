import React from "react";
const Percentage = (props) => {
  return (
    <span className="bold">
      {props.getPrefix ? (props.part > props.total ? "+" : "-") : ""}
      {props.total === undefined
        ? ""
        : props.part === undefined
        ? ""
        : (
            Math.round(
              (props.part / props.total -
                (props.minus1 === true ? 1 : 0) +
                Number.EPSILON) *
                1000
            ) / 10
          )
            .toString()
            .replace(/\./g, ",")}
    </span>
  );
};
export default Percentage;
