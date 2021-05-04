import React, { useEffect } from 'react';
import './Screenshot.css';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import Loader from './Loader';

const awsLambdaURL =
  'https://325sfff4r2.execute-api.eu-central-1.amazonaws.com/sledilnikScreenshot';

const Screenshot = ({
  params = { type: '', screen: '', custom: '', hoverIndex: '' },
  noSkip,
  captionTop,
  captionBottom,
  captionText = '',
}) => {
  const { type, screen, custom, hoverIndex } = params;
  let filename = custom ? screen + '_' + custom : screen;
  filename = !isNaN(hoverIndex) ? filename + '_' + hoverIndex : filename;

  const [value, setValue] = useLocalStorage(null, filename);
  const {
    data,
    isLoading,
    hasError,
    refetch,
    setSkip,
    updateParams,
  } = useFetch(awsLambdaURL, params, {}, !!value && !noSkip);

  const href = noSkip ? data?.body : value || data?.body;

  useEffect(() => {
    if (href && !noSkip) {
      setValue(href);
      setSkip(true);
    }
    noSkip && updateParams(params);
  }, [href, params, noSkip, setValue, setSkip, updateParams]);

  const alt = `${type}-${filename}`;
  const figCaptionText = captionText || `${type} ${filename}`;

  return (
    <>
      {hasError && !isLoading && !href && (
        <div className="Screenshot loader-container">
          <h3>Something went wrong!</h3>
          <button onClick={refetch}>Try again</button>
        </div>
      )}

      {isLoading && (
        <>
          {captionTop && <figcaption>{figCaptionText}</figcaption>}
          <div className="Screenshot loader-container">
            <Loader />
          </div>
          {captionBottom && <figcaption>{figCaptionText}</figcaption>}
        </>
      )}
      {!isLoading && href && !hasError && (
        <a
          className="Screenshot"
          href={`data:image/png;base64,${href}`}
          download={filename}
        >
          {captionTop && <figcaption>{figCaptionText}</figcaption>}
          <img
            src={`data:image/jpeg;base64,${href}`}
            alt={alt}
            loading="lazy"
            decoding
            async
          />
          {captionBottom && <figcaption>{figCaptionText}</figcaption>}
        </a>
      )}
    </>
  );
};

export default Screenshot;
