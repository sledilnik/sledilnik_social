import React from 'react';
const Percentage = (props) => {
    return (
    <span>{Math.round(((props.part/props.total) + Number.EPSILON) * 10000) / 100}</span>
    );
};
export default Percentage;

