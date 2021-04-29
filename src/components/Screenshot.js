import React, { useEffect } from 'react';
import './Screenshot.css';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import Loader from './Loader';

const Screenshot = ({
  params = { type: '', screen: '', custom: '', hoverIndex: '' },
  noSkip,
  captionTop,
  captionBottom,
}) => {
  const { type, screen, custom, hoverIndex } = params;
  let filename = custom ? screen + '_' + custom : screen;
  filename = !isNaN(hoverIndex) ? filename + '_' + hoverIndex : filename;

  const [value, setValue] = useLocalStorage(null, filename);
  const { data, isLoading, setSkip, updateParams } = useFetch(
    'https://325sfff4r2.execute-api.eu-central-1.amazonaws.com/sledilnikScreenshot',
    params,
    {},
    !!value && !noSkip
  );

  const href = noSkip ? data?.body : value || data?.body;

  useEffect(() => {
    if (href && !noSkip) {
      setValue(href);
      setSkip(true);
    }
    noSkip && updateParams(params);
  }, [href, params, noSkip, setValue, setSkip, updateParams]);

  const alt = `${type}-${filename}`;
  const figCaptionText = `${type} ${filename}`;

  return (
    <>
      {isLoading && (
        <div className="Screenshot loader-container">
          <Loader />
        </div>
      )}
      {!isLoading && href && (
        <a
          className="Screenshot"
          href={`data:image/jpeg;base64,${href}`}
          download={filename}
        >
          {captionTop && <figcaption>{figCaptionText}</figcaption>}
          <img src={`data:image/jpeg;base64,${href}`} alt={alt} />
          {captionBottom && <figcaption>{figCaptionText}</figcaption>}
        </a>
      )}
    </>
  );
};

export default Screenshot;
