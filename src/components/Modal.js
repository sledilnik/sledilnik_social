import { createPortal } from 'react-dom';

const Modal = props => {
  const { children } = props;
  return createPortal(children, document.getElementById('modal'));
};

export default Modal;
