import React from 'react';
import Modal from './shared/Modal';
import Backdrop from './shared/Backdrop';
import Loader from './shared/Loader';

function WithListLoading(Component) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <Modal>
        <Backdrop className="backdrop-loader">
          <Loader />
        </Backdrop>
      </Modal>
    );
  };
}
export default WithListLoading;
