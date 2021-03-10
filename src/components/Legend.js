import React from 'react';

import './Legend.css';
import RatioTrends from './Legend/RatioTrends';
import PathsDates from './Legend/PathsDates';

export const LegendSection = ({ title, children }) => (
  <section className="legend-section">
    <h3 className="bold legend-section-title">{title}:</h3>
    {children}
  </section>
);

function Legend({ pathsDatesHooks, municipalitiesHook }) {
  return (
    <div className="post Legend">
      <h2 id="legenda">Legenda</h2>
      <PathsDates hooks={pathsDatesHooks} />
      <RatioTrends municipalitiesHook={municipalitiesHook} weekly />
    </div>
  );
}

function withLegendHOC(Component) {
  return ({ ...props }) => {
    const legendProps = {
      pathsDatesHooks: { ...props },
      municipalitiesHook: props.municipalitiesHook,
    };

    return <Component {...legendProps} />;
  };
}

export default withLegendHOC(Legend);
