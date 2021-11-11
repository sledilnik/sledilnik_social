import React, { useRef, useContext } from 'react';
import './ToClipboard.css';

import PopOut from 'components/Shared/PopOut';
import { SocialContext } from 'context/SocialContext';

function ToClipboard({
  open,
  defaultValue,
  onCancel = () => {},
  onConfirm = () => {},
  popoutHeader,
}) {
  const textareaRef = useRef();

  const buttons = (
    <button onClick={() => onConfirm(textareaRef.current)}>V odložišče</button>
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
  const WithToClipboard = ({ settingsOutput, ...props }) => {
    const { close, clear, ...rest } = props;
    const { social } = useContext(SocialContext);

    const displaySettings = settingsOutput.map((item, index) => (
      <span key={`${props.title}-${item}-${index}`}>{item}</span>
    ));

    const socialStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'var(--white)',
      color: 'black',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      alignSelf: 'center',
      marginBottom: '4px',
    };

    const socialIcon =
      social === 'FB' ? (
        <span style={socialStyle}>
          <i className="fab fa-facebook-f"></i>
        </span>
      ) : (
        <span style={socialStyle}>
          <i className="fab fa-twitter"></i>
        </span>
      );

    const popoutHeader = (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {socialIcon}
        {displaySettings}
      </div>
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
        popoutHeader={popoutHeader}
        {...rest}
      />
    );
  };

  return WithToClipboard;
}
export default withToClipboardHOC(ToClipboard);
