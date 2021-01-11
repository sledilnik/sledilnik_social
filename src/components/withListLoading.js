import React from 'react';
import Loader from './Loader';

function WithListLoading(Component) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return <Loader />;
  };
}
export default WithListLoading;
