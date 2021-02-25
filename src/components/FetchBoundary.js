import React from 'react';
import SkeletonRow from './SkeletonRow';
import DataRow from './DataRow';
import SomethingWentWrong from './SomethingWentWrong';

function FetchBoundary(props) {
  return <>{props.children}</>;
}

function withFetchBoundaryHOC(Component) {
  const WithFetchBoundary = ({ hook, ...props }) => {
    if (hook.isLoading) {
      return <SkeletonRow />;
    }

    if (hook.isError) {
      return <SomethingWentWrong title={props.title} />;
    }

    if (hook.data === null) {
      return <DataRow dataString="Žal ni podatkov." />;
    }

    return <Component {...props} />;
  };
  return WithFetchBoundary;
}
export default withFetchBoundaryHOC(FetchBoundary);
