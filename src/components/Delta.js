import React from 'react';
const Calculate = (props) => {
   
    return (
    <span className="bold">{(props.getPrefix?(props.today-props.yesterday === 0)?"":(props.today-props.yesterday > 0)?"+":"":"")}{props.today-props.yesterday === 0?"ni sprememb":props.today-props.yesterday}</span>
    );
};
export default Calculate;