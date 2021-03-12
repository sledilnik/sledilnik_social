import React from 'react';

const CharCount = ({ value, ...props }) => {
  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <div style={props.style}>
      <div style={style}>{value}</div>
    </div>
  );
};

function withCharCountHOC(Component) {
  const WithCharCount = ({
    length,
    maxLength = 280,
    warn = 20,
    valid,
    style,
    ...rest
  }) => {
    const basicBorder = '2px solid';
    // const defaultBorderColor = 'var(--menu-clr';
    const okBorderColor = '#1da1f2';
    const warnBorderColor = '#FCBA47';
    const errorBorderColor = '#E0245E';

    const diff = maxLength - length;
    let borderColor = diff <= warn ? warnBorderColor : okBorderColor;

    borderColor = valid ? borderColor : errorBorderColor;

    const getBorder = style => `${basicBorder} ${style}`;
    const defaultStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '30px',
      height: '30px',
      padding: '4px',
      marginRight: '8px',
      color: 'var(--menu-clr)',
      borderRadius: '50%',
    };

    const myStyle = {
      ...defaultStyle,
      border: getBorder(borderColor),
    };

    const value = <span>{diff < -20 ? '..' : diff}</span>;

    return (
      <Component value={value} style={{ ...style, ...myStyle }} {...rest} />
    );
  };
  return WithCharCount;
}

export default withCharCountHOC(CharCount);
