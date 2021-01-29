import React from 'react';
import { RowError, RowSkeleton } from './ui/New';

function Error({ children }) {
  return children;
}

function withErrorHOC(Component) {
  return ({ hasError, hasData, children, props }) => {
    if (hasError) {
      return <RowError />;
    }
    if (!hasData) {
      return <RowSkeleton />;
    }
    return <Component {...props}>{children}</Component>;
  };
}
export default withErrorHOC(Error);
