import React, { useEffect } from 'react';
import './Screenshot.css';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import Loader from './Loader';

const replaceAll = (text, string, replaceValue) => {
  const newText = text.replace(string, replaceValue);
  const indexOf = newText.indexOf(string);
  if (indexOf > -1) {
    return replaceAll(newText, string, replaceValue);
  }
  return newText;
};

const awsLambdaURL =
  'https://325sfff4r2.execute-api.eu-central-1.amazonaws.com/sledilnikScreenshot';

const Screenshot = ({
  params = { type: '', screen: '', custom: '', hoverIndex: '' },
  noSkip,
  captionTop,
  captionBottom,
  captionText = '',
  pickers = {},
  ...props
}) => {
  const { type } = params;
  const [value, setValue] = useLocalStorage(null, props.localStorageName);
  const { data, isLoading, hasError, refetch, setSkip, updateParams } =
    useFetch(awsLambdaURL, params, {}, !!value && !noSkip);

  const href = noSkip ? data?.body : value || data?.body;
  for (const pickerRef of Object.values(pickers)) {
    pickerRef.current && (pickerRef.current.disabled = isLoading);
    const labels = document.querySelectorAll('.select-container label');
    labels &&
      [...labels].map(
        label =>
          (label.style.color = isLoading ? 'var(--box-shadow)' : 'initial')
      );
  }

  useEffect(() => {
    if (href && !noSkip) {
      setValue(href);
      setSkip(true);
    }
    noSkip && updateParams(params);
  }, [href, params, noSkip, setValue, setSkip, updateParams]);

  const alt = `${type}-${props.filename}`;
  const figCaptionText = captionText || `${type} ${props.filename}`;

  return (
    <>
      {hasError && !isLoading && !href && (
        <>
          {captionTop && <figcaption>{figCaptionText}</figcaption>}
          <div className="Screenshot loader-container">
            <h3>Something went wrong!</h3>
            <button onClick={refetch}>Try again</button>
          </div>
          {captionBottom && <figcaption>{figCaptionText}</figcaption>}
        </>
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
          download={props.filename}
        >
          {captionTop && <figcaption>{figCaptionText}</figcaption>}
          <img
            src={`data:image/jpeg;base64,${href}`}
            alt={alt}
            loading="lazy"
            decoding="true"
            async
          />
          {captionBottom && <figcaption>{figCaptionText}</figcaption>}
        </a>
      )}
    </>
  );
};

const getLocalStorageName = ({ screen, custom, hoverIndex }) => {
  let localStorageName = custom ? screen + '_' + custom : screen;
  localStorageName =
    !isNaN(hoverIndex) && hoverIndex !== ''
      ? localStorageName + '_' + hoverIndex
      : localStorageName;
  return localStorageName;
};

function withScreenshotHOC(Component) {
  const ScreenshotHOC = ({
    params = { type: '', screen: '', custom: '', hoverIndex: '' },
    noSkip,
    captionTop,
    captionBottom,
    captionText = '',
    pickers = {},
    ...props
  }) => {
    const localStorageName = getLocalStorageName(params);
    let filename = captionText || props.localStorageName; // ! must be after useLocalStorage
    filename = replaceAll(filename, '.', '_');
    console.log(localStorageName);

    const newProps = {
      params,
      noSkip,
      captionTop,
      captionBottom,
      captionText,
      pickers,
      localStorageName,
      filename,
      ...props,
    };

    return <Component {...newProps} />;
  };
  return ScreenshotHOC;
}
export default withScreenshotHOC(Screenshot);
