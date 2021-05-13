import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Screenshot.css';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import Loader from './Loader';

const Screenshot = ({
  captionTop,
  captionBottom,
  base64Img,
  alt,
  figCaptionText,
  filename,
}) => {
  return (
    <a
      className="Screenshot"
      href={`data:image/png;base64,${base64Img}`}
      download={filename}
    >
      {captionTop && <figcaption>{figCaptionText}</figcaption>}
      <img
        src={`data:image/jpeg;base64,${base64Img}`}
        alt={alt}
        loading="lazy"
        decoding="true"
        async
      />
      {captionBottom && <figcaption>{figCaptionText}</figcaption>}
    </a>
  );
};

Screenshot.propTypes = {
  captionTop: PropTypes.bool,
  captionBottom: PropTypes.bool,
  base64Img: PropTypes.string,
  alt: PropTypes.string,
  figCaptionText: PropTypes.string,
  filename: PropTypes.string,
};

const awsLambdaURL =
  'https://325sfff4r2.execute-api.eu-central-1.amazonaws.com/sledilnikScreenshot';

const replaceAll = (text, string, replaceValue) => {
  const newText = text.replace(string, replaceValue);
  const indexOf = newText.indexOf(string);
  if (indexOf > -1) {
    return replaceAll(newText, string, replaceValue);
  }
  return newText;
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
  }) => {
    const localStorageName = getLocalStorageName(params);
    let filename = captionText || localStorageName; // ! must be after useLocalStorage
    filename = replaceAll(filename, '.', '_');

    const [value, setValue] = useLocalStorage(null, localStorageName);
    const { data, isLoading, hasError, refetch, setSkip, updateParams } =
      useFetch(awsLambdaURL, params, {}, !!value && !noSkip);

    const base64Img = noSkip ? data?.body : value || data?.body;
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
      if (base64Img && !noSkip) {
        setValue(base64Img);
        setSkip(true);
      }
      noSkip && updateParams(params);
    }, [base64Img, params, noSkip, setValue, setSkip, updateParams]);

    const alt = `${params.type}-${filename}`;
    const figCaptionText = captionText || `${params.type} ${filename}`;

    if (hasError && !isLoading && !base64Img) {
      return (
        <>
          {captionTop && <figcaption>{figCaptionText}</figcaption>}
          <div className="Screenshot loader-container">
            <h3>Something went wrong!</h3>
            <button onClick={refetch}>Try again</button>
          </div>
          {captionBottom && <figcaption>{figCaptionText}</figcaption>}
        </>
      );
    }

    if (isLoading) {
      return (
        <>
          {captionTop && <figcaption>{figCaptionText}</figcaption>}
          <div className="Screenshot loader-container">
            <Loader />
          </div>
          {captionBottom && <figcaption>{figCaptionText}</figcaption>}
        </>
      );
    }

    const componentProps = {
      captionTop,
      captionBottom,
      filename,
      alt,
      base64Img,
      figCaptionText,
    };

    return <Component {...componentProps} />;
  };

  ScreenshotHOC.propTypes = {
    params: PropTypes.shape({
      type: PropTypes.string,
      screen: PropTypes.string,
      custom: PropTypes.string,
      hoverIndex: PropTypes.string,
    }),
    noSkip: PropTypes.bool,
    captionTop: PropTypes.bool,
    captionBottom: PropTypes.bool,
    captionText: PropTypes.string,
    pickers: PropTypes.object,
  };

  return ScreenshotHOC;
}
export default withScreenshotHOC(Screenshot);
