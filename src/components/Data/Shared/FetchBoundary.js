import React from 'react';
import SkeletonRow from 'components/Shared/SkeletonRow';
import DataRow from 'components/Shared/DataRow';
import SomethingWentWrong from 'components/Shared/SomethingWentWrong';

function FetchBoundary(props) {
  return <>{props.children}</>;
}

function withFetchBoundaryHOC(Component) {
  const WithFetchBoundary = ({ hook, ...props }) => {
    if (hook.isLoading) {
      return <SkeletonRow />;
    }

    if (hook.hasError) {
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
