import React from 'react';
import { RowError, RowSkeleton } from './ui/New';

function Error({ children }) {
  return children;
}

function withErrorHOC(Component) {
  return ({ hasError, hasData, isLoading, children, props }) => {
    if ((!hasData && !hasError) || isLoading) {
      return <RowSkeleton />;
    }
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
