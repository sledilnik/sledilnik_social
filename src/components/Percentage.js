import React from 'react';
const Percentage = (props) => {
    return (
    <span className="bold">{(props.getPrefix?(props.part>props.total)?"+":"-":"")}{Math.round(((props.part/props.total -(props.minus1===true?1:0)) + Number.EPSILON ) * 10000) / 100 }</span>
    );
};
export default Percentage;

