import React, { useRef } from 'react';
import PopOut from './PopOut';

const selectAndCopy = textarea => {
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);
  document.execCommand('copy');
};

function ToClipboard({ open, defaultValue, setClipboard, setShowPopOut }) {
  const textareaRef = useRef();
  const cancelHandler = async () => {
    navigator.clipboard && (await navigator.clipboard.writeText(''));
    textareaRef.current.value = '';
    !navigator.clipboard && selectAndCopy(textareaRef.current);
    setClipboard('');
    setShowPopOut(false);
  };

  const toClipboardHandler = async () => {
    navigator.clipboard &&
      (await navigator.clipboard.writeText(textareaRef.current.value));
    !navigator.clipboard && selectAndCopy(textareaRef.current);
    setShowPopOut(false);
  };

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
          <button onClick={toClipboardHandler}>V odložišče</button>
        </div>
      </div>
      <div className="close" onClick={cancelHandler}>
        <div className="line line-1"></div>
        <div className="line line-2"></div>
      </div>
    </PopOut>
  );
}

export default ToClipboard;
