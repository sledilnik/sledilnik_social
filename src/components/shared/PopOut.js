import React, { useState, useEffect } from 'react';

import './PopOut.css';

import Modal from './Modal';
import Backdrop from './Backdrop';

function PopOut({ children, className = '' }) {
  return (
    <Modal>
      <Backdrop className={`PopOut ${className}`}>{children}</Backdrop>
    </Modal>
  );
}

function withBackdropHOC(Component) {
  return ({ open, ...props }) => {
    const [show, setShow] = useState(open);
    useEffect(() => setShow(open), [open]);

    if (show) {
      document.body.style.overflow = 'hidden';
      const newProps = { ...props, setShow };
      return <Component {...newProps} />;
    }
    document.body.style.overflow = 'visible';
    return null;
  };
}
export default withBackdropHOC(PopOut);
