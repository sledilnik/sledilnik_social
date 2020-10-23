import React from 'react';
const Calculate = (props) => {
   
    return (
    <span className="bold">{props.today-props.yesterday}</span>
    );
};
export default Calculate;