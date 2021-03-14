import React, { useRef, useContext } from 'react';
import './ToClipboard.css';

import PopOut from './PopOut';
import { SocialContext } from './../context/SocialContext';

function ToClipboard({
  open,
  defaultValue,
  onCancel = () => {},
  onConfirm = () => {},
  popoutHeader,
}) {
  const textareaRef = useRef();

  const buttons = (
    <>
      <button onClick={() => onConfirm(textareaRef.current)}>
        V odložišče
      </button>
    </>
  );

  return (
    <PopOut
      className="ToClipboard"
      open={open}
      header={popoutHeader}
      footer={buttons}
      onClose={() => onCancel(textareaRef.current)}
    >
      <textarea
        id="textarea-copy"
        ref={textareaRef}
        readOnly={true}
        rows="10"
        defaultValue={defaultValue}
        style={{ width: ' 100%', resize: 'none' }}
      />
    </PopOut>
  );
}

const selectAndCopy = textarea => {
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);
  document.execCommand('copy');
};

function withToClipboardHOC(Component) {
  const WithToClipboard = ({ ...props }) => {
    const { close, clear, ...rest } = props;
    const { social } = useContext(SocialContext);

    const socialStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'var(--white)',
      color: 'black',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
    };

    const socialIcon =
      social === 'FB' ? (
        <span style={socialStyle}>
          <i className="fab fa-facebook-f"></i>
        </span>
      ) : (
        <span>
          <i className="fab fa-twitter"></i>
        </span>
      );

    const cancelHandler = async textarea => {
      navigator.clipboard && (await navigator.clipboard.writeText(''));
      textarea.value = '';
      !navigator.clipboard && selectAndCopy(textarea);
      clear instanceof Function && clear();
      close instanceof Function && close();
    };

    const toClipboardHandler = async textarea => {
      navigator.clipboard &&
        (await navigator.clipboard.writeText(textarea.value));
      !navigator.clipboard && selectAndCopy(textarea.current);
      close instanceof Function && close();
    };

    return (
      <Component
        onCancel={cancelHandler}
        onConfirm={toClipboardHandler}
        popoutHeader={socialIcon}
        {...rest}
      />
    );
  };

  return WithToClipboard;
}
export default withToClipboardHOC(ToClipboard);
