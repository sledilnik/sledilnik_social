import React, { useEffect, useState } from 'react';

import './TrimNewLines.css';

const selectAndCopy = textarea => {
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length); /* For mobile devices */
  document.execCommand('copy');
};

const TrimNewLines = () => {
  const [length, setLength] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) {
      const selectedText = document
        .getSelection()
        .toString()
        .replace(/(\r\n|\r|\n){2,}/g, '\n');
      const textarea = document.getElementById('copy');
      textarea.value = selectedText;
      setLength(textarea.value.length);

      const toClipboard = async () =>
        await navigator.clipboard.writeText(selectedText);
      navigator.clipboard && toClipboard();
      !navigator.clipboard && selectAndCopy(textarea);
    }
  }, [show]);

  show && !navigator.clipboard && document.execCommand('copy');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    document.body.appendChild(script);
    !show && setLength(0);
    return () => {
      document.body.removeChild(script);
    };
  }, [show]);

  const clickHandler = async () => {
    const textarea = document.getElementById('copy');
    let copyText = textarea.value.replace(/(\r\n|\r|\n){2,}/g, '\n');
    navigator.clipboard && navigator.clipboard.writeText(copyText);
    !navigator.clipboard && selectAndCopy(textarea);

    setLength(copyText.length);
    textarea.value = copyText;
  };

  const changeHandler = event => setLength(event.target.value.length);
  const showHideHandler = () => {
    setShow(prev => !prev);
  };

  return (
    <div className="TrimNewLines post">
      <button className="btn" onClick={showHideHandler}>
        {show ? 'Zapri' : 'Odpri'}
      </button>
      <label htmlFor="copy" id="copy-label">
        Odstrani odvečne vrstice, označi in prenese v odložišče.
      </label>{' '}
      {show && (
        <div>
          <div className="counter">
            Število znakov: <span className="bold">{length}</span>
          </div>
          <div className="textwrapper">
            <textarea id="copy" cols="50" rows="10" onChange={changeHandler} />
          </div>
          <div className="text-area-btn-container">
            <button className="btn" onClick={clickHandler}>
              V odložišče
            </button>
            <a
              href="https://twitter.com/intent/tweet?button_hashtag=COVID19&ref_src=twsrc%5Etfw"
              className="twitter-hashtag-button"
              data-show-count="false"
            >
              Tweet #COVID19
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrimNewLines;
