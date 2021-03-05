import React, { useState } from 'react';
import './TextWithTooltip.css';

function TextWithTooltip({ text, tooltipText, tooltipProps = {}, ...props }) {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div
      className="TextWithTooltip"
      onMouseOver={() => setShowTooltip(true)}
      onMouseOut={() => setShowTooltip(false)}
      {...props}
    >
      {text}
      {showTooltip && (
        <div className="tooltip" {...tooltipProps}>
          {tooltipText}
        </div>
      )}
    </div>
  );
}

function withTextWithTooltip(Component) {
  const WithTextWithTooltip = ({ ...props }) => {
    return <Component {...props} />;
  };
  return WithTextWithTooltip;
}

export default withTextWithTooltip(TextWithTooltip);
