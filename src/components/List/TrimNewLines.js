import React, { useEffect, useState } from 'react';

const TrimNewLines = () => {
  const [length, setLength] = useState(0);
  const [show, setShow] = useState(false);

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

  const clickHandler = () => {
    const copyText = document.getElementById('copy');
    copyText.value = copyText.value.replace(/(\r\n|\r|\n){2,}/g, '\n');

    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    document.execCommand('copy');
  };

  const changeHandler = event => setLength(event.target.value.length);
  const showHideHandler = () => setShow(prev => !prev);

  return (
    <div className="trim-new-lines-container" style={{ fontSize: '0.9em' }}>
      <label htmlFor="copy" id="copy-label">
        Odstrani odvečne vrstice, označi in prenese v odložišče.
      </label>{' '}
      <button className="btn" onClick={showHideHandler}>
        {show ? 'Skrij' : 'Pokaži'}
      </button>
      {show && (
        <div style={{ display: 'block' }}>
          <p style={{ margin: '0.5em 0' }}>Število znakov: {length}</p>
          <div className="textwrapper">
            <textarea cols="50" rows="10" id="copy" onChange={changeHandler} />
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
