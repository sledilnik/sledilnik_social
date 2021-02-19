import React, { useRef, useEffect, useCallback } from 'react';
import './ToClipboard.css';

import PopOut from './PopOut';

const selectAndCopy = textarea => {
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);
  document.execCommand('copy');
};

function ToClipboard({
  open,
  defaultValue,
  cancel = () => {},
  toClipboard = () => {},
}) {
  const textareaRef = useRef();

  return (
    <PopOut open={open}>
      <div className="popout-container">
        <div className="textarea-container">
          <textarea
            id="textarea-copy"
            ref={textareaRef}
            readOnly={true}
            rows="10"
            defaultValue={defaultValue}
            style={{ width: ' 100%', resize: 'none' }}
          />
        </div>
        <div className="button-container">
          <button onClick={() => toClipboard(textareaRef.current)}>
            V odložišče
          </button>
        </div>
      </div>
      <div className="close" onClick={() => cancel(textareaRef.current)}>
        <div className="line line-1"></div>
        <div className="line line-2"></div>
      </div>
    </PopOut>
  );
}

function withToClipboardHOC(Component) {
  return ({ ...props }) => {
    const { close, clear, ...rest } = props;

    const newClose = props.close instanceof Function ? props.close : () => {};
    const closeMemo = useCallback(() => newClose(), [newClose]);

    useEffect(() => {
      const close = e => {
        if (e.keyCode === 27) {
          closeMemo();
        }
      };
      window.addEventListener('keydown', close);
      return () => window.removeEventListener('keydown', close);
    }, [closeMemo]);

    const cancelHandler = async textarea => {
      navigator.clipboard && (await navigator.clipboard.writeText(''));
      textarea.value = '';
      !navigator.clipboard && selectAndCopy(textarea);
      clear();
      closeMemo();
    };

    const toClipboardHandler = async textarea => {
      navigator.clipboard &&
        (await navigator.clipboard.writeText(textarea.value));
      !navigator.clipboard && selectAndCopy(textarea.current);
      closeMemo();
    };

    return (
      <Component
        cancel={cancelHandler}
        toClipboard={toClipboardHandler}
        {...rest}
      />
    );
  };
}
export default withToClipboardHOC(ToClipboard);
