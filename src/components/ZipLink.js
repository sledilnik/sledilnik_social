import React from 'react';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import { isArray, isObject } from 'lodash';

import './ZipLink.css';

function ZipLink({ onClickHandler, text }) {
  return (
    <button className="ZipLink" onClick={onClickHandler}>
      {text}
    </button>
  );
}

const zipNoFolders = (filenames = []) => {
  if (isArray(filenames)) {
    const zip = new JSZip();
    for (let filename of filenames) {
      const image = window.localStorage.getItem(filename);
      zip.file(filename + '.png', image, { base64: true });
    }

    return zip;
  }

  throw new Error('Argument "filenames" must be an array!');
};

const zipWithFolders = (filenames = {}) => {
  if (isObject(filenames)) {
    const zip = new JSZip();
    for (const [folderName, fileNames] of Object.entries(filenames)) {
      const folder = zip.folder(folderName);
      if (isArray(fileNames)) {
        for (const filename of fileNames) {
          const image = window.localStorage.getItem(filename);
          folder.file(filename + '.png', image, { base64: true });
        }
      }
    }
    return zip;
  }

  throw new Error('Argument "filenames" must be an object!');
};

const ClickHandlers = {
  zipNoFolders,
  zipWithFolders,
};

function withZipLinkHOC(Component) {
  const WithZipLink = ({
    filenames,
    text,
    zipName = 'screenshots.zip',
    ...props
  }) => {
    if (!filenames) {
      return null;
    }

    if (!isArray(filenames) && !isObject(filenames)) {
      return null;
    }

    const funcNoFolder = isArray(filenames) && ClickHandlers.zipNoFolders;
    const funcWithFolder = isObject(filenames) && ClickHandlers.zipWithFolders;
    const func = funcNoFolder || funcWithFolder;

    if (!func) {
      return null;
    }

    const onClickHandler = async () => {
      const zip = func(filenames);
      if (!zip) {
        return;
      }
      const content = await zip.generateAsync({ type: 'blob' });
      FileSaver.saveAs(content, zipName);
    };

    const newProps = { text, onClickHandler, ...props };

    return <Component {...newProps} />;
  };
  return WithZipLink;
}
export default withZipLinkHOC(ZipLink);
