import JSZip from 'jszip';
import FileSaver from 'file-saver';
import React from 'react';
import ScreenshotGetUseLocalStorage from '../dicts/ScreenshotGetUseLocalStorage';

import './ZipLink.css';

function ZipLink() {
  const screenshotsUseLocalStorageHooks = Object.entries(
    ScreenshotGetUseLocalStorage
  ).reduce((acc, [key, binddedUseLocalStorage]) => {
    acc[key] = binddedUseLocalStorage();
    return acc;
  }, {});

  const onClickHandler = async () => {
    const zip = new JSZip();

    for (let [key, item] of Object.entries(screenshotsUseLocalStorageHooks)) {
      zip.file(key + '.png', item[0], { base64: true });
    }

    const content = await zip.generateAsync({ type: 'blob' });

    FileSaver.saveAs(content, 'screenshots.zip');
  };

  return (
    <button className="ZipLink" onClick={onClickHandler}>
      DOWNLOAD
    </button>
  );
}

export default ZipLink;
