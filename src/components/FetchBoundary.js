import React from 'react';
import SkeletonRow from './SkeletonRow';
import DataRow from './DataRow';

function FetchBoundary(props) {
  return <>{props.children}</>;
}

function withFetchBoundaryHOC(Component) {
  const WithFetchBoundary = ({ ...props }) => {
    if (props.hook.isLoading) {
      return <SkeletonRow />;
    }

    if (props.hook.data === null) {
      return <DataRow dataString="Žal ni podatkov." />;
    }

    if (props.hook.isError) {
      return <DataRow dataString="Nekaj je šlo narobe!" />;
    }
    return <Component {...props} />;
  };
  return WithFetchBoundary;
}
export default withFetchBoundaryHOC(FetchBoundary);
