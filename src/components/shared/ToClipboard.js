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
  cancel = () => {},
  toClipboard = () => {},
}) {
  const textareaRef = useRef();

  return (
    <PopOut
      className="ToClipboard"
      open={open}
      close={() => cancel(textareaRef.current)}
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
      <div className="button-container">
        <button onClick={() => toClipboard(textareaRef.current)}>
          V odložišče
        </button>
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
        cancel={cancelHandler}
        toClipboard={toClipboardHandler}
        {...rest}
      />
    );
  };

  return WithToClipboard;
}
export default withToClipboardHOC(ToClipboard);
