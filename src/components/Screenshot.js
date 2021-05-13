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
  captionTop,
  captionBottom,
  captionText = '',
  ...props
}) => {
  const alt = `${props.type}-${props.filename}`;
  const figCaptionText = captionText || `${props.type} ${props.filename}`;

  return (
    <>
      {props.hasError && !props.isLoading && !props.href && (
        <>
          {captionTop && <figcaption>{figCaptionText}</figcaption>}
          <div className="Screenshot loader-container">
            <h3>Something went wrong!</h3>
            <button onClick={props.refetch}>Try again</button>
          </div>
          {captionBottom && <figcaption>{figCaptionText}</figcaption>}
        </>
      )}

      {props.isLoading && (
        <>
          {captionTop && <figcaption>{figCaptionText}</figcaption>}
          <div className="Screenshot loader-container">
            <Loader />
          </div>
          {captionBottom && <figcaption>{figCaptionText}</figcaption>}
        </>
      )}
      {!props.isLoading && props.href && !props.hasError && (
        <a
          className="Screenshot"
          href={`data:image/png;base64,${props.href}`}
          download={props.filename}
        >
          {captionTop && <figcaption>{figCaptionText}</figcaption>}
          <img
            src={`data:image/jpeg;base64,${props.href}`}
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

    const newProps = {
      captionTop,
      captionBottom,
      captionText,
      filename,
      hasError,
      isLoading,
      href,
      refetch,
      ...props,
    };

    return <Component {...newProps} />;
  };
  return ScreenshotHOC;
}
export default withScreenshotHOC(Screenshot);
