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

function withTextWithTooltip(Component) {
  const WithTextWithTooltip = ({ ...props }) => {
    return <Component {...props} />;
  };
  return WithTextWithTooltip;
}

export default withTextWithTooltip(TextWithTooltip);
