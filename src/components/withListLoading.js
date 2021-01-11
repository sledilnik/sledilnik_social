import React from 'react';
import Loader from './Loader';
import Modal from './Modal';
import Backdrop from './Backdrop';

function WithListLoading(Component) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <Modal>
        <Backdrop>
          <Loader />
        </Backdrop>
      </Modal>
    );
  };
}
export default WithListLoading;
