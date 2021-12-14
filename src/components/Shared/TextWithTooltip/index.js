import React, { useRef } from 'react';
import './TextWithTooltip.css';

function TextWithTooltip({
  text,
  tooltipText,
  tooltipProps = {},
  className,
  ...props
}) {
  const ref = useRef();

  return (
    <span
      ref={ref}
      data-text={tooltipText}
      className={`TextWithTooltip ${className}`}
      {...props}
    >
      {text}
    </span>
  );
}

export default TextWithTooltip;
