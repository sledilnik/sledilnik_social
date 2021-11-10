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

const zipNoFolders = (filenames = [], translated = {}) => {
  if (isArray(filenames)) {
    const zip = new JSZip();
    for (let index in filenames) {
      const filename = filenames[index];
      const myFilename = translated[filename] || filename;
      const safeFilename = myFilename.split(':').join('_');
      const image = window.localStorage.getItem(filename);
      const formattedIndex = (+index).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
      });

      zip.file(`${formattedIndex}-${safeFilename}.png`, image, {
        base64: true,
      });
    }

    return zip;
  }

  throw new Error('Argument "filenames" must be an array!');
};

const zipWithFolders = (filenames = {}, translated = {}) => {
  if (isObject(filenames)) {
    const zip = new JSZip();
    for (const [folderName, fileNames] of Object.entries(filenames)) {
      const folder = zip.folder(folderName);
      if (isArray(fileNames)) {
        for (const filename of fileNames) {
          const myFilename = translated[filename] || filename;
          const safeFilename = myFilename.split(':').join('_');
          const image = window.localStorage.getItem(filename);
          folder.file(safeFilename + '.png', image, { base64: true });
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
    translated,
    text,
    zipName = 'screenshots',
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
      const zip = func(filenames, translated);
      if (!zip) {
        return;
      }
      const content = await zip.generateAsync({ type: 'blob' });

      const isFileSaverSupported = () => {
        try {
          return !!Blob;
        } catch (error) {
          return false;
        }
      };

      isFileSaverSupported() && FileSaver.saveAs(content, `${zipName}.zip`);
      !isFileSaverSupported() && console.warn('Blob Not supported!');
    };

    const newProps = { text, onClickHandler, ...props };

    return <Component {...newProps} />;
  };
  return WithZipLink;
}
export default withZipLinkHOC(ZipLink);
