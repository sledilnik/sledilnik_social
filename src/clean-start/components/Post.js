import React from 'react';

function Post({ hasHeader = true, children, hasFooter = true }) {
  const header = hasHeader && <div>This is Post's header</div>;
  const footer = hasFooter && <div>This is Post's footer</div>;
  return (
    <article>
      {header}
      {children}
      {footer}
    </article>
  );
}

function withPostHOC(Component) {
  return props => {
    return <Component props />;
  };
}

export default withPostHOC(Post);
