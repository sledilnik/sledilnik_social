import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Screenshot.css';
import useFetch from 'hooks/useFetch';
import useLocalStorage from 'hooks/useLocalStorage';
import { AWS_LAMBDA_NEW_URL } from 'dicts/URL_Dict';

import * as ScreenshotContainers from 'components/Tabs/Shared/ScreenshotContainers';

const replaceAll = (text, string, replaceValue) => {
  const newText = text.replace(string, replaceValue);
  const indexOf = newText.indexOf(string);
  if (indexOf > -1) {
    return replaceAll(newText, string, replaceValue);
  }
  return newText;
};

const getLocalStorageName = ({ screen, custom, hoverIndex }) => {
  let localStorageName = custom ? `${screen}_${custom}` : screen;
  localStorageName =
    !isNaN(hoverIndex) && hoverIndex !== ''
      ? `${localStorageName}_${hoverIndex}`
      : localStorageName;
  return localStorageName;
};

function withScreenshotHOC(Component) {
  const ScreenshotHOC = props => {
    const { params, captionText, noSkip, pickers, ...rest } = props;
    const localStorageName = getLocalStorageName(params);
    const filename = replaceAll(captionText || localStorageName, '.', '_');

    const [value, setValue] = useLocalStorage(null, localStorageName);
    const { data, isLoading, hasError, refetch, setSkip, updateParams } =
      useFetch(AWS_LAMBDA_NEW_URL, params, {}, !!value && !noSkip);

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
    const figCaptionText = (
      <>
        {captionText || `${params.type} ${filename}`}
        {!isLoading && (
          <span className="icon" onClick={refetch}>
            <i className="fas fa-sync"></i>
          </span>
        )}
      </>
    );

    const componentProps = {
      filename,
      alt,
      base64Img,
      figCaptionText,
      ...rest,
    };

    if (hasError && !isLoading && !base64Img) {
      return (
        <ScreenshotContainers.Error
          className="Screenshot loader-container"
          {...componentProps}
        />
      );
    }

    if (isLoading) {
      return (
        <ScreenshotContainers.Loading
          className="Screenshot loader-container"
          {...componentProps}
        />
      );
    }

    return <Component className="Screenshot" {...componentProps} />;
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

  ScreenshotHOC.defaultProps = {
    params: { type: '', screen: '', custom: '', hoverIndex: '' },
    captionText: 'caption text',
    pickers: {},
  };

  return ScreenshotHOC;
}
export default withScreenshotHOC(ScreenshotContainers.LinkImage);
