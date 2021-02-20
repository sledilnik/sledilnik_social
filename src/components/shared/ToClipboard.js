import React, { useRef } from 'react';
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
  onCancel = () => {},
  onConfirm = () => {},
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
      buttons={buttons}
      onClose={() => onCancel(textareaRef.current)}
    >
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
    </PopOut>
  );
}

function withToClipboardHOC(Component) {
  const WithToClipboard = ({ ...props }) => {
    const { close, clear, ...rest } = props;

    const cancelHandler = async textarea => {
      navigator.clipboard && (await navigator.clipboard.writeText(''));
      textarea.value = '';
      !navigator.clipboard && selectAndCopy(textarea);
      clear();
      close();
    };

    const toClipboardHandler = async textarea => {
      navigator.clipboard &&
        (await navigator.clipboard.writeText(textarea.value));
      !navigator.clipboard && selectAndCopy(textarea.current);
      close();
    };

    return (
      <Component
        onCancel={cancelHandler}
        onConfirm={toClipboardHandler}
        {...rest}
      />
    );
  };

  return WithToClipboard;
}
export default withToClipboardHOC(ToClipboard);
