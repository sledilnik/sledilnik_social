import React, { useState, useEffect } from 'react';

import './PopOut.css';

import Modal from './Modal';
import Backdrop from './Backdrop';
import CancelButton from './CancelButton';

function PopOut({
  children,
  className = '',
  header,
  footer,
  onClose = () => {},
}) {
  return (
    <Modal>
      <Backdrop className={`PopOut ${className}`}>
        <div className="popout-container">
          <div className="popout-header-container">{header}</div>
          <div className="children-container">{children}</div>
          <div className="popout-footer-container">{footer}</div>
        </div>
        <CancelButton topRight handleClick={() => onClose()} />
      </Backdrop>
    </Modal>
  );
}

function withPopOutHOC(Component) {
  const WithPopOut = ({ open, ...props }) => {
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
  return WithPopOut;
}
export default withPopOutHOC(PopOut);
