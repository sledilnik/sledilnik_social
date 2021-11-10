import React, { useState, useEffect } from 'react';

import './PopOut.css';

import Modal from './Modal';
import Backdrop from 'components/Shared/Backdrop';
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
    useEffect(() => {
      // Prevents window from moving on touch on newer browsers.
      const noScroll = event => {
        event.preventDefault();
      };
      document.body.addEventListener('touchmove', noScroll, { passive: false });
      setShow(open);
      return document.body.removeEventListener('touchmove', noScroll);
    }, [open]);

    if (show) {
      document.body.classList.add('modal-open');
      const newProps = { ...props, setShow };
      return <Component {...newProps} />;
    }
    document.body.classList.remove('modal-open');

    return null;
  };
  return WithPopOut;
}
export default withPopOutHOC(PopOut);
